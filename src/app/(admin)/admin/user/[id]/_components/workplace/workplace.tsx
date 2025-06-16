import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IconButton from "@/components/ui/icon-button/icon-button";
import { Input } from "@/components/ui/input";
import { useAdminDetailStore } from "@/store/admin/admin-detail-store";
import { useWorkplaceStore } from "@/store/workplace-store";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { ListModel } from "@/types/list-type";

import { Plus, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { adminWorkplaceColumns } from "./adminWokkrplaceColumns";
import { Button } from "@/components/ui/button";
import HeaderFixedTable from "@/components/ui/headerfix-table/headerfixed-table";
import DataTable from "@/app/(admin)/admin/workplace/components/table/data-table";
import { workplaceColumns } from "@/app/(admin)/admin/workplace/components/table/columns";

const Workplaces = () => {
  const { admin, putDeleteWorkplaces, resetDelSelectedWorkplaces } =
    useAdminDetailStore();

  useEffect(() => {
    resetDelSelectedWorkplaces();
    return () => {
      resetDelSelectedWorkplaces();
    };
  }, []);

  const handleDelete = () => {
    putDeleteWorkplaces();
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Input className="w-50 bg-white" placeholder="사업장명" />
        <div className="flex gap-4">
          <AddWorkplaceDialog />
          <IconButton icon={Trash2Icon} onClick={handleDelete} />
        </div>
      </div>
      <div>
        <DataTable
          columns={workplaceColumns}
          data={admin?.workplaces ?? []}
          emptyMessage="사업장을 추가하세요."
        />
      </div>
    </div>
  );
};

/**
 * 사업장 추가 다이얼로그
 * @returns
 */
const AddWorkplaceDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    admin,
    restWorkplace,
    selectedWorkplace,
    resetSelectWorkplace,
    postAddWorkplace,
    getRestWorkplace,
  } = useAdminDetailStore();

  useEffect(() => {
    if (!admin) return;
    getRestWorkplace(admin.id);
  }, [isOpen]);

  /**
   * 다이어로그 오픈 핸들러
   * @param value
   */
  const handleOpenChange = (value: boolean) => {
    if (!value) {
      resetSelectWorkplace();
    }

    setIsOpen(value);
  };

  const handleSubmit = () => {
    postAddWorkplace();
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger>
        <IconButton className="text-muted-foreground" icon={Plus} />
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-200 gap-6 h-150">
        <DialogHeader>
          <DialogTitle>추가</DialogTitle>
        </DialogHeader>
        <Input placeholder="이름, 계약번호" />

        <HeaderFixedTable
          columns={adminWorkplaceColumns}
          data={restWorkplace}
          selectedRow={selectedWorkplace}
          // onClick={(data) => handleWorkplace(data)}
          // onRowSelectionChange={handleRowSelectionChange}
        />

        <Button
          className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer"
          onClick={handleSubmit}
        >
          추가
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Workplaces;
