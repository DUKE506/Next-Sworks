"use client";
import React, { useEffect } from "react";
import Building from "./_components/building";
import Laction from "./_components/Location";
import { useBuildingDetailState } from "@/store/building-detail-store";
import { useParams } from "next/navigation";

const ClientPage = () => {
  const params = useParams<{ buildingid: string }>();
  const { getBuilding, initialBuilding } = useBuildingDetailState();

  useEffect(() => {
    getBuilding(parseInt(params.buildingid));

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
