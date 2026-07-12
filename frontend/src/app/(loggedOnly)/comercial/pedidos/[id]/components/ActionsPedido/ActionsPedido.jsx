"use client";
import React from 'react';
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import PagamentoForm from './PagamentoForm';
import { useRouter } from 'next/navigation';
import { useApi } from '@/utils/Requests';



function ActionsPedido({idPedido, data}) {
  const api = useApi();
  const router = useRouter();
  const handlePaymentModal = () => {
    modals.open({
      modalId: "payment",
      title: "Lançar pagamento",
      children: (<PagamentoForm idPedido={idPedido} data={data}/>)
    })
  }
  const handleDelete = () => {
    api.delete("/pedidos/"+idPedido)
      .then(() => {
        router.push("/comercial/pedidos");
      });
  };
  const handleDeleteModal = () => {
    modals.openConfirmModal({
      modalId: "deleteRow",
      title: "Excluir pedido",
      children: (<p>Tem certeza que deseja excluir o pedido #{idPedido} e os pagamentos associados a ele?<br />Não será possível reverter esta ação.</p>),
      labels: {confirm: "Excluir", cancel: "Cancelar"},
      confirmProps: {color: "red"},
      onConfirm: () => {
        handleDelete();
      }
    })
  }
  return (
    <div className='flex justify-end px-2 py-3.5 gap-1.25'>
      <Button color='yellow' onClick={handlePaymentModal}>
        Lançar pagamento
      </Button >
      <Button color='red' onClick={handleDeleteModal}>
        Excluir pedido
      </Button >
    </div>
  )
}

export default ActionsPedido