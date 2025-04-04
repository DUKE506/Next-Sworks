"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import DataTable from "./data-table";
import { columns, workPlaces } from "./columns";

const TableArea = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>사업장</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={workPlaces} />
      </CardContent>
    </Card>
  );
};

export default TableArea;
