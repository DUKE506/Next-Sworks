"use client";
import MultiSelect from "@/components/ui/custom-select/multi-select";
import { Input } from "@/components/ui/input";
import useAdminFilter from "@/hooks/useAdminFilter";
import { convertDeptNameToRecord } from "@/lib/admin-dept";
import { useDeptStore } from "@/store/dept-store";
import { Permission } from "@/types/(admin)/permission/permission";
import { Building2, KeyRound } from "lucide-react";
import React, { useEffect, useState } from "react";

const UserFilter = () => {
  const { filter, setDept, setPerm } = useAdminFilter();
  const [Depts, setDepts] = useState<Record<string, string>>({});
  const { departments } = useDeptStore();

  useEffect(() => {
    setDepts(convertDeptNameToRecord(departments));
  }, []);

  const handleClick = (data: any) => {
    console.log(data);
  };

  return (
    <div className="border-b border-t py-4 px-2">
      <div className="flex px-0 justify-between">
        <Input className="w-60 rounded-sm" placeholder="관리자" />
        <div className="flex gap-4 items-center ">
          <MultiSelect
            placeholder="부서"
            data={Depts}
            selected={filter.departments}
            icon={Building2}
            onClick={(data) => setDept(data)}
          />
          <MultiSelect
            placeholder="권한"
            data={Permission}
            selected={filter.permissions}
            icon={KeyRound}
            onClick={(data) => setPerm(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserFilter;
