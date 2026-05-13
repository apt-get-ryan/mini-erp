import express from "express";
import RolePermissionService from "../../services/RolePermissionService.js";

const router = express.Router();

router.get(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    try {
      const rolePermissions = await RolePermissionService.getRolePermissions(id);
      res.send(rolePermissions)
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message});
    }
  }
)

router.put(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;
    try {
      const result = await RolePermissionService.setPermissionsToRole(id, permissions);
      res.send({success: true});
    } catch (error) {
      res.status(500).send({ error: error.message});
    }
  }
)

router.post(
  "/",
  async (req, res) => {
    const  {role_id, permission_id} = req.body;
    try {
      const rolePermission = await RolePermissionService.saveRolePermission({role_id, permission_id});
      res.send(rolePermission);
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: error.message});
    }
  }
)
export default router;