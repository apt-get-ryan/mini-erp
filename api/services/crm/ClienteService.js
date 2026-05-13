import ClienteRepository from "../../repositories/crm/ClienteRepository.js";

async function getClientes(options = undefined) {
  return await ClienteRepository.getClientes(options);
}

async function getCliente(id, options = undefined) {
  return await ClienteRepository.getClientes(id, options);
}

async function createCliente(data, options = undefined) {
  return await ClienteRepository.createCliente(data);
}

export default ClienteService = {
  getClientes,
  getCliente,
  createCliente

}