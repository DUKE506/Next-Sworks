import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAdminDetailStore } from "@/store/admin/admin-detail-store";
import { Building, ChevronRight, Mail, Phone } from "lucide-react";
import React from "react";

export const Profile = () => {
  const { admin } = useAdminDetailStore();
  return (
    <Card className="w-100 h-fit gap-8 max-xl:w-full">
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
      <CardContent className="flex flex-col gap-4 px-2">
        <ProfileItem
          label={"부서"}
          value={admin?.department.name}
          icon={Building}
        />
        <ProfileItem label={"전화번호"} value={admin?.phone} icon={Phone} />
        <ProfileItem label={"이메일"} value={admin?.email} icon={Mail} />
      </CardContent>
    </Card>
  );
};

interface ProfileItemProps {
  label: string;
  value?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ProfileItem = ({ label, value, icon: Icon }: ProfileItemProps) => {
  return (
    <div className="flex items-center gap-6 hover:cursor-pointer hover:bg-gray-200 px-4 py-2">
      <Icon className="w-4" />
      <div className="flex flex-col flex-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm">{value}</span>
      </div>
      <ChevronRight size={18} className="text-muted-foreground" />
    </div>
  );
};
