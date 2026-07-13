import PedidoRepository from "@/repositories/crm/PedidoRepository.ts";
import { updateSchema } from "@/schemas/crm/Pedido.ts";
import z from "zod";
import type { FindOptions } from "sequelize";

async function getPedidos(options: FindOptions = undefined) {
  return await PedidoRepository.getPedidos(options);
}

async function getPedido(id) {
  return await PedidoRepository.getPedido(id);
}

async function createPedido() {
  return await PedidoRepository.createPedido();
}
async function patchPedido(id, data) {
  data = updateSchema.parse(data);
  return await PedidoRepository.patchPedido(id, data);
}
async function deletePedido(id) {
  return await PedidoRepository.deletePedido(id);
}

async function setClienteToPedido(idCliente: number, idPedido: number) {
  return await PedidoRepository.setClienteToPedido(idCliente, idPedido);
}

const PedidoService = {
  getPedidos,
  getPedido,
  createPedido,
  patchPedido,
  deletePedido,
  setClienteToPedido
};

export default PedidoService;