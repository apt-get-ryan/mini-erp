
import UserAuthRepository from "@/repositories/rbac/UserAuthRepository.js";


const getUserByLogin = async (id) => {
  return await UserAuthRepository.getUserByLogin(id);
}

const UserAuthService = {
  getUserByLogin
}

export default UserAuthService;