import { User, Permission, Role } from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";
const getUser = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw HttpError.from(error);
  }
}

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw HttpError.from(error)
  }
}

const getUserByLogin = async (login, verified = true) => {
  try {
    const user = await User.findOne(
      { 
        where: {
          login: login,
          is_verified: verified
        }
      }
    );
    return user;
  } catch (error) {
    throw HttpError.from(error)
  }
}

const getUserByLoginWithPermissions = async (login) => {
  try {
    const user = await User.findOne(
      {
        where: {
          login: login,
          is_verified: true
        },
        include: [ 
          {
            model: Role,
            through: { attributes: []},
            attributes: ['nome'],
            include: [
              {
                model: Permission,
                attributes: ['resource', 'action'],
                through: { attributes: []}
              }
            ]
          } 
        ]

      }
    );
    const getPermissionString = (p) => {
      return `${p.resource}:${p.action}`
    }
    const permissions = user.Roles.flatMap((role) => getPermissionString(role.Permission))
    const roles = user.Roles.map((role) => role.get('nome'));
    
    return {user, permissions, roles};
  } catch (error) {
    throw HttpError.from(error)
  }
}

const saveUser = async (data) => {
  try {
    const user = await User.create(data)
    return;
  } catch (error) {
    throw HttpError.from(error)
  }
}

const updateUser = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    if(!user)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    await user.increment("token_version")
    await user.update(data);
    return;
  } catch (error) {
    throw HttpError.from(error)
  }
}

const deleteUser = async (id) =>{
  try {
    const user = await User.findByPk(id);
    if(!user)
      throw new HttpError("Não foi possível encontrar os dados para deletar", 404);
    await user.destroy();
    return;
  } catch (error) {
    throw HttpError.from(error)
  }
}
const UserRepository = {
  getUser,
  getUsers,
  getUserByLogin,
  getUserByLoginWithPermissions,
  saveUser,
  updateUser,
  deleteUser
}

export default UserRepository;