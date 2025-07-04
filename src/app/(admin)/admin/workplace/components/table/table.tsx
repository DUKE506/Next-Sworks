"use client";

import React, { useEffect } from "react";
import DataTable from "./data-table";
import { workplaceColumns } from "./columns";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination/pagination";
import { useWorkplaceStore } from "@/store/workplace-store";
import { ListLoading, ListModel } from "@/types/list-type";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { Select } from "@/components/ui/select";
import ViewSelect from "@/components/ui/view-select.tsx/view-select";
import IconButton from "@/components/ui/icon-button/icon-button";
import WorkplaceFilter from "./workplace-filter";
import { useWorkplaceFilterStore } from "@/store/workplace/workplace-filter-store";

const TableArea = () => {
  const { workplaces, selectWorkplace } = useWorkplaceStore();
  const { page, pageSize, setPage, setPageSize } = useWorkplaceFilterStore();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-4/6 flex-col gap-6 w-full">
      <WorkplaceFilter />
      <div className="flex justify-between">
        {workplaces === ListLoading ? null : (
          <>
            {(workplaces as ListModel<Workplace>).meta.totalCount /
              (workplaces as ListModel<Workplace>).meta.pageSize <
            0 ? null : (
              <Pagination
                activePage={parseInt(page)}
                totalItemCount={
                  (workplaces as ListModel<Workplace>).meta.totalCount
                }
                viewSize={(workplaces as ListModel<Workplace>).meta.pageSize}
                onChange={(page) => {
                  setPage(page.toString());
                }}
                pageRangeDisplayed={5}
              />
            )}
            <div className="flex gap-4 items-center">
              <ViewSelect value={pageSize} onChange={setPageSize} />

              <IconButton
                icon={Plus}
                className="text-muted-foreground"
                onClick={() => router.push(`${pathname}/add`)}
              />
              <IconButton
                icon={Trash2}
                className="text-muted-foreground"
                onClick={() => router.push("")}
              />
            </div>
          </>
        )}
      </div>
      <DataTable
        columns={workplaceColumns}
        data={(workplaces as ListModel<Workplace>).data}
        onClick={(data) => selectWorkplace(data)}
        emptyMessage="사업장을 생성하세요."
      />
    </div>
  );
};

export default TableArea;
