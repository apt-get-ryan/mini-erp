import express from "express";
import RoleService from "@/services/rbac/RoleService.js";
import HttpSuccess from "@/utils/HttpSuccess.ts";
const router = express.Router();

router.get(
  "/",
  async (req, res) => {
    const roles = await RoleService.getRoles();
    return new HttpSuccess({
      data: roles
    }).send(res);
  }
)

router.patch(
  "/:id",
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
  async (req, res) => {
    const data = req.body;
    const role = await RoleService.saveRole(data);
    return new HttpSuccess({
      message: "Role adicionado com sucesso."
    }).send(res);
  }
)
export default router;