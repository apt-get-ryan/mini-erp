import { Role } from "@/models/models.js";


const getRole = async (id) => {
  try {
    
    return await Role.findByPk(id);
  } catch(error) {
    throw new Error(error);
  }
}

const getRoles = async () => {
  try {
    //console.log(Object.keys(Role.rawAttributes).join(', '))
    return await Role.findAll();
  } catch(error) {
    throw new Error(error);
  }
}

const saveRole = async ({nome, descricao}) => {
  try {
    return await Role.create({nome, descricao})
  } catch (error) {
    throw new Error(error);
  }

}

const updateRole = async (id, data) => {
  try {
    const [updatedRows] = await Role.update(data, { where: { id: id}});
    if(!updatedRows)
      throw new Error("0 rows changed")
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  getRole,
  getRoles,
  saveRole,
  updateRole
}