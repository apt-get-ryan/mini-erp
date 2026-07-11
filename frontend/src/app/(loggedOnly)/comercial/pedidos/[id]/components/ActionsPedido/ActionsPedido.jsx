"use client";
import React from 'react';
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import PaymentForm from './PaymentForm';



function ActionsPedido({id}) {
  const handlePayment = () => {
    modals.open({
      modalId: "payment",
      title: "Lançar pagamento",
      children: (<PaymentForm />)
    })
  }
  return (
    <div className='flex justify-end px-2 py-3.5 gap-1.25'>
      <Button color='yellow' onClick={handlePayment}>
        Lançar pagamento
      </Button >
      <Button color='red'>
        Excluir pedido
      </Button >
    </div>
  )
}

export default ActionsPedido