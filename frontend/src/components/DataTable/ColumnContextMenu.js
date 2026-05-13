import React from 'react';
import { ContextMenu } from 'radix-ui';

const ColumnContextMenu = ({column, children}) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        {children}
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className="menu dropdown-content bg-base-100 rounded-box">

          {/* Ordenação */}
          <ContextMenu.Item
            onClick={() => column.toggleSorting(false)}
            className="p-2  cursor-pointer"
          >
            Ordenar ASC
          </ContextMenu.Item>

          <ContextMenu.Item
            onClick={() => column.toggleSorting(true)}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            Ordenar DESC
          </ContextMenu.Item>

          <ContextMenu.Separator className="h-px bg-gray-200 my-1" />

          {/* Filtro */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Filtrar..."
              value={column.getFilterValue() ?? ""}
              onChange={(e) =>
                column.setFilterValue(e.target.value)
              }
              className="w-full border p-1 rounded"
            />
          </div>

          <ContextMenu.Separator className="h-px bg-gray-200 my-1" />

          {/* Limpar */}
          <ContextMenu.Item
            onClick={() => {
              column.clearSorting();
              column.setFilterValue("");
            }}
            className="p-2 text-red-500 hover:bg-gray-100 cursor-pointer"
          >
            Limpar
          </ContextMenu.Item>

        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}

export default ColumnContextMenu