"use client";
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useApi, handleApiFillTable, handleResponse, getSuccessData } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';
import { DataTable } from 'mantine-datatable';
import { Button, NumberFormatter } from '@mantine/core';
import dayjs from 'dayjs';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import AddPedidoItemForm from "./AddPedidoItemForm";
import EditPedidoItemForm from "./EditPedidoItemForm";

function DisplayItens({idPedido}) {
  const isFirstRun = useRef(true);
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
      handleApiFillTable(api.get("/pedidos/"+idPedido+"/itens"), setData, setFetching);
    }, []);
  useEffect(() => {
    if(!isFirstRun.current) return;
    isFirstRun.current = false;
    fillTable();
  }, []);
  return (
    <div>
      <>
        <Button onClick={() => {
          modals.open({
            modalId: "addRow",
            title: `Adicionando item ao pedido #${idPedido}`,
            onClose: () => {
              fillTable();
              router.refresh();
            },
            children:(<AddPedidoItemForm idPedido={idPedido}/>)
          })
        }}>
          Adicionar
        </Button>
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
            accessor:'produto.nome',
            title: "Produto",
            sortable: true
            
          },
          {
            accessor: 'valor',
            title: 'Valor',
            sortable: true,
            render: ({valor}) => <NumberFormatter prefix='R$ ' thousandSeparator='.' decimalSeparator=',' decimalScale={2}  fixedDecimalScale value={valor / 100}/>
          },
          {
            accessor: 'quantidade',
            title: 'Quantidade',
            sortable: true
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
          modals.open({
            modalId: "editRow",
            title: `Editando item #${record.id} do pedido #${idPedido}`,
            onClose: () => {
              fillTable();
              router.refresh();
            },
            children: (
              <EditPedidoItemForm idPedido={idPedido} idItem={record.id}/>
            )
          })
        }}
      />
    </div>
  )
}

export default DisplayItens