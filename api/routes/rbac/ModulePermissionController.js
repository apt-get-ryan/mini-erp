import express from "express";
import ModulePermissionService from '@/services/rbac/ModulePermissionService.js';
import HttpSuccess from "@/utils/HttpSuccess.ts";
const router = express.Router();

router.get("/:id",
  async (req, res) => {
    const {id} = req.params;
    const modulePermission =  await ModulePermissionService.getAcessPermissionByModuleId(id);
    const permissionId = modulePermission.map(p => p.id)[0];
    console.log(permissionId)
    return new HttpSuccess({
      data: permissionId
    }).send(res);
  }
);


router.put(
  "/:id",
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