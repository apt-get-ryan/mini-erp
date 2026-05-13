import {Module} from "../../models/models.js";
import db from "../../database/database.js";

const getAcessPermissionsByModuleId = async(id) => {
  try {
    const module = await Module.findByPk(id, {
      attributes: ['id']
    });
    const accessPermissions = await module.getPermissions({
      attributes: ['id', 'resource', 'action'],
      joinTableAttributes: [],
      raw: true,
      order: [
        ['id', 'ASC']
      ]
    });
    return accessPermissions;
  } catch (error) {
    throw new Error(error);
  }
}


const setAccessPermissionsToModule = async (id, permissions) => {
  try {
    db.transaction(async t => {
      const module = await Module.findByPk(id, {
        attributes: ['id']
      });
      await module.setPermissions(permissions, { transaction: t})
    });
    return;
  } catch (error) {
    throw new Error(error);
  }
}


export default {
  getAcessPermissionsByModuleId,
  setAccessPermissionsToModule
}