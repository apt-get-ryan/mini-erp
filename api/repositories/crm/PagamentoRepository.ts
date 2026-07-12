import { Pagamento, Pedido, PedidoItem } from "@/models/models.js";
import { HttpError } from "@/utils/HttpError.ts";
import type { Pagamento as PagamentoType } from "@/schemas/crm/Pagamento.ts";

async function checarSeValorNaoExcedeValorDoPedido(idPedido : number, valor : number) {
  const pagamentos = await Pagamento.findAll({
    where: {
      id_pedido: idPedido
    },
    attributes: ["valor"],
    raw: true
  });
  let valorTotalDosPagamentos = (pagamentos as any[])?.reduce((acc, pagamento) => acc + pagamento.valor, 0) || 0;
  valorTotalDosPagamentos += valor;
  const pedidoItens = await PedidoItem.findAll({
    attributes: ["valor", "quantidade"],
    where: {
      id_pedido: idPedido
    }
  }) as any[];
  let valorTotalDoPedido = 0;
  for (const item  of pedidoItens) {
    valorTotalDoPedido += item.valor * item.quantidade;
  }
  if (valorTotalDosPagamentos > valorTotalDoPedido) {
    throw new Error("O valor do pagamento excede o valor total do pedido.");
  }
}

const createPagamento = async (data : PagamentoType) => {
  try {
    await checarSeValorNaoExcedeValorDoPedido(data.id_pedido, data.valor);
    await Pagamento.create(data);
    return;
  } catch (error) {
    throw HttpError.from(error);
  }
}

const getPagamentosPorIdDoPedido = async (idPedido : number) => {
  try {
    const pagamentos = await Pagamento.findAll({
      where: {
        id_pedido: idPedido
      }
    });
    return pagamentos;
  } catch (error) {
    throw new Error(error);
  }
}

const PagamentoRepository =  {
  getPagamentosPorIdDoPedido,
  createPagamento
}

export default PagamentoRepository;