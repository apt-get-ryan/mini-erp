import RoleRepository from "@/repositories/rbac/RoleRepository.js";
import * as yup from "yup";

const addSchema = yup.object({
  nome: yup.string().defined().nonNullable(),
  descricao: yup.string().defined().nonNullable()
}).noUnknown()

const updateSchema = yup.object({
  nome: yup.string().notRequired().nonNullable(),
  descricao: yup.string().notRequired().nonNullable()
}).noUnknown()

const getRoles = async () => {
  return await RoleRepository.getRoles();
}

const getRole = async (id) => {
  return await RoleRepository.getRole(id);
}

const saveRole = async ({ nome, descricao}) => {
  await addSchema.validate({ nome, descricao})
  return await RoleRepository.saveRole({ nome, descricao});
}

const updateRole = async (id, data) => {
  const roleExist = await getRole(id);
  if (!roleExist)
    throw new Error("Role not found");
  if(Object.keys(data).length == 0)
    throw new Error("No valid fields provided to update")
  await updateSchema.validate(data);
  return await RoleRepository.updateRole(id, data)

}

export default {
  getRoles,
  getRole,
  updateRole,
  saveRole
}