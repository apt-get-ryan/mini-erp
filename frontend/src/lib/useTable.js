import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import { useState } from "react"

export function useTable({ data, columns }) {
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState([])

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      globalFilter,
      columnFilters,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    // features
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // multi sort ativado
    enableMultiSort: true,
  })
  return {
    table,

    // API simplificada 👇
    rows: table.getRowModel().rows,
    headers: table.getHeaderGroups(),

    // paginação
    pageCount: table.getPageCount(),
    nextPage: table.nextPage,
    prevPage: table.previousPage,

    // busca global
    setSearch: setGlobalFilter,

    // filtro por coluna
    setColumnFilter: (id, value) =>
      setColumnFilters((prev) => [
        ...prev.filter((f) => f.id !== id),
        { id, value },
      ]),
  }
}