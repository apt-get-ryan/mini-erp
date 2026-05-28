import {Module} from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";

const getAcessPermissionByModuleId = async(id) => {
  try {
    const module = await Module.findByPk(id, {
      attributes: ['id']
    });
    const accessPermission = await module.getPermissions({
      attributes: ['id', 'resource', 'action'],
      joinTableAttributes: [],
      raw: true,
      order: [
        ['id', 'ASC']
      ]
    });
    return accessPermission;
  } catch (error) {
    throw HttpError.from(error);
  }
}


const setAccessPermissionToModule = async (id, permission) => {
  try {
    const module = await Module.findByPk(id, {
      attributes: ['id']
    });
    if(!module)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    await module.setPermissions(permission)
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}


export default {
  getAcessPermissionByModuleId,
  setAccessPermissionToModule
}