"use client";
import { DataTable } from "@/components/ui/data-table";
import { findManyDevelopersOptions } from "@/hooks/developers";
import { useQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TABLE_COLUMNS } from "./table-columns";

export const DevelopersTable = () => {
  const { data, isLoading } = useQuery(findManyDevelopersOptions());

  const table = useReactTable({
    data: data?.data?.data ?? [],
    columns: TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="flex-1 h-full overflow-y-auto">
      <DataTable isLoading={isLoading} table={table} />
    </div>
  );
};
