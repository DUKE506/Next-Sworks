"use client";
import React, { useEffect } from "react";
import Info from "./_components/info/info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Admins } from "./_components/table/table";
import { useWorkplaceStore } from "@/store/workplace-store";

const ClientPage = ({ id }: { id: number }) => {
  const { getWorkplaceDetail } = useWorkplaceStore();

  useEffect(() => {
    getWorkplaceDetail(id);
  }, [id]);

  return (
    <div className="flex flex-col gap-6">
      <Info />
      <Card>
        <CardHeader>
          <CardTitle>권한</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between"></CardContent>
      </Card>
      <Admins />
    </div>
  );
};

export default ClientPage;
