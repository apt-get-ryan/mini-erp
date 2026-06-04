"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useApi, handleApiFillTable } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';
import { DataTable } from 'mantine-datatable';
import { Button } from '@mantine/core';
import dayjs from 'dayjs';
import { modals } from '@mantine/modals';
import AddCategoriaForm from './components/AddCategoriaForm';
import EditCategoriasForm from './components/EditCategoriasForm';

function Page() {
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
      handleApiFillTable(api.get("/categorias"), setData, setFetching);
    }, []);
  useEffect(() => {
    fillTable()
  }, []);
  return (
    <>
      <>
        <Button
          onClick={() => {
            modals.open({
              modalId: "addRow",
              title: "Adicionando categoria",
              onClose: fillTable,
              children: (<AddCategoriaForm/>)
            })
          }}
        >
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
            accessor: "id",
            title: "#",
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
            sortable: true
          },
          {
            accessor: 'is_active', 
            title: "Ativo?",
            sortable: true ,
            render: ({is_active}) => is_active ? '✅' : '❌'
          },
          {
            accessor: 'id_parent',
            title: 'Filho de',
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
        onRowClick={({record}) => modals.open({
          modalId: "editRow",
          title: `Editando categoria #${record.id}`,
          onClose: fillTable,
          children: (<EditCategoriasForm defaultValues={record}/>)
        })}
      />
    </>
  )
}

export default Page