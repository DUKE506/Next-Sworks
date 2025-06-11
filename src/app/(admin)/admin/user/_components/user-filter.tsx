"use client";
import FilterLayout from "@/components/common/filter-layout";
import MultiSelect from "@/components/ui/custom-select/multi-select";
import { Input } from "@/components/ui/input";
import useAdminFilter from "@/hooks/useAdminFilter";
import { convertDeptNameToRecord } from "@/lib/admin-dept";
import { useAdminFilterStore } from "@/store/admin/admin-filter-store";
import { useDeptStore } from "@/store/dept-store";
import { Permission } from "@/types/(admin)/permission/permission";
import { Building2, KeyRound } from "lucide-react";
import React, { useEffect, useState } from "react";

const UserFilter = () => {
  const { filter, setDept, setPerm } = useAdminFilter();
  const [Depts, setDepts] = useState<Record<string, string>>({});
  const { departments } = useDeptStore();

  const {
    filterAdminSearch,
    filterAdminDept,
    filterAdminPerm,
    setFilterAdminDept,
    setFilterAdminPerm,
    setFilterAdminSearch,
  } = useAdminFilterStore();

  useEffect(() => {
    setDepts(convertDeptNameToRecord(departments));
  }, []);

  return (
    <FilterLayout
      value={filterAdminSearch}
      onChangeValue={setFilterAdminSearch}
    >
      <MultiSelect
        placeholder="부서"
        data={Depts}
        selected={filterAdminDept}
        icon={Building2}
        onClick={(data) => setFilterAdminDept(data)}
      />
      <MultiSelect
        placeholder="권한"
        data={Permission}
        selected={filterAdminPerm}
        icon={KeyRound}
        onClick={(data) => setFilterAdminPerm(data)}
      />
    </FilterLayout>
  );
};

export default UserFilter;
