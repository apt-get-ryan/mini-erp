import UserRoleRepository from "../repositories/UserRoleRepository.js"


const saveUserRole = async (userId, roleId) => {
  return await UserRoleRepository.saveUserRole(userId, roleId)
}

const getRolesByUserId = async (userId) => {
  return await UserRoleRepository.getRolesByUserId(userId);
}
const setRolesToUser = async (userId, roles) => {
  return await UserRoleRepository.setRolesToUser(userId, roles);
}
export default {
  saveUserRole,
  getRolesByUserId,
  setRolesToUser
}