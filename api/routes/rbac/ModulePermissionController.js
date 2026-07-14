import express from "express";
import ModulePermissionService from '@/services/rbac/ModulePermissionService.js';
import HttpSuccess from "@/utils/HttpSuccess.ts";
import {checkPermission} from "@/middleware/permissionMiddleware.js";
const router = express.Router();

router.get("/:id",
  checkPermission("**module_permission**"),
  async (req, res) => {
    const {id} = req.params;
    const modulePermission =  await ModulePermissionService.getAcessPermissionByModuleId(id);
    const permissionId = modulePermission.map(p => p.id)[0];
    return new HttpSuccess({
      data: permissionId
    }).send(res);
  }
);


router.put(
  "/:id",
  checkPermission("**module_permission**"),
  async (req, res) => {
    const { id } = req.params;
    const {permission} = req.body;
    const result = await ModulePermissionService.setAccessPermissionToModule(id, permission);
    return new HttpSuccess({
      message: "Permissões atualizadas."
    }).send(res)
  }
)

export default router;