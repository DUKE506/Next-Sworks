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
import HeaderFixedTable from "@/components/ui/headerfix-table/headerfixed-table";
import DataTable from "@/app/(admin)/admin/workplace/components/table/data-table";
import { workplaceColumns } from "@/app/(admin)/admin/workplace/components/table/columns";

const Workplaces = () => {
  const { admin } = useAdminDetailStore();
  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Input className="w-50 bg-white" placeholder="사업장명" />
        <AddWorkplaceDialog />
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

const test = (data: Record<string, boolean>) => {
  console.log(data);
};

const AddWorkplaceDialog = () => {
  const { workplaces } = useWorkplaceStore();
  return (
    <Dialog>
      <DialogTrigger>
        <IconButton className="w-6 h-6" icon={Plus} />
      </DialogTrigger>
      <DialogContent className="flex flex-col min-w-200 gap-6 h-150">
        <DialogHeader>
          <DialogTitle>추가</DialogTitle>
        </DialogHeader>
        <Input placeholder="이름, 계약번호" />

        <HeaderFixedTable
          columns={adminWorkplaceColumns}
          data={(workplaces as ListModel<Workplace>).data}
          onSelect={test}
        />

        <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer">
          추가
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Workplaces;
