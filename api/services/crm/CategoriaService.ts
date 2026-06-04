import CategoriaRepository from "@/repositories/crm/CategoriaRepository.js";
import {createSchema, updateSchema} from "@/schemas/crm/Categoria.ts";
import type { FindOptions } from "sequelize";

async function getCategorias(options: FindOptions = undefined) {
  return await CategoriaRepository.getCategorias(options);
}

async function getCategoria(id, options: FindOptions = undefined) {
  return await CategoriaRepository.getCategoria(id, options);
}

async function createCategoria(data) {
  data = createSchema.parse(data);
  return await CategoriaRepository.createCategoria(data);
}
async function patchCategoria(id, data) {
  data = updateSchema.parse(data);
  return await CategoriaRepository.patchCategoria(id, data);
}
async function deleteCategoria(id) {
  return await CategoriaRepository.deleteCategoria(id);
}

const CategoriaService = {
  getCategorias,
  getCategoria,
  createCategoria,
  patchCategoria,
  deleteCategoria
};

export default CategoriaService;