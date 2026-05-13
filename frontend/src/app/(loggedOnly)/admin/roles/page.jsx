"use client"
import React, { useEffect, useCallback} from 'react';
import { DataTable } from 'mantine-datatable';
import { Box, Button } from '@mantine/core';
import 'mantine-datatable/styles.layer.css';
import { useState } from 'react';
import dayjs from 'dayjs';
import { modals } from "@mantine/modals";
import EditRoleForm from './components/EditRoleForm';
import AddRoleForm from './components/AddRoleForm';
import { useApi } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';


const page = () => {
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
      api.get("/roles")
        .then(setData)
        .catch(console.log)
        .finally(() => {
          setFetching(false);
        })
    }, []);
  useEffect(() => {
    fillTable();
  }, [])
  return (
    <>
      <>
        <Button onClick={() => modals.open({
          modalId: "addRow",
          title: "Adicionando Role",
          onClose: fillTable,
          children: (<AddRoleForm/>)
        })}>Adicionar</Button>
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
            // 👇 this column has a custom title
            title: '#',
            // 👇 right-align column
            textAlign: 'right',
            sortable: true
          },
          { accessor: 'nome' ,
            sortable: true
          },
          { 
            accessor: 'descricao', 
            title: "Descrição",
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
        onRowClick={({record: {id, nome, descricao}}) => 
          modals.open({
            modalId: "editRow",
            onClose: fillTable,
            title: `Editando "${nome}" - #${id}`,
            children: (
              <>
                <Box>
                  <EditRoleForm defaultValues={{id, nome, descricao}} />
                </Box>
              </>
            )
          })
        }
      />
    </>
  )
}

export default page