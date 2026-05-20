import { Permission } from "@/models/models.js";


const getPermission = async (id) => {
  try {
    
    return await Permission.findByPk(id);
  } catch(error) {
    throw new Error(error);
  }
}

const getPermissions = async (options) => {
  try {
    return await Permission.findAll(options);
  } catch(error) {
    throw new Error(error);
  }
}

const savePermission = async ({resource, action, descricao}) => {
  try {
    return await Permission.create({resource, action, descricao})
  } catch (error) {
    throw new Error(error);
  }

}

const updatePermission = async (id, data) => {
  try {
    const [updatedRows] = await Permission.update(data, { where: { id: id}});
    if(!updatedRows)
      throw new Error("0 rows changed")
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  getPermission,
  getPermissions,
  savePermission,
  updatePermission
}