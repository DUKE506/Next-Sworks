"use client";
import React, { useEffect } from "react";
import Building from "./_components/building/building";
import Location from "./_components/location/Location";
import { useBuildingDetailStore } from "@/store/building/building-detail-store";
import { useParams } from "next/navigation";
import { useFloorStore } from "@/store/floor-store";

const ClientPage = () => {
  const params = useParams<{ buildingid: string }>();
  const { getBuilding, initialBuilding } = useBuildingDetailStore();
  const { getAllFloor } = useFloorStore();

  useEffect(() => {
    getBuilding(parseInt(params.buildingid));
    getAllFloor();

    return () => {
      initialBuilding;
    };
  }, []);

  return (
    <div className="space-y-16">
      <Building />
      <Location />
    </div>
  );
};

export default ClientPage;
