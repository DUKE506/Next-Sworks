"use client";
import React, { useEffect } from "react";
import Info from "./_components/info/info";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Admins } from "./_components/table/table";
import { useWorkplaceStore } from "@/store/workplace-store";
import { Perm } from "./_components/perm/perm";

const ClientPage = ({ id }: { id: number }) => {
  const { getWorkplaceDetail } = useWorkplaceStore();

  useEffect(() => {
    getWorkplaceDetail(id);
  }, [id]);

  return (
    <div className="flex flex-col gap-6 max-xl:pt-12">
      <Info />
      <div className="w-full flex gap-6 max-xl:flex-col-reverse">
        <Card className="flex-2/6">
          <CardHeader>
            <CardTitle>대시보드</CardTitle>
          </CardHeader>
        </Card>
        <Perm />
      </div>
      <Admins />
    </div>
  );
};

export default ClientPage;
