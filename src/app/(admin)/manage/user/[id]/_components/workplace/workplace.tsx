import { workplaceColumns } from "@/app/(admin)/manage/workplace/components/table/columns";
import DataTable from "@/app/(admin)/manage/workplace/components/table/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IconButton from "@/components/ui/icon-button/icon-button";
import { Input } from "@/components/ui/input";
import { useAdminDetailStore } from "@/store/admin-detail-store";
import { useWorkplaceStore } from "@/store/workplace-store";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { ListModel } from "@/types/list-type";

import { Plus } from "lucide-react";
import React from "react";
import { adminWorkplaceColumns } from "./adminWokkrplaceColumns";
import { Button } from "@/components/ui/button";

const Workplaces = () => {
  const { admin } = useAdminDetailStore();
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Input className="w-50 bg-white" />
        <AddWorkplaceDialog />
      </div>
      <div>
        <DataTable columns={workplaceColumns} data={admin?.workplaces ?? []} />
      </div>
    </div>
  );
};

const AddWorkplaceDialog = () => {
  const { workplaces } = useWorkplaceStore();
  return (
    <Dialog>
      <DialogTrigger>
        <IconButton className="w-8" icon={Plus} />
      </DialogTrigger>
      <DialogContent className="min-w-200 gap-6">
        <DialogHeader>
          <DialogTitle>추가</DialogTitle>
        </DialogHeader>
        <Input placeholder="이름, 계약번호" />
        <DataTable
          columns={adminWorkplaceColumns}
          data={(workplaces as ListModel<Workplace>).data}
        />
        <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer">
          추가
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Workplaces;
