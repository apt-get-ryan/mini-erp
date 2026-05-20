import RolePermissionRepository from "@/repositories/rbac/RolePermissionRepository.js";
import * as yup from "yup";

const addSchema = yup.object({
  nome: yup.string().defined().nonNullable(),
  descricao: yup.string().defined().nonNullable()
}).noUnknown()

const updateSchema = yup.object({
  nome: yup.string().notRequired().nonNullable(),
  descricao: yup.string().notRequired().nonNullable()
}).noUnknown()

const getRolePermissions = async (roleId) => {
  await yup.number().positive().validate(roleId);
  return await RolePermissionRepository.getRolePermissions(roleId);
}

const saveRolePermission = async ({role_id, permission_id}) => {
  //await addSchema.validate({role_id, permission_id})
  return await RolePermissionRepository.saveRolePermission({role_id, permission_id});
}

const setPermissionsToRole = async (roleId, permissionsIds) => {
  return await RolePermissionRepository.setPermissionsToRole(roleId, permissionsIds);
}
// const updateRolePermission = async (id, data) => {
//   const rolepermissionExist = await getRolePermission(id);
//   if (!rolepermissionExist)
//     throw new Error("RolePermission not found");
//   if(Object.keys(data).length == 0)
//     throw new Error("No valid fields provided to update")
//   await updateSchema.validate(data);
//   return await RolePermissionRepository.updateRolePermission(id, data)
// }

export default {
  getRolePermissions,
  saveRolePermission,
  setPermissionsToRole
}