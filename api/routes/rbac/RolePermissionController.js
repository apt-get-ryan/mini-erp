import express from "express";
import RolePermissionService from "@/services/rbac/RolePermissionService.js";
import HttpSuccess from "@/utils/HttpSuccess.ts";

const router = express.Router();

router.get(
  "/:id",
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
  async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;
    await RolePermissionService.setPermissionsToRole(id, permissions);
    return new HttpSuccess({
      message: "Permissões atualizadas."
    }).send(res);
  }
)

// router.post(
//   "/",
//   async (req, res) => {
//     const  {role_id, permission_id} = req.body;
//     await RolePermissionService.saveRolePermission({role_id, permission_id});
//     return new HttpSuccess({
//       message: ""
//     })
//   }
// )
export default router;