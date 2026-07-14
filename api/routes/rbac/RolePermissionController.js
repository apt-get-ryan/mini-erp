import express from "express";
import RolePermissionService from "@/services/rbac/RolePermissionService.js";
import HttpSuccess from "@/utils/HttpSuccess.ts";
import {checkPermission} from "@/middleware/permissionMiddleware.js";

const router = express.Router();

router.get(
  "/:id",
  checkPermission("**role_permission**"),
  async (req, res) => {
    const { id } = req.params;
      const rolePermissions = await RolePermissionService.getRolePermission(id);
      return new HttpSuccess({
        data: rolePermissions
      }).send(res);
  }
)

router.put(
  "/:id",
  checkPermission("**role_permission**"),
  async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;
    await RolePermissionService.setPermissionsToRole(id, permissions);
    return new HttpSuccess({
      message: "Permissões atualizadas."
    }).send(res);
  }
)


export default router;