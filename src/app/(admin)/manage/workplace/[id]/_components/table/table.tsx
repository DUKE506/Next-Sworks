"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import DataTable from "../../../components/table/data-table";
import { admins, columns } from "./columns";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DepartmentSideBar from "@/app/(admin)/manage/user/_components/users/_components/departmentSideBar/department-sidebar";
import UserList from "@/app/(admin)/manage/user/_components/users/_components/usersList/user-list";

export const Admins = () => {
  return (
    <Card>
      <div className="flex px-6 justify-between items-center">
        <CardTitle>관리자</CardTitle>
        <div className="flex gap-4">
          <AddManagerDialog />
        </div>
      </div>
      <CardContent>
        <DataTable columns={columns} data={admins} />
      </CardContent>
    </Card>
  );
};

const AddManagerDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Plus
          className="text-muted-foreground hover:cursor-pointer hover:text-[var(--primary-color)]"
          size={18}
        />
      </DialogTrigger>
      <DialogContent className="sm:min-w-300 sm:min-h-150 flex flex-col">
        <DialogHeader>
          <DialogTitle>추가</DialogTitle>
        </DialogHeader>
        <div className="flex flex-1">
          <DepartmentSideBar edit />
          <UserList edit />
        </div>
      </DialogContent>
    </Dialog>
  );
};
