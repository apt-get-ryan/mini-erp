"use client"
import React, { useCallback, useEffect, useMemo } from 'react';
import { DataTable } from 'mantine-datatable';
import { Box, Button, Space } from '@mantine/core';
import { useState } from 'react';
import dayjs from 'dayjs';
import { modals } from "@mantine/modals";
import EditModuleForm from './components/EditModuleForm';
import AddModuleForm from './components/AddModuleForm';
import { useApi } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';
import { openModal } from '@mantine/modals';
import { useForm } from '@mantine/form';

const Page = () => {
  const api = useApi();
  const updateForm = useForm({
      mode: "uncontrolled",
      initialValues:{
        nome: "",
        slug: "",
        rota: "",
        icone: "",
        parent_id: "",
        sort_order: "",
        is_active: false,
      }
    });
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'id',
    direction: "asc"
  });
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const sortedData = useSortedData(data, sortStatus);
  const fillTable = useCallback(async () => {
    setFetching(true);
    api.get("/modules")
      .then(setData)
      .catch(console.error)
      .finally(() => {
        setFetching(false);
      })
  }, []);

  useEffect(() => {
    fillTable();
  }, []);
  
  return (
    <>
      <>
        <Button 
        onClick={() => modals.open({
          modalId: "addRow",
          title: "Adcionando módulo",
          onClose: fillTable,
          children: (<AddModuleForm modules={data}/>)
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
            accessor: 'slug',
            sortable: true,
          },
          { 
            accessor: 'rota', 
            sortable: true 
          },
          {
            accessor: 'icone',
            title: "Ícone",
            textAlign: "center",
            sortable: false,
            render: ({icone}) => icone
          },
          {
            accessor: 'parent_id', 
            title: "Id-pai",
            sortable: true 
          },
          {
            accessor: 'sort_order', 
            title: "Ordenação",
            sortable: true 
          },
          {
            accessor: 'is_active', 
            title: "Ativo?",
            sortable: true ,
            render: ({is_active}) => is_active ? '✅' : '❌'
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
        onRowClick={(_) => {
          const rowData = _.record;
          updateForm.setValues({
            nome: rowData.nome,
            slug: rowData.slug,
            rota: rowData.rota,
            icone: rowData.icone,
            parent_id: rowData.parent_id?.toString(),
            sort_order: rowData.sort_order,
            is_active: rowData.is_active
          })
          modals.open({
            modalId: "editRow",
            onClose: fillTable,
            // keepMounted: true,
            title: `Editando "${rowData.slug}" - #${rowData.id}`,
            children: (
              <>
                <Box>
                  <EditModuleForm form={updateForm} defaultValues={rowData} otherModules={data.filter(md => md.id!= rowData.id)} />
                </Box>
              </>
            )
          })
        }}
      /> 
    </>
  )
}

export default Page;
