import ProdutoRepository from "@/repositories/crm/ProdutoRepository.js";
import { createSchema, updateSchema } from "@/schemas/crm/Produto.ts";
import z from "zod";
import type { FindOptions } from "sequelize";

async function getProdutos(options: FindOptions = undefined) {
  return await ProdutoRepository.getProdutos(options);
}

async function getProduto(id) {
  return await ProdutoRepository.getProduto(id);
}

async function createProduto(data, categorias) {
  data = createSchema.parse(data);
  categorias = z.array(z.coerce.number().int().nonnegative()).parse(categorias);
  return await ProdutoRepository.createProduto(data, categorias);
}
async function patchProduto(id, data, categorias) {
  data = updateSchema.parse(data);
  categorias = z.array(z.coerce.number().int().nonnegative().optional()).parse(categorias);
  return await ProdutoRepository.patchProduto(id, data, categorias);
}
async function deleteProduto(id) {
  return await ProdutoRepository.deleteProduto(id);
}

const ProdutoService = {
  getProdutos,
  getProduto,
  createProduto,
  patchProduto,
  deleteProduto
};

export default ProdutoService;