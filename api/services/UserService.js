import DoctorRepository from "../repositories/UserRepository.js";

const getUser = async (id) => {
  return await DoctorRepository.getUser(id);
}

const getUserByLogin = async (login) => {
  return await DoctorRepository.getUserByLogin(login);
}


const saveUser = async ({ email, nome, login, password }) => {
  return await DoctorRepository.saveUser({ email, nome, login, password });
}


const DoctorService = {
  getUser,
  getUserByLogin,
  saveUser
}

export default DoctorService;