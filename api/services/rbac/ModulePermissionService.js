import ModulePermissionRepository from "@/repositories/rbac/ModulePermissionRepository.js";

const getAcessPermissionByModuleId = async (id) => {
  return await ModulePermissionRepository.getAcessPermissionByModuleId(id);
}

const setAccessPermissionToModule = async (id, data) => {
  return await ModulePermissionRepository.setAccessPermissionToModule(id, data);
}

export default {
  getAcessPermissionByModuleId,
  setAccessPermissionToModule
}