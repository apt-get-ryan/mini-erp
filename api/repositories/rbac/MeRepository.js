import { Module, User, Role, Permission } from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";
import { Sequelize } from "sequelize";

const checkIfUserCanAccessRoute = async (id, route) => {
  try {
    const hasAccess = await Module.count(
      {
        where: {
          is_active: true,
          rota: route
        },
        include: [{
          model: Permission,
          through: { attributes: []},
          attributes: ['resource', 'action'],
          required: false,
          include: [{
            model: Role,
            through: { attributes: []},
            attributes: ['id', 'nome'],
            required: false,
            include: [{
              model: User,
              where: { id: id},
              required: true,
              through: { attributes: []},
              attributes: []
            }]
          }]
        }]
      }
    );

    return Boolean(hasAccess);
  } catch (error) {
    throw HttpError.from(error);
  }
}

const getModulesByUserId = async (id) => {
  try {
    const modules = Module.findAll(
      {
        group: ['id'],
        order: [
          [Sequelize.literal('parent_id IS NULL'), 'ASC'],
          ['parent_id', 'ASC']
        ],
        attributes: ['id', 'nome', 'rota', 'icone', 'parent_id'],
        where: {
          is_active: true
        },
        include: [{
          model: Permission,
          attributes: [],
          through: { attributes: []},
          required: true,
          include: [{
            model: Role,
            attributes: [],
            through: { attributes: []},
            required: true,
            include: [{
              model: User,
              where: { id: id },
              attributes: [],
              through: { attributes: [] },
              required: true
            }]
          }]
        }]
      }
    );
    return modules;
  } catch (error) {
    throw HttpError.from(error);
  }
}

const checkIfUserHasPermission = async (userId, resource, action) => {
  const where = {
    resource: resource
  }
  if( action !== undefined)
    where.action = action;
  try {
    const hasPermission = await Permission.count({
      where: where,
      include:[{
        model: Role,
        attributes: [],
        through: { attributes: []},
        required: true,
        include: [{
          model: User,
          where: { id: userId },
          attributes: [],
          through: { attributes: [] },
          required: true
        }]
      }]
    })
    return Boolean(hasPermission);
  } catch (error) {
    throw HttpError.from(error);
  }
}

export default {
  checkIfUserCanAccessRoute,
  getModulesByUserId,
  checkIfUserHasPermission
}