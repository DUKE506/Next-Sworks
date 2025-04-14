"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, ChevronRight, Mail, Phone } from "lucide-react";
import React, { use, useEffect } from "react";
import DataTable from "../../workplace/components/table/data-table";
import { columns, workPlaces } from "../../workplace/components/table/columns";
import { useAdminDetailStore } from "@/store/admin-detail-store";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { admin, getAdmin } = useAdminDetailStore();

  useEffect(() => {
    getAdmin(parseInt(id));
  }, [id]);

  return (
    <div className="flex gap-6 h-full">
      <Card className="w-[400px] h-fit gap-8">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="w-18 h-18">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex gap-4">
              <span className="text-xl ">{admin?.name}</span>
              <Badge className="rounded-sm bg-[var(--primary-light-color)] text-[var(--primary-color)]">
                {admin?.permission}
              </Badge>
            </div>
            <span className="text-base text-ring">@{admin?.account}</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <ProfileItem label={"부서"} value={admin?.department.name}>
            <Building size={22} className="text-muted-foreground" />
          </ProfileItem>
          <ProfileItem label={"전화번호"} value={admin?.phone}>
            <Phone size={22} className="text-muted-foreground" />
          </ProfileItem>
          <ProfileItem label={"이메일"} value={admin?.email}>
            <Mail size={22} className="text-muted-foreground" />
          </ProfileItem>
        </CardContent>
      </Card>
      <Card className="flex-1 h-full">
        <CardHeader>
          <CardTitle>사업장</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={workPlaces} />
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileItem = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-6">
      {children}
      <div className="flex flex-col flex-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm">{value}</span>
      </div>
      <ChevronRight size={18} className="text-muted-foreground" />
    </div>
  );
};

export default Page;
