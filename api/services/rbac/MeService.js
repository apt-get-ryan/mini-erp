import MeRepository from "@/repositories/rbac/MeRepository.js"

const checkIfUserCanAccessRoute = async (id, route) => {
  return await MeRepository.checkIfUserCanAccessRoute(id, route);
}

const getModulesByUserId = async (id) => {
  return await MeRepository.getModulesByUserId(id);
}

const checkIfUserHasPermission = async (id, permission) => {
  const isAnyOfResource = permission.startsWith("**") && permission.endsWith("**");
  if(isAnyOfResource) {
    const resource = permission.slice(2, -2);
    return await MeRepository.checkIfUserHasPermission(id, resource, undefined);
  }
  const [resource, action] = permission.split(".");
  return await MeRepository.checkIfUserHasPermission(id, resource, action);
}

export default {
  checkIfUserCanAccessRoute,
  getModulesByUserId,
  checkIfUserHasPermission
}