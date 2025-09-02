import User from "../models/User.js";

const getUser = async (id) => {
  try {
    await User.findByPk(id);
  } catch (error) {
    throw new Error(error);
  }
}

const getUserByLogin = async (login) => {
  try {
    await User.findOne({where: {
      login: login
    }});
  } catch (error) {
    throw new Error(error);
  }
}


const saveUser = async ({email, nome, login, password }) => {
  try {
    const user = new User({email, nome, login, password });
    return await user.save();
  } catch (error) {
    throw new Error(error);
  }
}


const DoctorRepository = {
  getUser,
  getUserByLogin,
  saveUser
}

export default DoctorRepository;