"use client";

import React, { useEffect } from "react";
import BuildingList from "./_components/building-list";
import { useBuildingStore } from "@/store/building-store";
import UserList from "./_components/user-list";
import PaginationTable from "@/components/ui/pagination-table/pagination-table";
import { mockUsers, userColumns } from "./_components/user-table/columns";
import { User } from "@/types/(user)/user/user";

const ClientPage = () => {
  const { getAllBuilding } = useBuildingStore();

  useEffect(() => {
    getAllBuilding();
  }, []);
  return (
    <div className="space-y-18">
      <BuildingList />
      {/* <UserList /> */}
      <PaginationTable<User>
        label="사용자"
        columns={userColumns}
        data={mockUsers}
      />
    </div>
  );
};

export default ClientPage;
