"use client";

import React, { useEffect } from "react";
import BuildingList from "./_components/building-list";
import { useBuildingStore } from "@/store/building-store";
import UserList from "./_components/user-list";
import PaginationTable from "@/components/ui/pagination-table/pagination-table";
import { mockUsers, userColumns } from "./_components/user-table/columns";
import { User } from "@/types/(user)/user/user";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";

const ClientPage = () => {
  const { getAllBuilding } = useBuildingStore();
  const { getAllUser, allUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    getAllBuilding();
    getAllUser();
  }, []);
  return (
    <div className="space-y-18">
      <BuildingList />
      {/* <UserList /> */}
      <PaginationTable<User>
        label="근무자"
        columns={userColumns}
        data={allUser}
        onClickPlus={() => router.push("/1/workplace/user/add")}
      />
    </div>
  );
};

export default ClientPage;
