import express from 'express';
import UserService from '@/services/rbac/UserService.js';
import bcrypt from 'bcrypt'
import HttpSuccess from '@/utils/HttpSuccess.ts';
import { checkPermission } from '@/middleware/permissionMiddleware.js';
const router =  express.Router();

router.post(
  "/",
  checkPermission("users.create"),
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
  checkPermission("users.read"),
  async (req, res) => {
    const users = await UserService.getUsers();
    return new HttpSuccess({
      data: users
    }).send(res);
  }
);

router.get(
  "/:id",
  checkPermission("users.read"),
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
  checkPermission("users.update"),
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
  checkPermission("users.delete"),
  async (req, res) => {
    const { id } = req.params;
    await UserService.deleteUser(id);
    return new HttpSuccess({
      message: "Usuário deletado com sucesso."
    })
  }
)
export default router;