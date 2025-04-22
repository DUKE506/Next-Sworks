"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import TableArea from "./components/table/table";
import { InfoArea } from "./components/Info/info-area";
import { useWorkplaceStore } from "@/store/workplace-store";

const Page = () => {
  const { getWorkplaces, selectWorkplace, selectedWorkplace } =
    useWorkplaceStore();

  useEffect(() => {
    getWorkplaces();

    return () => {
      selectWorkplace(null);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full max-xl:pt-12">
      <div className="flex max-xl:flex-col justify-between gap-6">
        <StatCard label="사업장" value="2" />
        <StatCard label="평균 직원" value="2" />
        <StatCard label="평균 민원" value="2" />
        <StatCard label="평균 설비" value="2" />
      </div>
      <div className="flex max-xl:flex-col-reverse gap-6">
        <TableArea />
        {selectedWorkplace ? <InfoArea /> : null}
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value?: string;
}

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <Card className="flex-1 gap-4">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="font-bold text-2xl">{value}</span>
      </CardContent>
    </Card>
  );
};

export default Page;
