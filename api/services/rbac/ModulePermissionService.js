import ModulePermissionRepository from "../repositories/ModulePermissionRepository.js";

const getAcessPermissionsByModuleId = async (id) => {
  return await ModulePermissionRepository.getAcessPermissionsByModuleId(id);
}

const setAccessPermissionsToModule = async (id, permission) => {
  return await ModulePermissionRepository.setAccessPermissionsToModule(id, permission);
}

export default {
  getAcessPermissionsByModuleId,
  setAccessPermissionsToModule
}