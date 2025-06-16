import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";

interface HeaderFixedTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onClick?: (data: TData) => void;
  placeholder?: string;
  selectedRow?: TData[];
  onSelect?: (data: Record<string, boolean>) => void;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
}

const HeaderFixedTable = <TData, TValue>({
  columns,
  data,
  onClick,
  placeholder,
  selectedRow,
  onSelect,
  onRowSelectionChange,
}: HeaderFixedTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    if (selectedRow && selectedRow.length > 0) {
      // console.log("여기옴");
      // console.log(selectedRow);
      const selection = Object.fromEntries(
        selectedRow.map((row: any) => [row.id, true])
      );
      // console.log("강제 selection 설정됨:", selection);
      setRowSelection(selection);
    } else {
      // console.log("selectedRow 없음 -> 선택 해제");
      setRowSelection({});
    }
  }, [selectedRow]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);

      if (onRowSelectionChange) {
        const newSelection =
          typeof updater === "function" ? updater(rowSelection) : updater;
        const selectedRows = Object.keys(newSelection)
          .filter((key) => newSelection[key])
          .map((id) => data.find((row: any) => row.id === id))
          .filter(Boolean) as TData[];

        onRowSelectionChange(selectedRows);
      }
    },

    state: { rowSelection },
    getRowId: (row: any) => row.id,
  });

  return (
    <div className="flex flex-col flex-1 border rounded-lg overflow-hidden">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-xs sticky top-0 bg-stone-100"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
      </div>
      <div className="flex-1 overflow-auto">
        <Table>
          <TableBody className="overflow-auto">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="text-xs border-b"
                      key={cell.id}
                      onClick={
                        onClick ? () => onClick(row.original) : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {placeholder ?? "내용 없음"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HeaderFixedTable;
