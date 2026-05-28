import { Permission } from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";


const getPermission = async (id) => {
  try {
    
    return await Permission.findByPk(id);
  } catch(error) {
    throw HttpError.from(error);
  }
}

const getPermissions = async (options) => {
  try {
    return await Permission.findAll(options);
  } catch(error) {
    throw HttpError.from(error);
  }
}

const savePermission = async ({resource, action, descricao}) => {
  try {
    return await Permission.create({resource, action, descricao})
  } catch (error) {
    throw HttpError.from(error);
  }

}

const updatePermission = async (id, data) => {
  try {
    const permission = await Permission.findByPk(id);
    if(!permission)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    await permission.update(data);
    return permission;
  } catch (error) {
    throw HttpError.from(error);
  }
}

async function deletePermission(id) {
  try {
    const permission = await Permission.findByPk(id);
    if(!permission)
      throw new HttpError("Não foi possível encontrar os dados para deletar", 404);
    await permission.destroy();
    return true;
  } catch (error) {
    throw HttpError.from(error);
  }
}

export default {
  getPermission,
  getPermissions,
  savePermission,
  updatePermission,
  deletePermission
}