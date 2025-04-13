"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import DataTable from "./data-table";
import { columns, workPlaces } from "./columns";
import { Input } from "@/components/ui/input";

const TableArea = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>사업장</CardTitle>
      </CardHeader>
      <CardDescription className="flex px-6">
        <Input />
      </CardDescription>
      <CardContent>
        <DataTable columns={columns} data={workPlaces} />
      </CardContent>
    </Card>
  );
};

export default TableArea;
