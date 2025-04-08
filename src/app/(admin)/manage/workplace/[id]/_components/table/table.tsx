"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import DataTable from "../../../components/table/data-table";
import { admins, columns } from "./columns";

export const Admins = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>관리자</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={admins} />
      </CardContent>
    </Card>
  );
};
