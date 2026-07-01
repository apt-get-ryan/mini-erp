import { Role } from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";

const getRole = async (id) => {
  try {
    return await Role.findByPk(id);
  } catch(error) {
    throw HttpError.from(error);
  }
}

const getRoles = async () => {
  try {
    return await Role.findAll();
  } catch(error) {
    throw HttpError.from(error);
  }
}

const saveRole = async ({nome, descricao}) => {
  try {
    return await Role.create({nome, descricao})
  } catch (error) {
    throw HttpError.from(error);
  }

}

const updateRole = async (id, data) => {
  try {
    const role = await Role.findByPk(id);
    if(!role)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    await role.update(data);
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
};

const deleteRole = async (id) => {
  try {
    const role = await Role.findByPk(id);
    if(!role)
      throw new HttpError("Não foi possível encontrar os dados para deletar", 404);
    role.destroy();
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

export default {
  getRole,
  getRoles,
  saveRole,
  updateRole,
  deleteRole
}