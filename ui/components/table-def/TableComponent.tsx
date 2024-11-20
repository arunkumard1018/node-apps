"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import React from "react"
import { cn } from "@/lib/utils"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] 
    heading: string
    headingInfo: string
    isSearchInputRequired: boolean
    searchInputValue: string
    isSelectAvailable?: boolean
    smHiddenCells?: string[]
}

export function TableComponent<TData, TValue>(
    {
        columns,
        data,
        heading,
        headingInfo,
        isSearchInputRequired,
        searchInputValue,
        isSelectAvailable = true,
        smHiddenCells
    }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0" className=" rounded-none shadow-none border">
                {/* Table Header */}
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">{heading}</CardTitle>
                        <CardDescription>{headingInfo}</CardDescription>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center py-4">
                            {isSearchInputRequired &&
                                <Input
                                    placeholder={`Filter By ${searchInputValue}...`}
                                    value={(table.getColumn(searchInputValue)?.getFilterValue() as string) ?? ""}
                                    onChange={(event) =>
                                        table.getColumn(searchInputValue)?.setFilterValue(event.target.value)
                                    }
                                    className="max-w-sm"
                                />}
                        </div>

                        {/* Table Column View Options */}
                        <DataTableViewOptions table={table} />
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="">
                        <Table className="relative">
                            <TableHeader className="bg-accent">
                                {table.getHeaderGroups().map((headerGroup) => (

                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header, index) => {
                                            const val = columns[index].id ? smHiddenCells?.includes(columns[index].id) : undefined;

                                            return (
                                                <TableHead key={header.id} className={cn( " text-xs md:text-sm",val && "hidden md:table-cell")} >
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
                                            {row.getVisibleCells().map((cell, index) => {
                                                const val = columns[index].id ? smHiddenCells?.includes(columns[index].id) : undefined;
                                                return (
                                                    <TableCell key={cell.id} className={cn(val && "hidden md:table-cell")}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                )
                                            }
                                            )}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>{table.getRowCount()}</strong> of <strong>{data.length}</strong>{" "}
                        {heading}
                        {isSelectAvailable && <div className="flex-1 text-sm text-muted-foreground">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>}
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="space-x-2 flex">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}>
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}>
                                Next
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}


