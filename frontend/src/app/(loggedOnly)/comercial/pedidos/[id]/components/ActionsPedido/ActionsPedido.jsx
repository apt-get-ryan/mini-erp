import React from 'react';
import { Button } from '@mantine/core';

function ActionsPedido() {
  return (
    <div className='flex justify-end px-2 py-3.5 gap-1.25'>
      <Button color='yellow'>
        Lançar pagamento
      </Button >
      <Button color='red'>
        Excluir pedido
      </Button >
    </div>
  )
}

export default ActionsPedido