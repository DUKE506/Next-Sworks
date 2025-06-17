"use client";

import React from "react";
import { Input } from "../input";
import { Plus, PlusIcon, Trash2 } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import DataList from "./data-list";
import { Button } from "../button";
import IconButton from "../icon-button/icon-button";

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
          <IconButton
            className="text-muted-foreground"
            icon={PlusIcon}
            onClick={onClickPlus}
          />
          <IconButton className="text-muted-foreground" icon={Trash2} />
        </div>
      </div>
      <DataList columns={columns} data={data} />
    </div>
  );
};

export default PaginationTable;
