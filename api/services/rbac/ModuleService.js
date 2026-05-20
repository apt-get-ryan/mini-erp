import ModuleRepository from "@/repositories/rbac/ModuleRepository.js";
import * as yup from "yup";


const schema = yup.object({
    nome: yup.string().defined(),
    slug: yup.string().defined(),
    rota : yup.string().defined(),
    icone : yup.string().nullable().defined(),
    parent_id : yup.number().nullable().defined(),
    sort_order : yup.number().defined(),
    is_active: yup.boolean().nullable()
});


const getModule = async (id) => {
  return await ModuleRepository.getModule(id);
}

const getModules = async () => {
  return await ModuleRepository.getModules();
}

const getAcessibleModules = async (id) => {
  return await ModuleRepository.getAcessibleModules(id);
}

const saveModule = async ({nome, slug, rota, icone, parent_id, sort_order, is_active}) => {
  try {
    await schema.validate({nome, slug, rota, icone, parent_id, sort_order, is_active});
    return await ModuleRepository.saveModule({nome, slug, rota, icone, parent_id, sort_order, is_active});
  } catch (err) {
    throw new Error(err);
  }
}

const updateModule = async (id, data) => {
  const moduleExists = await getModule(id);
  if (!moduleExists)
    throw new Error("Module not found");
  if(Object.keys(data).length == 0)
    throw new Error("No fields provided to update")
  return await ModuleRepository.updateModule(id, data)

}
export default {
  getModule,
  getModules,
  getAcessibleModules,
  saveModule,
  updateModule
}