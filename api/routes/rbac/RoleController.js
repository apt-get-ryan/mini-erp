import express from "express";
import RoleService from "@/services/rbac/RoleService.js";
import HttpSuccess from "@/utils/HttpSuccess.ts";
import {checkPermission} from "@/middleware/permissionMiddleware.js";
const router = express.Router();

router.get(
  "/",
  checkPermission("roles.read"),
  async (req, res) => {
    const roles = await RoleService.getRoles();
    return new HttpSuccess({
      data: roles
    }).send(res);
  }
)

router.patch(
  "/:id",
  checkPermission("roles.update"),
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await RoleService.updateRole(id, data);
    return new HttpSuccess({
      message: "Role editado com sucesso."
    }).send(res);
  }
)

router.post(
  "/",
  checkPermission("roles.create"),
  async (req, res) => {
    const data = req.body;
    const role = await RoleService.saveRole(data);
    return new HttpSuccess({
      message: "Role adicionado com sucesso."
    }).send(res);
  }
)
export default router;