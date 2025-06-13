import DataList from "@/components/ui/pagination-table/data-list";
import React, { useEffect, useState } from "react";
import { userColumns } from "./users/_components/user-colmuns";
import { useAdminStore } from "@/store/admin-store";
import { usePathname, useRouter } from "next/navigation";
import { Admin } from "@/dtos/admin/department-admin.dto";
import { ListLoading, ListModel } from "@/types/list-type";
import ViewSelect from "@/components/ui/view-select.tsx/view-select";
import IconButton from "@/components/ui/icon-button/icon-button";
import { Plus, Trash2 } from "lucide-react";
import Pagination from "@/components/ui/pagination/pagination";
import { useAdminFilterStore } from "@/store/admin/admin-filter-store";

const AdminTable = () => {
  const { admins } = useAdminStore();
  const [data, setData] = useState<ListModel<Admin>>();
  const { page, pageSize, setPage, setPageSize } = useAdminFilterStore();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (admins === ListLoading) return;
    setData(admins as ListModel<Admin>);
  }, [admins]);

  const handleDetailPage = (data: Admin) => {
    router.push(`${pathname}/${data.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {data === undefined ? null : (
        <div className="flex justify-between">
          {data.meta.totalCount / data.meta.pageSize > 0 ? (
            <Pagination
              activePage={parseInt(page)}
              totalItemCount={data.meta.totalCount}
              viewSize={parseInt(pageSize)}
              onChange={(page) => {
                setPage(page.toString());
              }}
              pageRangeDisplayed={5}
            />
          ) : null}
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
        </div>
      )}
      <DataList
        columns={userColumns}
        data={(admins as ListModel<Admin>).data}
        onClick={handleDetailPage}
      />
    </div>
  );
};

export default AdminTable;
