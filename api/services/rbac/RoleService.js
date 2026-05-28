import RoleRepository from "@/repositories/rbac/RoleRepository.js";
import { createSchema, updateSchema } from "@/schemas/rbac/Role.ts";


const getRoles = async () => {
  return await RoleRepository.getRoles();
}

const getRole = async (id) => {
  return await RoleRepository.getRole(id);
}

const saveRole = async (data) => {
  data = createSchema.parse(data);
  return await RoleRepository.saveRole(data);
}

const updateRole = async (id, data) => {
  data = updateSchema.parse(data);
  return await RoleRepository.updateRole(id, data)
}

const deleteRole = async (id) => {
  return await RoleRepository.deleteRole(id);
}

export default {
  getRoles,
  getRole,
  updateRole,
  saveRole,
  deleteRole
}