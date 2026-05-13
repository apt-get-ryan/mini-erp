import express from "express";
import ModulePermissionService from '../../services/ModulePermissionService.js';
const router = express.Router();

router.get("/:id",
  async (req, res) => {
    const {id} = req.params;
    try {
      const modulePermissions =  await ModulePermissionService.getAcessPermissionsByModuleId(id);
      res.send(modulePermissions);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message});
    }
  }
);


router.put(
  "/:id",
  async (req, res) => {
    const { id } = req.params;
    const {permissions} = req.body || undefined;
    try {
      const result = await ModulePermissionService.setAccessPermissionsToModule(id, permissions);
      res.send({success: true});
    } catch (error) {
      res.status(500).send({ error: error.message});
    }
  }
)

export default router;