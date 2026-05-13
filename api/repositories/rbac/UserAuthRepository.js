import {User, Role, Permission, Module} from "../../models/models.js";

const getUserByLogin = async (login) => {
  try {
    let user = await User.findOne({
      where: {
        login: login,
        is_verified: true
      },
      include: [{
        model: Role,
        through: { attributes: []},
        attributes: ['nome'],
        required: true,
        include: [{
          model: Permission,
          through: { attributes: []},
          attributes: ['resource', 'action'],
          required: false,
          include: [{
            model: Module,
            through: { attributes: []},
            where: { is_active: true },
            required: false
          }]
        }]
      }]
    });
    
    let accessibleModules = [];
    for(const r of user.Roles) {
      for(const p of r.Permissions) {
        const accessPermission = `${p.resource}:${p.action}`;
        for(const m of p.Modules) {
          accessibleModules.push({...m.toJSON(), accessPermission: accessPermission })
        }
      }
    }
    accessibleModules = mergeSort(accessibleModules, (a, b) => {
      if(a.sort_order != b.sort_order) return (b.sort_order - a.sort_order);
      return a.slug.localeCompare(b.slug);
    } );
    const userPermissions = user.Roles.flatMap(r => r.Permissions).map(p => `${p.resource}:${p.action}`);
    console.log(userPermissions)
    user = user.get({plain: true})
    delete user.Roles;
    return {user, accessibleModules, userPermissions};
  } catch (error) {
    throw new Error(error);
  }
}


const UserAuthRepository = {
  getUserByLogin
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