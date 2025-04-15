"use client";

import React, { useEffect } from "react";
import DataTable from "./data-table";
import { columns, workPlaces } from "./columns";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination/pagination";
import { useWorkplaceStore } from "@/store/workplace-store";
import { ListLoading, ListModel } from "@/types/list-type";
import { Workplace } from "@/types/(admin)/workplace/workplace";

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
              <Pagination
                activePage={1}
                totalItemCount={
                  (workplaces as ListModel<Workplace>).meta?.totalCount
                }
                viewSize={(workplaces as ListModel<Workplace>).meta?.pageSize}
                pageRangeDisplayed={5}
                onChange={() => {}}
              />
              <Plus
                className="hover:cursor-pointer"
                onClick={() => router.push("/manage/workplace/add")}
                size={24}
              />
            </div>
          </>
        )}
      </div>
      <DataTable
        columns={columns}
        data={(workplaces as ListModel<Workplace>).data}
        onClick={(data) => selectWorkplace(data)}
      />
    </div>
  );
};

export default TableArea;
