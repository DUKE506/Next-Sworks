"use client";

import React, { useEffect } from "react";
import DataTable from "./data-table";
import { workplaceColumns } from "./columns";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination/pagination";
import { useWorkplaceStore } from "@/store/workplace-store";
import { ListLoading, ListModel } from "@/types/list-type";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { Select } from "@/components/ui/select";
import ViewSelect from "@/components/ui/view-select.tsx/view-select";
import IconButton from "@/components/ui/icon-button/icon-button";

const TableArea = () => {
  const { workplaces, selectWorkplace } = useWorkplaceStore();

  const router = useRouter();
  return (
    <div className="flex flex-4/6 flex-col gap-6 w-full">
      <div className="flex justify-between">
        {workplaces === ListLoading ? null : (
          <>
            <Input className="w-50 bg-white" placeholder="이름, 계약번호" />
            <div className="flex gap-4 items-center">
              <ViewSelect />
              {
                ((workplaces as ListModel<Workplace>).meta.totalCount / (workplaces as ListModel<Workplace>).meta.pageSize) < 2
                  ? null
                  :
                  <Pagination
                    activePage={1}
                    totalItemCount={(workplaces as ListModel<Workplace>).meta.totalCount}
                    viewSize={(workplaces as ListModel<Workplace>).meta.pageSize}
                    onChange={() => { }}
                    pageRangeDisplayed={5} />
              }

              <IconButton
                icon={Plus}
                className="w-8 text-muted-foreground"
                onClick={() => router.push("/manage/workplace/add")}
              />
              <IconButton
                icon={Trash2}
                className="w-6 text-muted-foreground"
                onClick={() => router.push("/manage/workplace/add")}
              />

            </div>
          </>
        )}
      </div>
      <DataTable
        columns={workplaceColumns}
        data={(workplaces as ListModel<Workplace>).data}
        onClick={(data) => selectWorkplace(data)}
      />
    </div>
  );
};

export default TableArea;
