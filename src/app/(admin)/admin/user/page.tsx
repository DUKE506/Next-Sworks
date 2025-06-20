"use client";
import React, { useEffect } from "react";

import Users from "./_components/users/users";

import { useDeptStore } from "@/store/dept-store";
import UserFilter from "./_components/user-filter";
import DataList from "@/components/ui/pagination-table/data-list";
import { userColumns } from "./_components/users/_components/user-colmuns";
import { Admin } from "@/dtos/admin/department-admin.dto";
import { usePathname, useRouter } from "next/navigation";
import { useAdminFilterStore } from "@/store/admin/admin-filter-store";
import AdminTable from "./_components/admin-table";
import { useAdminStore } from "@/store/admin/admin-store";

const Page = () => {
  const { getDepts } = useDeptStore();
  const { getAdmins } = useAdminStore();
  const router = useRouter();
  const pathname = usePathname();
  const {
    filterAdminSearch,
    filterAdminDept,
    filterAdminPerm,
    page,
    pageSize,
    resetFilter,
  } = useAdminFilterStore();

  useEffect(() => {
    const params = new URLSearchParams({
      search: filterAdminSearch,
      page: page,
      pageSize: pageSize,
    });
    filterAdminDept.forEach((d) => params.append("department", d));
    filterAdminPerm.forEach((p) => params.append("permission", p));

    router.push(`?${params}`);

    getAdmins(params.toString());
  }, [filterAdminSearch, filterAdminDept, filterAdminPerm, page, pageSize]);

  useEffect(() => {
    // //부서 데이터
    getDepts();

    return () => {
      resetFilter();
    };
  }, []);

  const handleDetailPage = (data: Admin) => {
    router.push(`${pathname}/${data.id}`);
  };
  return (
    <div className="flex flex-col gap-6 min-xl:h-full w-full ">
      <span className="text-xl font-bold">관리자</span>
      <UserFilter />
      <AdminTable />
    </div>
  );
};

export default Page;
