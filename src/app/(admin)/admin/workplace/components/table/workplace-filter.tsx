import FilterLayout from "@/components/common/filter-layout";
import MultiSelect from "@/components/ui/custom-select/multi-select";
import useWorkplaceFilter from "@/hooks/useWorkplaceFilter";
import { useWorkplaceFilterStore } from "@/store/workplace/workplace-filter-store";
import { WorkplaceStatusType } from "@/types/(admin)/workplace/workplace-type";
import { FileTextIcon } from "lucide-react";
import React from "react";

const WorkplaceFilter = () => {
  const { status, search, setStatus, setSearch } = useWorkplaceFilterStore();
  return (
    <FilterLayout value={search} onChangeValue={setSearch}>
      <MultiSelect
        placeholder="계약상태"
        data={WorkplaceStatusType}
        selected={status}
        icon={FileTextIcon}
        onClick={(data) => setStatus(data)}
      />
    </FilterLayout>
  );
};

export default WorkplaceFilter;
