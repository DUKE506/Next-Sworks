"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import TableArea from "./components/table/table";
import { InfoArea } from "./components/Info/info-area";
import { useWorkplaceStore } from "@/store/workplace-store";

const Page = () => {
  const { getWorkplaces } = useWorkplaceStore();

  useEffect(() => {
    getWorkplaces();
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full">
      <Card className="h-full"></Card>
      <div className="flex gap-6">
        <TableArea />
        <InfoArea />
      </div>
    </div>
  );
};

export default Page;
