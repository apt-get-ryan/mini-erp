import PagamentoRepository from "@/repositories/crm/PagamentoRepository.ts";

async function getPagamentosPorIdDoPedido(idPedido: number) {
  return await PagamentoRepository.getPagamentosPorIdDoPedido(idPedido);
}

async function createPagamento(data) {
  return await PagamentoRepository.createPagamento(data);
}

const PagamentoService = {
  createPagamento,
  getPagamentosPorIdDoPedido,
}

export default PagamentoService;