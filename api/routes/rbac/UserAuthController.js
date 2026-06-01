import express from "express";
// import UserService from "@/services/rbac/UserService.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import nodemailer from 'nodemailer';
import {mailerService} from '@/services/MailerService.js';
import UserAuthService from "@/services/rbac/UserAuthService.js";
import { HttpError } from "@/utils/HttpError.ts";
import HttpSuccess from "@/utils/HttpSuccess.ts";

const PORT = process.env.FRONTEND_PORT || 3000;
const router = express.Router();

router.post(
  "/register",
  async (req, res) => {
    const data = req.body;
    const authCode = crypto.randomBytes(3).toString("hex");
    data.verification_code = authCode;
    const user = await UserAuthService.registerNewUser(data);

    const mail = await mailerService.sendMail({
      to: user.email,
      subject: "Verifique sua conta",
      text: `Seu código de verificação é ${authCode}\nAcesse localhost:${PORT}/validate/${user.login}`
    })
    return new HttpSuccess({
      message: `Seu cadastro foi realizado com sucesso. Acesse /validate/${user.login} para validar seu cadastro com o código de verificação ${authCode}`,
      data: {
        mailUrl: nodemailer.getTestMessageUrl(mail)
      }
    }).send(res);
  }
)

router.post(
  "/verify/:login",
  async (req, res) => {
    const { login } = req.params;
    const { verification_code } = req.body || "";
    const validated = await UserAuthService.validateUser(login, verification_code);
    if(!validated)
      throw new HttpError("Falha na verificação.", 404);
    return new HttpSuccess({}).send(res);
  }
)

router.post(
  "/login",
  async (req, res) => {
    const data = req.body;
    const token = await UserAuthService.getUserByLogin(data);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 10, // 10h
      sameSite: "lax"
    })
    return new HttpSuccess({
      message: "Ok"
    }).send(res);
    
  }
)


export default router;