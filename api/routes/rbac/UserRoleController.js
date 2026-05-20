import express from "express";
import UserRoleService from "@/services/rbac/UserRoleService.js";

const router = express.Router();

router.post(
  "/",
  async (req, res) => {
    const { userId, roleId} = req.body;
    try {
      const userRole = await UserRoleService.saveUserRole(userId, roleId);
      res.send(userRole)
    } catch (error) {
      res.status(500).send({ error: error.message});
    }
  }
)

router.put(
  "/:userId",
  async (req, res) => {
    const {userId} = req.params;
    const {roles} = req.body;
    try {
      const newRoles = await UserRoleService.setRolesToUser(userId, roles);
      res.send({success: true, roles: newRoles});
    } catch (error) {
      res.status(500).send({ error: error.message});
    }
  }
)

router.get(
  "/:userId",
  async (req, res) => {
    const {userId} = req.params;
    try {
      const roles = await UserRoleService.getRolesByUserId(userId);
      res.send(roles)
    } catch (error) {
      res.status(500).send({ error: error.message});
    }
  }
)

export default router;