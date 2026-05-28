"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useApi, handleApiFillTable } from '@/utils/Requests';
import { useSortedData } from '@/utils/TableData';
import { DataTable } from 'mantine-datatable';
import { Button } from '@mantine/core';
import dayjs from 'dayjs';
import { modals } from '@mantine/modals';
// import AddCliente from './components/AddCliente';
import {IMask} from "react-imask";
import AddProdutoForm from './components/AddProdutoForm';
// import EditCliente from './components/EditCliente';

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
    fillTable()
  }, []);
  return (
    <>
      <>
        <Button onClick={() => {
          modals.open({
            modalId: "addRow",
            title: "Adicionando cliente",
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
        ]}
        
      />
    </>
  )
}

export default Page;