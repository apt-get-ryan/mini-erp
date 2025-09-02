import express from 'express';
import UserService from '../services/UserService.js';
import bcrypt from 'bcrypt'
const router =  express.Router();

// router.post(
//   "/users",
//   async (req, res) => {
//     UserService.getUser
//   }
// )

router.post(
  "/users",
  async (req, res) => {
    const { email, nome, login, password } = req.body;
    try {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await UserService.saveUser({email, nome, login, password: hashedPass});
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
)

export default router;