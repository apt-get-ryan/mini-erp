import {User, Role, Permission, Module} from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";
import { createSchema } from "@/schemas/rbac/User.ts";

const getUserByLogin = async (login) => {
  try {
    let userData = await User.findOne({
      attributes: ['id', 'token_version', 'login', 'password'],
      where: {
        login: login,
        is_verified: true
      },
    });
    if(!userData) {
      throw new HttpError("Usuário ou senha inválidos.", 401);
    }

    const user = {id: userData.id, token_version: userData.token_version, password: userData.password, login: userData.login}
    return {user: user } 
  } catch (error) {
    throw HttpError.from(error);
  }
}



const registerNewUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw HttpError.from(error);
  }
}

const validateUser = async (login, authCode) => {
  try {

    const [updatedRows] = await User.update({
      is_verified: true,
      verification_code: null
    }, {
      where: {
        login: login,
        verification_code: authCode,
        is_verified: false
      }
    })
    return updatedRows > 0;
  } catch (error) {
    throw HttpError.from(error);
  }
}


const UserAuthRepository = {
  getUserByLogin,
  registerNewUser,
  validateUser
}

export default UserAuthRepository;

/** @param {Array} arr */
const mergeSort = (arr, compare) => {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle), compare);
  const right = mergeSort(arr.slice(middle), compare);
  return merge(left, right, compare);
}
const merge = (left, right, compare) => {
  let result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if(compare(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}