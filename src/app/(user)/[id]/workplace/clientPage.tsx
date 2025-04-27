"use client";

import React, { useEffect } from "react";
import BuildingList from "./_components/building-list";
import { useBuildingStore } from "@/store/building-store";
import UserList from "./_components/user-list";

const ClientPage = () => {
  const { getAllBuilding } = useBuildingStore();

  useEffect(() => {
    getAllBuilding();
  }, []);
  return (
    <div className="space-y-18">
      <BuildingList />
      <UserList />
    </div>
  );
};

export default ClientPage;
