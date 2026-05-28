import express from 'express';
import UserService from '@/services/rbac/UserService.js';
import bcrypt from 'bcrypt'
import HttpSuccess from '@/utils/HttpSuccess.ts';
const router =  express.Router();

router.post(
  "/",
  async (req, res) => {
    const data = req.body;
    await UserService.saveUser(data);
    return new HttpSuccess({
      message: "Usuário adicionado com sucesso."
    }).send(res);
  }
)

router.get(
  "/",
  async (req, res) => {
    const users = await UserService.getUsers();
    return new HttpSuccess({
      data: users
    }).send(res);
  }
);

router.get(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    return new HttpSuccess({
      data: user
    }).send(res);
  }
);

router.patch(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    await UserService.updateUser(id, body);
    return new HttpSuccess({
      message: "Usuário editado com sucesso."
    }).send(res);
  }
);

router.delete(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    await UserService.deleteUser(id);
    return new HttpSuccess({
      message: "Usuário deletado com sucesso."
    })
  }
)
export default router;