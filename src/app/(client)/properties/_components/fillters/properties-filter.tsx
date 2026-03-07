"use client";
import { FindPropertyQuery } from "@/lib/api/properties/find-properties";
import { FilterDialog } from "./dialog";
import { Search } from "./search";

type PropertiesFilterProps = {
  searchParams: FindPropertyQuery;
};

export const PropertiesFilter = ({ searchParams }: PropertiesFilterProps) => {
  return (
    <div className="bg-secondary">
      <div className="flex items-center gap-2 container mx-auto p-2">
        <Search />
        <FilterDialog searchParams={searchParams} />
      </div>
    </div>
  );
};
