import express from "express";
import ProdutoService from "@/services/crm/ProdutoService.js";
import { HttpError } from "@/utils/HttpError.ts";
import HttpSuccess from "@/utils/HttpSuccess.ts";
import z from "zod";

const router = express.Router();
router.get("/",
  async (req, res) => {
    const produtos = await ProdutoService.getProdutos();
    return new HttpSuccess({
      data: produtos
    }).send(res);
  }
);

router.get("/:id",
  async (req, res) => {
    console.log("chamou")
    const id = z.coerce.number().int().nonnegative().parse(req.params.id);
    const produto = await ProdutoService.getProduto(id);
    console.log(produto)
    return new HttpSuccess({
      data: produto
    }).send(res);
  }
)

router.post("/",
  async (req, res) => {
    const {categorias, ...data} = req.body;
    await ProdutoService.createProduto(data, categorias);
    return new HttpSuccess({
      message: "Produto adicionado com sucesso."
    }).send(res);
  }
);

router.patch("/:id",
  async (req, res) => {
    const {id} = req.params;
    const {categorias, ...data} = req.body;

    await ProdutoService.patchProduto(id, data, categorias);
    return new HttpSuccess({
      message: "Produto editado com sucesso."
    }).send(res);
  }
)

router.delete("/:id",
  async (req, res) => {
    const {id} = req.params;
    await ProdutoService.deleteProduto(id);
    return new HttpSuccess({
      message: "Produto deletado com sucesso."
    }).send(res);
  }
)

const ProdutoController = router;

export default ProdutoController;