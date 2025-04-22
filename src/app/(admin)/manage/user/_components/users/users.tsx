import { Card } from "@/components/ui/card";
import React from "react";
import CustomSeparator from "../../../_components/Separator/custom-separator";
import { Triangle } from "lucide-react";

import DepartmentSideBar from "./_components/departmentSideBar/department-sidebar";
import UserList from "./_components/usersList/user-list";

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
      <div className="flex h-full border-t max-xl:flex-col">
        <DepartmentSideBar />
        <CustomSeparator className="h-full w-[1px] max-xl:w-full max-xl:h-[1px]" />
        <UserList />
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

export default Users;
