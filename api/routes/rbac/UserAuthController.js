import express from "express";
import UserService from "../../services/UserService.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import nodemailer from 'nodemailer';
import createTransporterTest from '../../services/MailerService.js';
import UserAuthService from "../../services/rbac/UserAuthService.js";


const router = express.Router();
router.post(
  "/register",
  async (req, res) => {
    const { email, nome, login, password} = req.body;
    try {
      const hashedPass = await bcrypt.hash(password, 10);
      const authCode = crypto.randomBytes(3).toString("hex");

      const user = await UserService.saveUser({ email, nome, login, password: hashedPass, verification_code: authCode});
      const transporter = await createTransporterTest();
      const info = await transporter.sendMail({
        from: '"Teste" <teste@example.com>',
        to: email,
        subject: "Verifique sua conta",
        text: `Seu código de verificação é ${authCode}`
      })
      const resJson = {
        //...user.toJSON(), // apenas para facilitar debug
        success: {
          mailTestUrl: nodemailer.getTestMessageUrl(info)
        }
      };
      res.json(resJson);
    } catch (err) {
      console.log(err);
      res.status(500).json({error: "Falha no cadastro."});
    }
  }
)

router.post(
  "/verify/:login",
  async (req, res) => {
    const { login } = req.params;
    const { validationCode } = req.body;
    try {
      const user = await UserService.getUserByLogin(login, false);
      console.log(user);
      if(!user) throw new Error();
      if(user.is_verified == true) throw new Error();
      if( user.verification_code == validationCode) {
        user.is_verified = true;
        user.verification_code = null;
        await user.save();
        return res.json({ success: true});
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
       res.status(500).json({error: "Falha na verificação"});
    }
  }
)

router.post(
  "/login",
  async (req, res) => {
    try {
      const { login , password} = req.body;
      if(!login || !password) {
        return res.status(400).json({error: "Usuário e senha obrigatórios."});
      }
      
      const {user, accessibleModules, userPermissions} = await UserAuthService.getUserByLogin(login);
      if(!user) {
        return res.status(401).json({error: "Usuário ou senha inválidos."});
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if(!passwordMatch) {
        return res.status(401).json({error: "Usuário ou senha inválidos."});
      }
      const tokenContent = {
        userId: user.id,
        userPermissions: userPermissions,
        tokenVersion: user.token_version,
        accessibleModules: accessibleModules
      }
      const token = jwt.sign(tokenContent, process.env.JWT_KEY, { expiresIn: '10h'});
      res.cookie(
        "token",
        token,
        {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 10, // 10h
          sameSite: "strict"
        }
      );
      res.status(200).json({success: true});
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message});
    }
    
  }
)


export default router;