import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Pagination } from "../Pagination"
import { useState } from "react"
import { FormModal } from "../FormModal"
import { SelectComponent } from "./SelectComponent"
import { Filters } from "./Filters"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const [showModal, setShowModal] = useState(false);


    return (
        <div>
            <div className="flex items-center justify-between space-x-2 py-4">
            {/* New User button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowModal(!showModal)}
                >
                    Create new user
                </Button>
                <div>
                    <Filters/>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* bottom buttons */}
            <div className="flex items-center justify-between space-x-2 py-4">
                {/* Show results per pages button */}
                <SelectComponent/>                
                {/* Pagination */}
                <Pagination />
            </div>
            <div className="flex items-center justify-end space-x-2 py-4"   >
            </div>

            {/* ModalForm */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-opacity-50 bg-gray-600 backdrop-blur">
                    <FormModal setShowModal={setShowModal} isUpdate={false} user={null} />
                </div>
            )}
        </div>
    )
}
