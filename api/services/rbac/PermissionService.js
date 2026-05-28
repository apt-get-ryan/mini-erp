import PermissionRepository from "@/repositories/rbac/PermissionRepository.js";
import { createSchema, updateSchema } from "@/schemas/rbac/Permission.ts";



const getPermissions = async (options) => {
  return await PermissionRepository.getPermissions(options);
}

const getPermission = async (id) => {
  return await PermissionRepository.getPermission(id);
}

const savePermission = async (data) => {
  data = createSchema.parse(data);
  return await PermissionRepository.savePermission(data);
}

const updatePermission = async (id, data) => {
  data = updateSchema.parse(data);
  return await PermissionRepository.updatePermission(id, data);
}
const deletePermission = async (id) => {
  return await PermissionRepository.deletePermission(id);
}
export default {
  getPermissions,
  getPermission,
  updatePermission,
  savePermission,
  deletePermission
}