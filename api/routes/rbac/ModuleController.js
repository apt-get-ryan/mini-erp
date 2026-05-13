import express from "express";
import ModuleService from '../../services/ModuleService.js';

const router = express.Router();

router.get("/",
  async (req, res) => {
    try {
      let modules = [];
      modules = await ModuleService.getModules();
      res.send(modules);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message});
    }
  }
);


router.post("/",
  async (req, res) => {
    const {nome, slug, rota, icone, parent_id, sort_order, is_active} = req.body;
    try {
      const module = await ModuleService.saveModule({nome, slug, rota, icone, parent_id, sort_order, is_active});
      res.send(module);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message});
    }
  }
)

router.patch(
  "/:id",
  async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    try {
      const result = await ModuleService.updateModule(id, data);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message});
    }
  }
)

export default router;