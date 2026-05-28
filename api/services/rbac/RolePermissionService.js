import RolePermissionRepository from "@/repositories/rbac/RolePermissionRepository.js";

const getRolePermission = async (roleId) => {
  return await RolePermissionRepository.getRolePermission(roleId);
}

const saveRolePermission = async ({role_id, permission_id}) => {
  return await RolePermissionRepository.saveRolePermission({role_id, permission_id});
}

const setPermissionsToRole = async (roleId, permissionsIds) => {
  return await RolePermissionRepository.setPermissionsToRole(roleId, permissionsIds);
}


export default {
  getRolePermission,
  saveRolePermission,
  setPermissionsToRole
}