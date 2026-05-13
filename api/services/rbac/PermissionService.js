import PermissionRepository from "../repositories/PermissionRepository.js";
import * as yup from "yup";

const addSchema = yup.object({
  nome: yup.string().defined().nonNullable(),
  descricao: yup.string().defined().nonNullable()
}).noUnknown()

const updateSchema = yup.object({
  nome: yup.string().notRequired().nonNullable(),
  descricao: yup.string().notRequired().nonNullable()
}).noUnknown()

const getPermissions = async (fields) => {
  const options = {};
  if(fields) {
    options.attributes = fields;
  }
  options.order = [
    ['id', 'ASC']
  ];
  return await PermissionRepository.getPermissions(options);
}

const getPermission = async (id) => {
  return await PermissionRepository.getPermission(id);
}

const savePermission = async ({resource, action, descricao}) => {
  //await addSchema.validate({ nome, descricao})
  return await PermissionRepository.savePermission({resource, action, descricao});
}

const updatePermission = async (id, data) => {
  const permissionExist = await getPermission(id);
  if (!permissionExist)
    throw new Error("Permission not found");
  if(Object.keys(data).length == 0)
    throw new Error("No valid fields provided to update")
  //await updateSchema.validate(data);
  return await PermissionRepository.updatePermission(id, data)

}

export default {
  getPermissions,
  getPermission,
  updatePermission,
  savePermission
}