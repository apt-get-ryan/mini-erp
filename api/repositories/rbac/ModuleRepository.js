import { Module, User, Role, Permission } from "@/models/models.js";
import { HttpError } from '@/utils/HttpError.ts';

const getModule = async (id) => {
  try {
    return await Module.findByPk(id);
  } catch(error) {
    throw HttpError.from(error);
  }
}

const getModules = async () => {
  try {
    return await Module.findAll();
  } catch(error) {
    throw HttpError.from(error);
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
    throw HttpError.from(error);
  }
}


const saveModule = async (data) => {
  try {
    const module = await Module.create(data);
    return module;
  } catch ( error ) {
    throw HttpError.from(error);
  }
}


const updateModule = async (id, data) => {
  try {
    const targetModule = await Module.findByPk(id);
    if(!targetModule)
      throw new HttpError("Não foi possível encontrar os dados para editar", 404);
    await targetModule.update(data);
    return;
  } catch (error) {
    throw HttpError.from(error)
  }
}

const deleteModule = async (id) => {
  try {
    const module = await Module.findByPk(id);
    if(!module)
      throw new HttpError("Não foi possível encontrar os dados para deletar", 404);
    await module.destroy();
    return;
  } catch (error) {
    throw HttpError.from(error)
  }
}

const ModuleRepository = {
  getModule,
  getModules,
  getAcessibleModules,
  saveModule,
  updateModule,
  deleteModule
};

export default ModuleRepository;