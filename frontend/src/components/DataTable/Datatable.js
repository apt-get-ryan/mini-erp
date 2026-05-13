import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender
} from "@tanstack/react-table";
import ColumnContextMenu from './ColumnContextMenu';

const columnHelper = createColumnHelper();

const Datatable = () => {
  const columns = [
  columnHelper.accessor("name", {
    header: "Nome",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Idade",
    cell: info => info.getValue(),
  }),
];

const data = [
  { name: "João", age: 25 },
  { name: "Maria", age: 30 },
];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return (
    <>
      <table className='table'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  <ColumnContextMenu column={header.column}>
                    <div className="cursor-pointer select-none">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </ColumnContextMenu>
                </th>
              )

              )}
            </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="border-t">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="p-2">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
    </>
  )
}

export default Datatable