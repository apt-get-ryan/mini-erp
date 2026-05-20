import { Module, User, Role, Permission } from "@/models/models.js";
import db from "@/database/database.js";

const getModule = async (id) => {
  try {
    return await Module.findByPk(id);
  } catch(error) {
    throw new Error(error);
  }
}

const getModules = async () => {
  try {
    return await Module.findAll();
  } catch(error) {
    throw new Error(error);
  }
}

const getAcessibleModules = async (id) => {
  try {
    const modules = await Module.findAll({
      raw: true,
      where: { is_active: true },
      order: [['sort_order', 'DESC'], ['slug', 'ASC']],
      include: [{
        model: Permission,
        required: true,
        attributes: [],
        through: { attributes: [] },
        include: [{
          model: Role,
          required: true,
          attributes: [],
          through: { attributes: [] },
          include: [{
            model: User,
            required: true,
            attributes: [],
            through: { attributes: [] },
            where: {id: id}
          }]

        }]
      }]
    });
    const map = {};

    modules.forEach(m => map[m.id] = {...m, submodules: []})
    const tree = [];
    modules.forEach(m => {
      if(m.parent_id != null) {
        map[m.parent_id].submodules.push(m);
      } else {
        tree.push(map[m.id]);
      }
    });
    return tree;
  } catch (error) {
    throw new Error(error);
  }
}


const saveModule = async ({nome, slug, rota, icone, parent_id, sort_order, is_active}) => {
  try {
    const module = await Module.create({nome, slug, rota, icone, parent_id, sort_order, is_active});
    return module;
  } catch ( error ) {
    throw new Error(error);
  }
}


const updateModule = async (id, {nome, slug, rota, icone, parent_id, sort_order, is_active}) => {
  try {
    const targetModule = await Module.findByPk(id);
    if(!targetModule)
      throw new Error("Module not found");
    await targetModule.update({nome, slug, rota, icone, parent_id, sort_order, is_active});
    return targetModule;
  } catch (error) {
    throw new Error(error);
  }
}

const ModuleRepository = {
  getModule,
  getModules,
  getAcessibleModules,
  saveModule,
  updateModule
};

export default ModuleRepository;