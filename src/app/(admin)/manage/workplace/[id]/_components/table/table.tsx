"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import DataTable from "../../../components/table/data-table";
import { columns } from "./columns";
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
import CustomSeparator from "@/app/(admin)/manage/_components/Separator/custom-separator";
import { useAdminStore } from "@/store/admin-store";

export const Admins = () => {
  const { admins } = useAdminStore();

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
  const [isOpen, setOpen] = useState<boolean>(false);
  const { selectAdminsByWorkplace } = useAdminStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setOpen(!isOpen);
        selectAdminsByWorkplace("DELETE");
      }}
    >
      <DialogTrigger>
        <Plus
          className="text-muted-foreground hover:cursor-pointer hover:text-[var(--primary-color)]"
          size={18}
        />
      </DialogTrigger>
      <DialogContent className="sm:min-w-300 sm:min-h-150 flex flex-col px-0 pb-0 h-[600px]">
        <DialogHeader className="px-6">
          <DialogTitle className="font-extrabold">추가</DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 border-t">
          <DepartmentSideBar edit />
          <CustomSeparator className="h-full w-[1px]" />
          <UserList edit />
        </div>
      </DialogContent>
    </Dialog>
  );
};
