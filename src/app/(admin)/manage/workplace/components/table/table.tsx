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
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const TableArea = () => {
  const router = useRouter();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>사업장</CardTitle>
      </CardHeader>
      <CardDescription className="flex px-6 justify-between">
        <Input className="w-50" />
        <Plus
          className="hover:cursor-pointer"
          onClick={() => router.push("/manage/workplace/add")}
          size={24}
        />
      </CardDescription>
      <CardContent>
        <DataTable columns={columns} data={workPlaces} />
      </CardContent>
    </Card>
  );
};

export default TableArea;
