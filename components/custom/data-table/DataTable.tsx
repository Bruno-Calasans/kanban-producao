"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  RowData,
  Row,
  Cell,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTablePagination from "./DataTablePagination";
import { useEffect, useState } from "react";
import DataTableFilter from "./DataTableFilter";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn: string | string[];
  filterPlaceholder?: string;
  className?: string;
  hidePagination?: boolean;
  hideSearch?: boolean;
  pageSizes?: number[];
  defaultPageSize?: number;
  defaultSorting?: {
    id: string;
    desc: boolean;
  }[];
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  onClickRow?: (rowModel: Row<TData>) => void;
  onClickCell?: (cell: Cell<TData, unknown>) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder,
  className,
  hidePagination,
  hideSearch,
  pageSizes,
  defaultPageSize,
  defaultSorting,
  onClickRow,
  onClickCell,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting || []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      return (filterColumn instanceof Array ? filterColumn : [filterColumn]).some((column) => {
        const value = row.getValue(column)?.toString()?.toLowerCase();
        return value?.includes(filterValue.toLowerCase());
      });
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  useEffect(() => {
    if (defaultPageSize) {
      table.setPageSize(defaultPageSize);
    }
  }, [defaultPageSize]);

  return (
    <div>
      {/* Filtro da tabela */}
      {!hideSearch && <DataTableFilter placeholder={filterPlaceholder} table={table} />}

      {/* Tabela em si */}
      <div className={cn("overflow-hidden rounded-md border mt-2", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
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
                  onClick={() => onClickRow && onClickRow(row)}
                  className="cursor-default"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} onClick={() => onClickCell && onClickCell(cell)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nada encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação da tabela */}
      {!hidePagination && <DataTablePagination table={table} pageSizes={pageSizes} />}
    </div>
  );
}
