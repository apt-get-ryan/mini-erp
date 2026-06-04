import ModuleRepository from "@/repositories/rbac/ModuleRepository.js";
import { createSchema, updateSchema } from "@/schemas/rbac/Modules.ts";

const getModule = async (id) => {
  return await ModuleRepository.getModule(id);
}

const getModules = async () => {
  return await ModuleRepository.getModules();
}

const getAcessibleModules = async (id) => {
  return await ModuleRepository.getAcessibleModules(id);
}

const saveModule = async (data) => {
  data = createSchema.parse(data);
  return await ModuleRepository.saveModule(data);
}

const updateModule = async (id, data) => {
  console.log(data)
  data = updateSchema.parse(data);
  return await ModuleRepository.updateModule(id, data)
}

const deleteModule = async (id) => {
  return await ModuleRepository.deleteModule(id);
}

export default {
  getModule,
  getModules,
  getAcessibleModules,
  saveModule,
  updateModule,
  deleteModule
}