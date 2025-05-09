"use client";

import React from "react";
import { Input } from "../input";
import { Plus, Trash2 } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import DataList from "./data-list";
import { Button } from "../button";

interface PaginationTableProps<T> {
  label?: string;
  columns: ColumnDef<T>[];
  data: T[];
  onClickPlus: () => void;
}

const PaginationTable = <T,>({
  label,
  columns,
  data,
  onClickPlus,
}: PaginationTableProps<T>) => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-xl font-bold"> {label}</span>
      </div>
      <div className="flex justify-between">
        <Input className="w-60" />
        <div className="flex gap-4 items-center">
          <Button
            className="text-xs rounded-sm bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer"
            onClick={onClickPlus}
          >
            <Plus />
            추가
          </Button>
          <Button className="text-xs rounded-sm bg-red-500 hover:bg-red-600 hover:cursor-pointer">
            <Trash2 />
            삭제
          </Button>
        </div>
      </div>
      <DataList columns={columns} data={data} />
    </div>
  );
};

export default PaginationTable;
