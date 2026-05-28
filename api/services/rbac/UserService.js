import UserRepository from "@/repositories/rbac/UserRepository.js";
import { createSchema, updateSchema } from "@/schemas/rbac/User.ts";
import bcrypt from "bcrypt";


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

const saveUser = async (data) => {
  data = createSchema.parse(data);
  data.verification_code = null;
  data.is_verified = true;
  data.password = await bcrypt.hash(data.password, 10);
  return await UserRepository.saveUser(data);
}

const updateUser = async (id, data) => {
  data = updateSchema.parse(data);
  return await UserRepository.updateUser(id, data);
}

const deleteUser = async (id) => {
  return await UserRepository.deleteUser(id);
}

const UserService = {
  getUser,
  getUsers,
  getUserByLogin,
  getUserByLoginWithPermissions,
  saveUser,
  updateUser,
  deleteUser
}

export default UserService;