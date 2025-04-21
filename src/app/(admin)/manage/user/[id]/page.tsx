"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, ChevronRight, Mail, Phone } from "lucide-react";
import React, { use, useEffect } from "react";
import DataTable from "../../workplace/components/table/data-table";
import { workplaceColumns } from "../../workplace/components/table/columns";
import { useAdminDetailStore } from "@/store/admin-detail-store";
import { Profile } from "./_components/profile/profile";
import Workplaces from "./_components/workplace/workplace";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { admin, getAdmin } = useAdminDetailStore();

  useEffect(() => {
    getAdmin(parseInt(id));
  }, [id]);

  return (
    <div className="flex max-xl:flex-col gap-6 h-full">
      <Profile />
      <Workplaces />
    </div>
  );
};

// <Card className="flex-1 h-fit">
// <CardHeader>
//   <CardTitle>사업장</CardTitle>
// </CardHeader>
// <CardContent>
//   <DataTable
//     columns={workplaceColumns}
//     data={admin?.workplaces ?? []}
//   />
// </CardContent>
// </Card>

export default Page;
