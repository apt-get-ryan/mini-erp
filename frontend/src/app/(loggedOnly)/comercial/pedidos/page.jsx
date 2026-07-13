"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useApi, handleApiFillTable, handleResponse, getSuccessData } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';
import { DataTable } from 'mantine-datatable';
import { Button, NumberFormatter  } from '@mantine/core';
import dayjs from 'dayjs';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

function Page() {
  const api = useApi();
  const router = useRouter();
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'id',
    direction: "asc"
  });
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const sortedData = useSortedData(data, sortStatus);
  const fillTable = useCallback(async () => {
      setFetching(true);
      handleApiFillTable(api.get("/pedidos"), setData, setFetching);
    }, []);
  useEffect(() => {
    fillTable()
  }, []);
  const handleAddPedido = async () => {
    try {
      const idNovoPedido = await api.post("/pedidos").then(handleResponse).then(getSuccessData).catch(r => {throw r});
      router.push(`/comercial/pedidos/${idNovoPedido}`)

    } catch ({error}) {
      notifications.show({
        id: "notifyResponseResult",
        title: "Erro",
        message: error.message,
        color: "red",
        classNames: {description: "!text-slate-700"}
      })
    }
  }
  return (
    <>
      <>
      <Button
        onClick={() => {
          modals.openConfirmModal({
            title: `Tem certeza que deseja adicionar pedido?`,
            labels: { confirm: "Confirmar", cancel: "Cancelar"},
            confirmProps: {color: "teal"},
            children: (
              <div>
                Você está adicionando um novo pedido.
              </div>
            ),
            onConfirm: handleAddPedido
          })
        }}
      >Adicionar</Button>
      </>
      <DataTable
        minHeight={200}
        classNames={{header: "select-none"}}
        withTableBorder
        borderRadius="md"
        withColumnBorders
        suppressHydrationWarning
        striped
        highlightOnHover
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        fetching={fetching}
        records={sortedData}
        noRecordsText='Sem dados para exibir'
        my={5}
        columns={[
          {
            accessor: 'id',
            title: '#',
            textAlign: 'right',
            sortable: true
          },
          {
            accessor: 'cliente.nomeFantasia',
            title: "Nome fantasia",
            sortable: true
          },
          {
            accessor: 'valor_pago',
            title: 'Valor pago',
            sortable: true,
            render: ({valor_pago}) => <NumberFormatter prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={2}  fixedDecimalScale value={valor_pago / 100} />
          },
          {
            accessor: 'valor_total',
            title: 'Valor do pedido + Frete',
            sortable: true,
            render: ({valor_total, custo_frete}) => (<>
              <NumberFormatter prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale value={(valor_total + custo_frete) / 100}/>
              <span> + </span>
              <NumberFormatter prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={2} fixedDecimalScale value={custo_frete / 100}/>
            </>)
          },
          {
            accessor: 'createdAt', 
            title: 'Criado em',
            sortable: true ,
            render: ({createdAt}) => dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss")
          },
          {
            accessor: 'updatedAt', 
            title: 'Atualizado em',
            sortable: true,
            render: ({updatedAt}) => dayjs(updatedAt).format("DD/MM/YYYY HH:mm:ss")
          }
        ]}
        onRowClick={({record}) => {
          router.push(`/comercial/pedidos/${record.id}`)
        }}
      />
    </>
  )
}

export default Page;