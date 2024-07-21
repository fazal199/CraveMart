"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SelectContent, SelectTrigger, Select, SelectValue, SelectItem } from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        }
    })


    return (
        <>
            <div className="flex gap-4 items-center justify-end mb-5">
                <p className="whitespace-nowrap text-sm font-semibold">Rows per page</p>
                <Select

                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                    }}
                >
                    <SelectTrigger className="h-8 w-[4.5rem]">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        <SelectItem value="10">
                            10
                        </SelectItem>
                        <SelectItem value="30">
                            30
                        </SelectItem>
                        <SelectItem value="50">
                            50
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-5">
                <div>
                    <Input
                        placeholder="Filter OrderDate..."
                        value={(table.getColumn("orderDate")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("orderDate")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm text-center"
                    />
                </div>
                <div>
                    <Input
                        placeholder="Filter Total Products..."
                        value={(table.getColumn("totalProducts")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("totalProducts")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm text-center"
                    />
                </div>
                <div>
                    <Input
                        placeholder="Filter Payment Mode..."
                        value={(table.getColumn("paymentMode")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("paymentMode")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm text-center"
                    />
                </div>
                <div>
                    <Input
                        placeholder="Filter Order Status..."
                        value={(table.getColumn("orderStatus")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("orderStatus")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm text-center"
                    />
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="py-4" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}

                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const value = cell.getValue();

                                        return (
                                            <TableCell className="py-2" key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        )
                                    }
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center font-semibold text-xl">
                                    No Records.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
            <Pagination className="mt-4  text-black py-3">
                <PaginationContent className="space-x-5">
                    <PaginationItem>
                        <PaginationPrevious className={`${!table.getCanPreviousPage() && 'opacity-40 active:bg-first-500'} bg-first-500 text-white cursor-pointer`} onClick={() => table.previousPage()} href={undefined} />
                    </PaginationItem>
                    <PaginationItem className="font-semibold italic">Showing Page {table.getState().pagination.pageIndex + 1} Of {table.getPageCount()}</PaginationItem>
                    <PaginationItem>
                        <PaginationNext className={`${!table.getCanNextPage() && 'opacity-40 active:bg-first-500'} bg-first-500 text-white cursor-pointer`} onClick={() => { if (table.getState().pagination.pageIndex + 1 != table.getPageCount()) return table.nextPage() }} href={undefined} />
                    </PaginationItem>

                </PaginationContent>

            </Pagination>


        </>
    )
}
