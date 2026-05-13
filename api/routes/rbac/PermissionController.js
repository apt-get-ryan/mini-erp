import express from "express";
import PermissionService from "../../services/PermissionService.js";

const router = express.Router();

router.get(
  "/",
  async (req, res) => {
    const { fields } = req.query;
    try {
      const parsedFields = fields?.split(',')?.map(f => f.trim()) || undefined;
      const permissions = await PermissionService.getPermissions(parsedFields);
      res.send(permissions)
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message});
    }
  }
)

router.patch(
  "/:id",
  async (req, res) => {
    const {resource, action, descricao} = req.body;
    const data = {resource, action, descricao} ;
    const { id } = req.params;
    try {
      const result = await PermissionService.updatePermission(id, data);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message});
    }
  }
)

router.post(
  "/",
  async (req, res) => {
    console.log(req.body);
    
    const {resource, action, descricao} = req.body;
    const data = {resource, action, descricao};
    try {
      const permission = await PermissionService.savePermission(data);
      res.send(permission);
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: error.message});
    }
  }
)
export default router;