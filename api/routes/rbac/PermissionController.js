import express from "express";
import PermissionService from "@/services/rbac/PermissionService.js";
import HttpSuccess from "@/utils/HttpSuccess.ts";

const router = express.Router();

router.get(
  "/",
  async (req, res) => {
    const permissions = await PermissionService.getPermissions();
    return new HttpSuccess({
      data: permissions
    }).send(res);
  }
)

router.patch(
  "/:id",
  async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    await PermissionService.updatePermission(id, data);
    return new HttpSuccess({
      message: "Permissão editada com sucesso."
    }).send(res);
  }
)

router.post(
  "/",
  async (req, res) => {;
    const data = req.body;
    await PermissionService.savePermission(data);
    return new HttpSuccess({
      message: "Permissão adicionada com sucesso."
    }).send(res);
  }
)

router.delete(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    await PermissionService.deletePermission(id);
    return new HttpSuccess({
      message: "Permissão deletada com sucesso."
    }).send(res);
  }
)
export default router;