import express from "express";
import UserRoleService from "@/services/rbac/UserRoleService.js";
import HttpSuccess from "@/utils/HttpSuccess.ts";

const router = express.Router();

router.post(
  "/",
  async (req, res) => {
    const { userId, roleId} = req.body;
    const userRole = await UserRoleService.saveUserRole(userId, roleId);
    return new HttpSuccess({
      message: "Usuário adicionado com sucesso."
    }).send(res);
  }
)

router.put(
  "/:userId",
  async (req, res) => {
    const {userId} = req.params;
    const {roles} = req.body;
    await UserRoleService.setRolesToUser(userId, roles);
    return new HttpSuccess({
      message: "Usuário editado com sucesso."
    }).send(res);
  }
)

router.get(
  "/:userId",
  async (req, res) => {
    const {userId} = req.params;
    const roles = await UserRoleService.getRolesByUserId(userId);
    return new HttpSuccess({
      data: roles
    }).send(res);
  }
)

export default router;