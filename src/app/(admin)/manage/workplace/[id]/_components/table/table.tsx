"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
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
import { useWorkplaceStore } from "@/store/workplace-store";
import { useParams } from "next/navigation";

export const Admins = () => {
  const { workplaceDetail } = useWorkplaceStore();

  useEffect(() => {}, [workplaceDetail]);

  return (
    <Card>
      <div className="flex px-6 justify-between items-center">
        <CardTitle>관리자</CardTitle>
        <div className="flex gap-4">
          <AddManagerDialog />
        </div>
      </div>
      <CardContent>
        <DataTable
          columns={columns}
          data={workplaceDetail?.workplaceAdmins ?? []}
        />
      </CardContent>
    </Card>
  );
};

const AddManagerDialog = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { selectAdminsByWorkplace, postAdminsByWorkplace } = useAdminStore();
  const params = useParams();

  const onSubmit = async () => {
    const res = await postAdminsByWorkplace(Number(params?.id));

    if (!res) {
      // 토스터 넣기
      return;
    }

    setOpen(false);
  };

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
      <DialogContent className="min-w-300 min-h-150 max-xl:min-w-[80%] flex flex-col px-0 pb-0 ">
        <DialogHeader className="px-6">
          <DialogTitle className="font-extrabold">추가</DialogTitle>
        </DialogHeader>
        <div className="flex flex-1 border-t">
          <DepartmentSideBar edit />
          <CustomSeparator className="h-full w-[1px]" />
          <UserList edit onClick={() => onSubmit()} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
