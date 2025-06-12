import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { Check, Filter } from "lucide-react";

interface MultiSelectProps<T extends Record<string, string>> {
  placeholder: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  data: T;
  selected: string[];
  onClick: (data: string[]) => void;
}

const MultiSelect = <T extends Record<string, string>>({
  placeholder,
  data,
  selected,
  icon: Icon = Filter,
  onClick,
}: MultiSelectProps<T>) => {
  const handleAllCheck = () => {
    const isSelect = selected.length === Object.keys(data).length;
    //해제
    if (isSelect) {
      onClick([]);
    } else {
      onClick(Object.entries(data).map(([key, value]) => value));
      //전체 셀렉트
    }
  };

  const handleCheck = (value: string) => {
    const isSelect = selected.some((p) => p === value);

    //기존에 존재하면 추가 아니면 삭제
    const newItems = isSelect
      ? selected.filter((p) => p !== value)
      : [...selected, value];
    onClick(newItems);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        <Button
          className={`
            rounded-sm text-xs bg-white border  hover:bg-gray-50 ${
              selected.length > 0
                ? "text-black border-blue-500"
                : "text-[var(--description-title-color)] "
            }
          focus-visible:outline-none focus-visible:ring-0
          `}
        >
          <Icon className="w-8 h-8 " />
          {`${placeholder} ${
            selected.length > 0 ? `(${selected.length})` : ""
          }`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm">
        <div
          className="flex gap-2 items-center justify-between px-4 py-2 hover:cursor-pointer hover:bg-gray-50 rounded-sm"
          onClick={() => handleAllCheck()}
        >
          <span className="text-xs">전체</span>
          {selected.length === Object.keys(data).length ? (
            <Check className="w-4 h-4" />
          ) : null}
        </div>
        {Object.entries(data).map(([key, value], i) => {
          return (
            <div
              className="flex gap-2 items-center justify-between px-4 py-2 hover:cursor-pointer hover:bg-gray-50 rounded-sm"
              key={i}
              onClick={() => handleCheck(value)}
            >
              <span className="text-xs">{key}</span>
              {selected.some((i) => i === value) ? (
                <Check className="w-4 h-4" />
              ) : null}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
