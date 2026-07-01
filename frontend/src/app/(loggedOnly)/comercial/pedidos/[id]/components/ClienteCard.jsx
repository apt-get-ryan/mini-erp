"use client";
import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import ManageClienteForm from "./ManageClienteForm";

function ClienteCard({idPedido, cliente}) {
  const handleSetClient = () => {
    modals.open({
      modalId: "editRow",
      title: "Definir o cliente do pedido",
      children: (<ManageClienteForm idPedido={idPedido}/>)
    })
  }
  if(cliente) {
    return (
      <div className="stat block!" suppressHydrationWarning>
        <div className="stat-title text-base-content">Cliente</div>
        <div className='stat-value overflow-x-auto'>{cliente.nomeFantasia}</div>
      </div>
    );
  }
  return (
    <div className="stat block!" suppressHydrationWarning>
      <div className="stat-title text-base-content">Cliente</div>
      <div className='stat-value overflow-x-auto'>Nenhum </div>
      <div className='stat-actions pt-3'>
        <Button onClick={() => handleSetClient()}>
          Definir cliente
        </Button>
      </div>
    </div>
  )
}

export default ClienteCard