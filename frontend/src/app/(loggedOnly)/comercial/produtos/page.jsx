"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useApi, handleApiFillTable } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';
import { DataTable } from 'mantine-datatable';
import { Button } from '@mantine/core';
import dayjs from 'dayjs';
import { modals } from '@mantine/modals';
import {IMask} from "react-imask";
import AddProdutoForm from './components/AddProdutoForm';
import EditProdutoForm from './components/EditProdutoForm';

function BtnDescricao({descricao}) {
  return (
    <Button color="cyan" onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      modals.open({id: "rowObs", title: "Descrição", children: (descricao)})
    }}>
      Descrição
    </Button>
  )
}

const Page = () => {
  const api = useApi();
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'id',
    direction: "asc"
  });
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const sortedData = useSortedData(data, sortStatus);
  const fillTable = useCallback(async () => {
    setFetching(true);
    handleApiFillTable(api.get("/produtos"), setData, setFetching);
  }, []);
  useEffect(() => {
    fillTable();
  }, []);
  return (
    <>
      <>
        <Button onClick={() => {
          modals.open({
            modalId: "addRow",
            title: "Adicionando produto",
            onClose: fillTable,
            children: (<AddProdutoForm/>)
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
            accessor: 'nome',
            title: 'Nome',
            sortable: true
          },
          {
            accessor: 'descricao',
            title: 'Descrição',
            sortable: true,
            render: ({descricao}) => (<BtnDescricao descricao={descricao} />),
            width: 140
          },
          {
            accessor: 'preco',
            title: 'Preço',
            sortable: true,
            render: ({preco}) => {
              const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
              return formatter.format(preco/100)
            }
          },
          {
            accessor: 'custo',
            title: 'Custo',
            sortable: true,
            render: ({custo}) => {
              const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
              return formatter.format(custo/100)
            }
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
            modalId: 'editRow',
            title: `Editando produto #${record.id}`,
            onClose: fillTable,
            children: (<EditProdutoForm id={record.id} />)
          })
        }}
      />
    </>
  )
}

export default Page;