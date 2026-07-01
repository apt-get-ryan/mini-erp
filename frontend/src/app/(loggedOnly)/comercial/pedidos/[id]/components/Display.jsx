import React from 'react';
import DisplayItens from "./PedidoItens/DisplayItens";
import dayjs from 'dayjs';
import ClienteCard from "./ClienteCard";
import ActionsPedido from "./ActionsPedido/ActionsPedido";
import { NumberFormatter, Button } from '@mantine/core';

function Display({id, data}) {
  const createdAt = dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss");
  const updatedAt = dayjs(data.updatedAt).format("DD/MM/YYYY HH:mm:ss");
  return (
    <section>
      <div className='shadow-sm lg:grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,minmax(50%,auto))] xl:grid-cols-[repeat(auto-fit,minmax(33%,auto))]'>
        <ClienteCard idPedido={id} cliente={data.cliente}/>
        <div className='stat'>
          <div className="stat-title text-base-content">Valor total a pagar</div>
          <div className="stat-value"><NumberFormatter prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={2}  fixedDecimalScale value={data.valor_total / 100}/></div>
          <div className="stat-title text-base-content">Valor pago</div>
          <div className="stat-value"><NumberFormatter prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={2}  fixedDecimalScale value={data.valor_pago / 100}/></div>
        </div>
        <div className="stat">
          <div className="stat-title text-base-content">Pedido criado em</div>
          <div className="stat-value">{createdAt}</div>
          <div className="stat-title text-base-content">Pedido atualizado em</div>
          <div className="stat-value">{updatedAt}</div>
        </div>
      </div>
      <ActionsPedido />
      <div className="divider font-bold">Itens do pedido</div>
      <DisplayItens idPedido={id} />
    </section>
  )
}

export default Display