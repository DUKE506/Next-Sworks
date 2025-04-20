

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { ColumnDef, flexRender, getCoreRowModel, RowSelectionState, useReactTable } from '@tanstack/react-table';

interface HeaderFixedTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onClick?: (data: TData) => void;
    placeholder?: string;
    selectedRow?: TData[];
    onSelect?: (data: Record<string, boolean>) => void;
}

const HeaderFixedTable = <TData, TValue>({
    columns,
    data,
    onClick,
    placeholder,
    selectedRow,
    onSelect,
}: HeaderFixedTableProps<TData, TValue>) => {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: (updater) => {
            const newState = typeof updater === 'function'
                ? updater(rowSelection)
                : updater;

            setRowSelection(rowSelection);

            if (onSelect) {
                console.log(onSelect)
                onSelect(newState)
            }
        }, //hoist up the row selection state to your own scope
        state: {
            rowSelection, //pass the row selection state back to the table instance
        },
    })
    return (
        <div className="flex-1 rounded-md border overflow-auto bg-white h-full">
            <table className='w-full caption-bottom text-sm'>
                <TableHeader className='sticky top-0 '>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead className='text-xs sticky top-0 bg-stone-100' key={header.id}>
                                                {
                                                    header.isPlaceholder
                                                        ?
                                                        null
                                                        :
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                }
                                            </TableHead>
                                        )
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
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
                                        onClick={onClick ? () => onClick(row.original) : undefined}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                                {
                                    placeholder ?? '내용 없음'
                                }
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </table>
        </div>
    )
}

export default HeaderFixedTable