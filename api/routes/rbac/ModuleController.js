import express from "express";
import ModuleService from '@/services/rbac/ModuleService.js';
import HttpSuccess from "@/utils/HttpSuccess.ts";

const router = express.Router();

router.get("/",
  async (req, res) => {
    let modules = [];
    modules = await ModuleService.getModules();
    return new HttpSuccess({
      data: modules
    }).send(res);
  }
)


router.post("/",
  async (req, res) => {
    const data = req.body;
    await ModuleService.saveModule(data);
    return new HttpSuccess({
      message: "Módulo adicionado com sucesso."
    }).send(res);
  }
)

router.patch(
  "/:id",
  async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    await ModuleService.updateModule(id, data);
    return new HttpSuccess({
      message: "Módulo editado com sucesso."
    }).send(res);
  }
);


router.delete(
  "/:id",
  async (req, res) => {
    const {id} = req.params;
    await ModuleService.deleteModule(id);
    return new HttpSuccess({
      message: "Módulo deletado com sucesso."
    }).send(res);
  }
)

export default router;