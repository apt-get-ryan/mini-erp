
import UserAuthRepository from "../repositories/UserAuthRepository.js";


const getUserByLogin = async (id) => {
  return await UserAuthRepository.getUserByLogin(id);
}

const UserAuthService = {
  getUserByLogin
}

export default UserAuthService;