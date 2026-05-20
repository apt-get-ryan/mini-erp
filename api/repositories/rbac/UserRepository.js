import { User, Permission, Role } from "@/models/models.js";

const getUser = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw new Error(error);
  }
}

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
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

    const permissions = user.Roles.flatMap((role) => role.Permissions).map(p => `${p.resource}:${p.action}`);
    const roles = user.Roles.map((role) => role.get('nome'));
    
    return {user, permissions, roles};
  } catch (error) {
    throw new Error(error);
  }
}

const saveUser = async ({email, nome, login, password, verification_code, is_verified }) => {
  try {
    const user = await User.create({email, nome, login, password, verification_code, is_verified })
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

const updateUser = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    if(!user)
      throw new Error("user not found");

    user.increment("token_version")
    await user.update(data);


    return user;
  } catch (error) {
    throw new Error(error);
  }
}
const UserRepository = {
  getUser,
  getUsers,
  getUserByLogin,
  getUserByLoginWithPermissions,
  saveUser,
  updateUser
}

export default UserRepository;