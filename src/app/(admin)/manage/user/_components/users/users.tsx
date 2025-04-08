import { Card } from "@/components/ui/card";
import React from "react";
import CustomSeparator from "../../../_components/Separator/custom-separator";
import { Input } from "@/components/ui/input";
import { Plus, Triangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Users = () => {
  return (
    <Card className="h-full p-0 gap-0">
      <div className="flex gap-8 p-6 items-center">
        <DepartStat label="전체" value={"17"} />
        <CustomSeparator className={"h-[30px] w-[2px]"} />
        <DepartStat label="관리" value={"6"} />
        <CustomSeparator className={"h-[30px] w-[2px]"} />
        <DepartStat label="일반" value={"11"} />
        <CustomSeparator className={"h-[30px] w-[2px]"} />
        <DepartStat label="평균 사업장" value={"4.1"} />
      </div>
      <div className="flex h-full border-t">
        <div className="flex flex-col gap-6 px-6 pt-6 flex-1/8 ">
          <span className="text-lg text-muted-foreground">부서</span>
          <div className="flex flex-col gap-4">
            <DepartItem label="시스템개발연구소" value="4" />
            <DepartItem label="자산관리1본부" value="8" />
            <DepartItem label="전략기획본부" value="5" />
          </div>
        </div>
        <CustomSeparator className="h-full w-[1px]" />
        <div className="flex flex-col flex-5/6 px-6 pt-6 gap-6">
          <div className="flex justify-between">
            <span className="text-lg text-muted-foreground">
              시스템개발연구소
            </span>
            <Input className="w-70" />
          </div>

          <div className="grid grid-cols-5 gap-4">
            <UserItem />
            <UserItem />
            <div className="flex justify-center items-center border rounded-md hover:cursor-pointer">
              <Plus size={32} className="text-ring" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const DepartStat = ({
  label,
  value,
  delta,
  deltaType,
}: {
  label: string;
  value: string;
  delta?: number;
  deltaType?: "INCREASE" | "DECREASE";
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center px-4 min-w-50">
      <div className="flex justify-between items-start">
        <span className="text-muted-foreground text-sm">{label}</span>
        {delta ? (
          <div
            className={`flex items-center gap-4 ${
              deltaType == "INCREASE" ? "bg-[#8fb38c6b]" : "bg-red-200"
            } rounded-xl px-2 py-1`}
          >
            <Triangle size={10} color="#637e61" fill="#637e61" />
            <span className="text-xs font-bold text-[#637e61]">{delta}</span>
          </div>
        ) : null}
      </div>
      <span className="text-2xl font-extrabold text-stone-500">
        {value.toString()}
      </span>
    </div>
  );
};

const DepartItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between">
      <span className="text-sm">{label}</span>
      <span className="text-xs text-muted-foreground">({value})</span>
    </div>
  );
};

const UserItem = ({}) => {
  return (
    <div className="flex items-center border rounded-md px-4 py-2 gap-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>user</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <span className="text-sm">이동희</span>
        <span className="text-muted-foreground text-xs">관리</span>
        <span className="text-xs">dukeldh1128@gmail.com</span>
      </div>
    </div>
  );
};

export default Users;
