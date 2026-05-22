"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { extractRequestData, useApi } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';
import { DataTable } from 'mantine-datatable';
import { Button, Stack } from '@mantine/core';
import dayjs from 'dayjs';
import { modals } from '@mantine/modals';

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
      api.get("/clientes")
        .then(extractRequestData)
        .then(setData)
        .catch(console.log)
        .finally(() => {
          setFetching(false);
        })
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
              title: "Adicionado cliente",
              onClose: fillTable,
              
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
            accessor: 'nomeFantasia',
            title: 'Nome',
            sortable: true
          },
          {
            accessor: 'whatsapp',
            title: 'WhatsApp',
            sortable: true
          }
        ]}
        rowExpansion={{
          content: ({record}) => (
            <Stack gap={5} p={5} >
              {/* <ul>
                <li>Instagram: {record.instagram}</li>
                <li>Criado em: {record.createdAt}</li>
                <li>Atualizado em: {record.updatedAt}</li>
              </ul> */}
              <DataTable
              classNames={{header: "select-none"}}
              withTableBorder
              borderRadius="md"
              withColumnBorders
              suppressHydrationWarning
              striped
              highlightOnHover
              records={[record]}
              m={5}
              onSortStatusChange={setSortStatus}
              columns={[
                { accessor: 'instagram',},
                { accessor: 'email', title: 'E-mail'},
                { accessor: 'obs'},
                { accessor: 'estado'},
                { accessor: 'cidade'},
                { accessor: 'bairro'},
                { accessor: 'logradouro'},
                { accessor: 'endereco', title: 'Endereço'},
                { accessor: 'createdAt', render: ({createdAt}) => dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss")},
                { accessor: 'updatedAt', render: ({updatedAt}) => dayjs(updatedAt).format("DD/MM/YYYY HH:mm:ss")},
              ]}
              />
            </Stack>
          )
        }}
      />
    </>
  )
}

export default page