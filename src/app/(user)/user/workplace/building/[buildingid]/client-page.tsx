"use client";
import React, { useEffect } from "react";
import Building from "./_components/building";
import Laction from "./_components/Location";
import { useBuildingDetailStore } from "@/store/building-detail-store";
import { useParams } from "next/navigation";
import { useFloorStore } from "@/store/floor-store";

const ClientPage = () => {
  const params = useParams<{ buildingid: string }>();
  const { getBuilding, initialBuilding } = useBuildingDetailStore();
  const { getAllFloor } = useFloorStore();

  useEffect(() => {
    getBuilding(parseInt(params.buildingid));
    getAllFloor(parseInt(params.buildingid));

    return () => {
      initialBuilding;
    };
  }, []);

  return (
    <div className="space-y-16">
      <Building />
      <Laction />
    </div>
  );
};

export default ClientPage;
