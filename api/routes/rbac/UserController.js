import express from 'express';
import UserService from '@/services/rbac/UserService.js';
import bcrypt from 'bcrypt'
const router =  express.Router();

router.post(
  "/",
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

router.get(
  "/",
  async (req, res) => {
    try {
      const users = await UserService.getUsers();
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

router.get(
  "/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserService.getUser(id);
      if (!user) {
        res.status(404).send({message: "Usuário não encontrado."});
        return;
      }
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

router.patch(
  "/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await UserService.updateUser(id, body);
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({error: error.message});
    }
  }
)
export default router;