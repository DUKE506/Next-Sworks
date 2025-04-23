import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React from "react";
import CustomSeparator from "../../../_components/Separator/custom-separator";

const Profile = () => {
  return (
    <Card className="flex flex-col px-8 ">
      <div className="flex gap-12 items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>user</AvatarFallback>
        </Avatar>
        <div className="flex gap-16 max-xl:gap-8 items-center ">
          <UserInfoItem label={"Name"} value={"이동희"} />
          <CustomSeparator className={"h-[20px] w-[2px]"} />
          <UserInfoItem label={"Department"} value={"시스템개발연구소"} />
          <CustomSeparator className={"h-[20px] w-[2px]"} />
          <UserInfoItem label={"Permission"} value={"관리"} />
          <CustomSeparator className={"h-[20px] w-[2px]"} />
          <UserInfoItem label={"Workplace"} value={"6"} />
        </div>
      </div>
    </Card>
  );
};

export const MobileProfile = () => {
  return (
    <Card className="flex flex-col px-8 ">
      <div className="flex gap-12 items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>user</AvatarFallback>
        </Avatar>
        <div className="flex gap-16 max-xl:gap-8 items-center ">
          <UserInfoItem label={"Name"} value={"이동희"} />
          <CustomSeparator className={"h-[20px] w-[2px]"} />
          <UserInfoItem label={"Department"} value={"시스템개발연구소"} />
          <CustomSeparator className={"h-[20px] w-[2px]"} />
          <UserInfoItem label={"Permission"} value={"관리"} />
          <CustomSeparator className={"h-[20px] w-[2px]"} />
          <UserInfoItem label={"Workplace"} value={"6"} />
        </div>
      </div>
    </Card>
  );
};

const UserInfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex gap-8 items-center">
      <span className="font-bold text-sm text-muted-foreground">{label}</span>
      <span className="font-semibold text-sm ">{value}</span>
    </div>
  );
};

export default Profile;
