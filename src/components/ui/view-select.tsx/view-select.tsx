import React from "react";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../select";
import { ViewState } from "@/types/view";
import { useRouter } from "next/navigation";
import { useWorkplaceFilterStore } from "@/store/workplace/workplace-filter-store";

const ViewSelect = () => {
  const { pageSize, setPageSize } = useWorkplaceFilterStore();

  return (
    <Select onValueChange={setPageSize} defaultValue={pageSize}>
      <SelectTrigger className="w-25 bg-white hover:cursor-pointer">
        <SelectValue placeholder="select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(ViewState).map(([key, value]) => {
            return (
              <SelectItem
                className="hover:cursor-pointer"
                key={key}
                value={value.toString()}
              >
                {key}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ViewSelect;
