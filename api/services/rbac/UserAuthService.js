
import UserAuthRepository from "@/repositories/rbac/UserAuthRepository.js";
import { createSchema, loginSchema, registerSchema } from "@/schemas/rbac/User.ts";
import { HttpError } from "@/utils/HttpError.ts";
import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import z from "zod";

const JWT_ALG = process.env.JWT_ALG;
const JWT_KEY = process.env.JWT_KEY;

const getUserByLogin = async (data) => {
  if(
      !("login" in data) 
      && !("password" in data)
    ) {
    throw new HttpError("Usuário e senha obrigatórios.", 401)
  }
  data = loginSchema.parse(data);
  // const {user, accessibleModules, userPermissions} = await UserAuthRepository.getUserByLogin(data.login);
  const {user } = await UserAuthRepository.getUserByLogin(data.login);
  if(!user)
    throw new HttpError("Usuário ou senha inválidos.", 401)
  const passwordMatch = await bcrypt.compare(data.password, user.password);
  if(!passwordMatch)
    throw new HttpError("Usuário ou senha inválidos.", 401)
  const tokenContent = {
    userId: user.id,
    userLogin: user.login,
    // userPermissions: userPermissions,
    token_version: user.token_version,
    // accessibleModules: accessibleModules
  };
  const secret = new TextEncoder().encode(JWT_KEY)
  const token = await new SignJWT(tokenContent)
    .setProtectedHeader({ alg: JWT_ALG})
    .setIssuedAt()
    .setExpirationTime('10h')
    .sign(secret);
  return token;
}

const getUserById = async (id) => {
  id = z.number().int().nonnegative().parse(id);
  const {user, accessibleModules, userPermissions} = await UserAuthRepository.getUserById(id);
  const tokenContent = {
    userId: user.id,
    userPermissions: userPermissions,
    token_version: user.token_version,
    accessibleModules: accessibleModules
  };
  // const secret = new TextEncoder().encode(JWT_KEY)
  // const token = await new SignJWT(tokenContent)
  //   .setProtectedHeader({ alg: JWT_ALG})
  //   .setIssuedAt()
  //   .setExpirationTime('10h')
  //   .sign(secret);
  return tokenContent;
}

const registerNewUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data = createSchema.parse(data);
  data.password = hashedPassword;
  data.is_verified = false;
  const user = await UserAuthRepository.registerNewUser(data);
  return user;
}


const validateUser = async (login, authCode) => {
  return await UserAuthRepository.validateUser(login, authCode);
}
const UserAuthService = {
  getUserByLogin,
  getUserById,
  registerNewUser,
  validateUser
}

export default UserAuthService;