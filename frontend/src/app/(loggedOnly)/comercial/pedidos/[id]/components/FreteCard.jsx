"use client";
import React from 'react';
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import ManageFreteForm from './ManageFreteForm';

function FreteCard({idPedido, valorFrete}) {
  return (
    <div>
      <Button color='dark' onClick={() => {
        modals.open({
          modalId: `editRow`,
          title: `Definir frete do pedido`,
          children: <ManageFreteForm idPedido={idPedido} valorFrete={valorFrete}/>,
        });
      }}>
        Definir frete
      </Button>
    </div>
  )
}

export default FreteCard