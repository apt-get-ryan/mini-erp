import express from "express";
import CategoriaService from "@/services/crm/CategoriaService.js";
import { HttpError } from "@/utils/HttpError.ts";
import HttpSuccess from "@/utils/HttpSuccess.ts";
import {checkPermission} from "@/middleware/permissionMiddleware.js";

const router = express.Router();
router.get("/",
  checkPermission("**categorias**"),
  async (req, res) => {
    const categorias = await CategoriaService.getCategorias();
    return new HttpSuccess({
      data: categorias
    }).send(res);
  }
);

router.post("/",
  checkPermission("**categorias**"),
  async (req, res) => {
    const data = req.body;
    await CategoriaService.createCategoria(data);
    return new HttpSuccess({
      message: "Categoria adicionado com sucesso."
    }).send(res);
  }
);

router.patch("/:id",
  checkPermission("**categorias**"),
  async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    await CategoriaService.patchCategoria(id, data);
    return new HttpSuccess({
      message: "Categoria editado com sucesso."
    }).send(res);
  }
)

router.delete("/:id",
  checkPermission("**categorias**"),
  async (req, res) => {
    const {id} = req.params;
    await CategoriaService.deleteCategoria(id);
    return new HttpSuccess({
      message: "Categoria deletado com sucesso."
    }).send(res);
  }
)

const CategoriaController = router;

export default CategoriaController;