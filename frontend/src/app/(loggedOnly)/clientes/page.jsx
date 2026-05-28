"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useApi, handleApiFillTable } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';
import { DataTable } from 'mantine-datatable';
import { Button } from '@mantine/core';
import dayjs from 'dayjs';
import { modals } from '@mantine/modals';
import AddClienteForm from './components/AddClienteForm';
import {IMask} from "react-imask";
import EditClienteForm from './components/EditClienteForm';

function BtnObservacao({observation}) {
  return (
    <Button color="cyan" onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      modals.open({id: "rowObs", title: "Observação", children: (observation)})
    }}>
      Observação
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
      handleApiFillTable(api.get("/clientes"), setData, setFetching);
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
              title: "Adicionando cliente",
              onClose: fillTable,
              children: (<AddClienteForm/>)
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
            sortable: true,
            render: ({whatsapp}) => {
              if(typeof whatsapp == 'string') {
                const masked = IMask.pipe(
                  whatsapp,
                  {
                    mask: "(00) 00000-0000"
                  }
                )
                return masked;
              }
              return whatsapp;
            }
          },
          { accessor: 'instagram',},
          { accessor: 'email', title: 'E-mail'},
          { accessor: 'obs', render: ({obs}) => (<BtnObservacao observation={obs} />)},
          { accessor: 'estado'},
          { accessor: 'cidade'},
          { accessor: 'bairro'},
          { accessor: 'logradouro'},
          { accessor: 'endereco', title: 'Endereço'},
          { accessor: 'createdAt', render: ({createdAt}) => dayjs(createdAt).format("DD/MM/YYYY HH:mm:ss"), width: 170},
          { accessor: 'updatedAt', render: ({updatedAt}) => dayjs(updatedAt).format("DD/MM/YYYY HH:mm:ss"), width: 170},
        ]}
       onRowClick={({record}) => modals.open({
        modalId: "editRow",
        title: `Editando cliente #${record.id}`,
        onClose: fillTable,
        children: (<EditClienteForm defaultValues={record}/>)
       })}
      />
    </>
  )
}

export default Page