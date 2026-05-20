import UserRepository from "@/repositories/rbac/UserRepository.js";

const getUser = async (id) => {
  return await UserRepository.getUser(id);
}

const getUsers = async () => {
  return await UserRepository.getUsers();
}

const getUserByLogin = async (login, verified = true) => {
  return await UserRepository.getUserByLogin(login, verified);
}

const getUserByLoginWithPermissions = async (login) => {
  return await UserRepository.getUserByLoginWithPermissions(login);
}

const saveUser = async ({ email, nome, login, password, verification_code, is_verified}) => {
  return await UserRepository.saveUser({ email, nome, login, password, verification_code, is_verified});
}

const updateUser = async (id, data) => {
  
  if(!data)
    throw new Error("Nenhum campo enviado.");
  return await UserRepository.updateUser(id, data);
}

const UserService = {
  getUser,
  getUsers,
  getUserByLogin,
  getUserByLoginWithPermissions,
  saveUser,
  updateUser
}

export default UserService;