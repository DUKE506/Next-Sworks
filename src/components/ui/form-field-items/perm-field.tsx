import React, { useEffect, useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import { useWorkerPermissionStore } from "@/store/worker-permission/worker-permission.store";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import IconButton from "../icon-button/icon-button";
import { WorkerPermission } from "@/types/(admin)/permission/worker-permission/worker-permission";

interface PermFormItemProps {
  label?: string;
  value: number;
  onChange: (data: any) => void;
  required?: boolean;
}

const PermFieldItem = ({
  label,
  onChange,
  value,
  required = false,
}: PermFormItemProps) => {
  const { allWorkerPermission, getWorkerPermission } =
    useWorkerPermissionStore();
  useEffect(() => {
    getWorkerPermission();
  }, []);

  const handleSelect = (value: number) => {
    onChange(value);
  };

  return (
    <FormItem>
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)] gap-0 ">
          {label}
          <span className="text-red-500">{required ? "*" : ""}</span>
        </FormLabel>
        <FormMessage />
      </div>
      <FormControl>
        <div className="flex gap-8">
          {allWorkerPermission.map((p, i) => {
            return (
              <PermItem
                key={i}
                data={p}
                selectOption={true}
                isSelect={p.id == value}
                onSelect={(value) => handleSelect(value)}
              />
            );
          })}
        </div>
      </FormControl>
    </FormItem>
  );
};

export default PermFieldItem;

interface PermItemProps {
  data: WorkerPermission;
  isSelect?: boolean;
  selectOption?: boolean;
  onSelect: (value: number) => void;
}

const PermItem = ({
  data,
  selectOption = false,
  isSelect,
  onSelect,
}: PermItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const valueItem = ({ label, value }: { label: string; value: number }) => {
    const getValueText = (val: number) => {
      switch (val) {
        case 0:
          return "없음";
        case 1:
          return "읽기";
        case 2:
          return "쓰기";
      }
    };
    return (
      <div className="flex justify-between items-center">
        <span className="text-xs">{label}</span>
        <span className="text-xs text-[var(--description-value-color)]">
          {getValueText(value)}
        </span>
      </div>
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger className="h-fit">
        <div
          className=" flex items-center gap-4 px-4 py-2 border rounded-sm hover:bg-accent hover:cursor-pointer border-[var(--primary-color)]"
          onClick={() => onSelect(data.id)}
        >
          {selectOption ? (
            <input
              type="radio"
              value={data.id}
              onChange={(v) => {
                onSelect(parseInt(v.target.value));
              }}
              checked={isSelect}
            />
          ) : null}

          <span className="text-xs whitespace-nowrap">{data.name}</span>
          <span className="text-[0.6rem] whitespace-nowrap text-[var(--description-value-color)]">
            {data.permission}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">{data.name}</span>
          <span className="text-xs text-[var(--description-value-color)]">
            {data.permission}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {valueItem({ label: "기본", value: data.basicPerm })}
          {valueItem({ label: "기계", value: data.machinePerm })}
          {valueItem({ label: "전기", value: data.electricPerm })}
          {valueItem({ label: "승강", value: data.liftPerm })}
          {valueItem({ label: "소방", value: data.firePerm })}
          {valueItem({ label: "건축", value: data.buildingPerm })}
          {valueItem({ label: "통신", value: data.networkPerm })}
          {valueItem({ label: "미화", value: data.beautyPerm })}
          {valueItem({ label: "보안", value: data.securityPerm })}
          {valueItem({ label: "민원", value: data.vocPerm })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
