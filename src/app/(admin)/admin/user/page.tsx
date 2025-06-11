"use client";
import React, { useEffect } from "react";

import Users from "./_components/users/users";
import { useAdminStore } from "@/store/admin-store";

import { useDeptStore } from "@/store/dept-store";
import Profile from "./_components/profile/profile";
import UserFilter from "./_components/user-filter";
import DataList from "@/components/ui/pagination-table/data-list";
import { userColumns } from "./_components/users/_components/user-colmuns";
import { Admin } from "@/dtos/admin/department-admin.dto";
import { usePathname, useRouter } from "next/navigation";
import { useAdminFilterStore } from "@/store/admin/admin-filter-store";

const Page = () => {
  const { getDepts } = useDeptStore();
  const { getAdmins, admins } = useAdminStore();
  const router = useRouter();
  const pathname = usePathname();
  const {
    filterAdminSearch,
    filterAdminDept,
    filterAdminPerm,
    page,
    pageSize,
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
  }, [filterAdminSearch, filterAdminDept, filterAdminPerm]);

  useEffect(() => {
    //전체 관리자 데이터
    getAdmins();
    // //부서 데이터
    getDepts();
  }, []);

  const handleDetailPage = (data: Admin) => {
    router.push(`${pathname}/${data.id}`);
  };
  return (
    <div className="flex flex-col gap-6 min-xl:h-full w-full ">
      <span className="text-xl font-bold">관리자</span>
      <UserFilter />
      <DataList
        columns={userColumns}
        data={admins}
        onClick={handleDetailPage}
      />
    </div>
  );
};

export default Page;
