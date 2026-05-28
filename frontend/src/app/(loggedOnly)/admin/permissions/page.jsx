"use client"
import React, { useEffect, useCallback} from 'react';
import { DataTable } from 'mantine-datatable';
import { Box, Button } from '@mantine/core';
import 'mantine-datatable/styles.layer.css';
import { useState } from 'react';
import dayjs from 'dayjs';
import { modals } from "@mantine/modals";
import EditPermissionForm from './components/EditPermissionForm';
import AddPermissionForm from './components/AddPermissionForm';
import { handleApiFillTable, useApi } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';


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
    handleApiFillTable(api.get("/permissions"), setData, setFetching);
  }, []);
  useEffect(() => {
    fillTable();
  }, [])
  return (
    <>
      <>
        <Button onClick={() => modals.open({
          modalId: "addRow",
          title: "Adicionando permissão",
          onClose: fillTable,
          children: (<AddPermissionForm/>)
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
          { accessor: 'resource' ,
            sortable: true
          },
          {
            accessor: 'action',
            sortable: true,
          },
          { 
            accessor: 'descricao', 
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
        onRowClick={({record: {id, resource, action, descricao}}) => 
          modals.open({
            modalId: "editRow",
            onClose: fillTable,
            title: `Editando "${resource}:${action}" - #${id}`,
            children: (
              <>
                <Box>
                  <EditPermissionForm defaultValues={{id, resource, action, descricao}} />
                </Box>
              </>
            )
          })
        }
      />
    </>
  )
}

export default Page