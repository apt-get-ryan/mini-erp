"use client"
import React, { useEffect, useCallback } from 'react';
import { DataTable } from 'mantine-datatable';
import { Box, Button } from '@mantine/core';
import 'mantine-datatable/styles.layer.css';
import { useState } from 'react';
import dayjs from 'dayjs';
import { modals } from "@mantine/modals";
import EditUserForm from './components/EditUserForm';
import { useApi } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';
import { handleApiFillTable } from '@/utils/Requests';
import AddUserForm from './components/AddUserForm';

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
    handleApiFillTable(api.get("/users"), setData, setFetching);
  }, []);
  useEffect(() => {
    fillTable();
  }, [])
  return (
    <>
      <>
        <Button
          onClick={() => {
            modals.open({
              modalId: "addRow",
              title: "Adicionando usuário",
              onClose: fillTable,
              children: (<AddUserForm/>)
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
          { accessor: 'nome' ,
            sortable: true
          },
          {
            accessor: 'email',
            title: 'E-mail',
            sortable: true,
          },
          { 
            accessor: 'login', 
            sortable: true 
          },
          {
            accessor: 'is_verified',
            title: 'Verificado',
            textAlign: "center",
            render: ({is_verified}) => is_verified ? '✅' : '❌'
          },
          {
            accessor: 'is_active',
            title: 'Ativo',
            textAlign: "center",
            render: ({is_active}) => is_active ? '✅' : '❌'
          },
          {
            accessor: 'verification_code', 
            title: 'Código/Verificação',
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
        onRowClick={({ record: { id, nome, login, email, is_verified, is_active, createdAt, updatedAt } }) =>
          modals.open({
            modalId: "editRow",
            onClose: fillTable,
            title: `Editando ${login} - #${id}`,
            children: (
              <>
                <Box>
                  <EditUserForm defaultValues={{id, nome, login, email, is_verified, is_active, createdAt, updatedAt}}/>
                </Box>
              </>
            )
          })
        }
      >

      </DataTable>
    </>
  )
}

export default Page