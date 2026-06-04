import { Categoria } from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";

async function getCategorias(options = undefined) {
  try {
    return await Categoria.findAll(options);
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function getCategoria(id, options = undefined) {
  try {
    return await Categoria.findByPk(id, options);
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function createCategoria(data) {
  try {
    await Categoria.create(data);
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function patchCategoria(id, data) {
  try {
    const categoria = await Categoria.findByPk(id);
    if(!categoria)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    await categoria.update(data);
    return categoria;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function deleteCategoria(id) {
  try {
    const categoria = await Categoria.findByPk(id);
    if(!categoria)
      throw new HttpError("Não foi possível encontrar os dados para deletar", 404);
    await categoria.destroy();
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

const CategoriaRepository = {
  getCategoria,
  getCategorias,
  createCategoria,
  patchCategoria,
  deleteCategoria
};
export default CategoriaRepository;