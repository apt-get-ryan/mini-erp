import express from "express";
import RoleService from "../../services/RoleService.js";

const router = express.Router();

router.get(
  "/",
  async (req, res) => {
    try {
      const roles = await RoleService.getRoles();
      res.send(roles)
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message});
    }
  }
)

router.patch(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const result = await RoleService.updateRole(id, data);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message});
    }
  }
)

router.post(
  "/",
  async (req, res) => {
    const  {nome, descricao} = req.body;
    try {
      const role = await RoleService.saveRole({nome, descricao});
      res.send(role);
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: error.message});
    }
  }
)
export default router;