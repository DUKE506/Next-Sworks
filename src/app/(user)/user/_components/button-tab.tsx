"use client";
import React, { useState } from "react";

type Facility = {
  id: string;
  name: string;
};

export const facilityCategory: Facility[] = [
  {
    id: "machine",
    name: "기계",
  },
  {
    id: "electric",
    name: "전기",
  },
  {
    id: "lift",
    name: "승강",
  },
  {
    id: "fire",
    name: "소방",
  },
  {
    id: "constructor",
    name: "건축",
  },
  {
    id: "network",
    name: "통신",
  },
  {
    id: "beauty",
    name: "미화",
  },
  {
    id: "security",
    name: "보안",
  },
];

interface ButtonTab<TData extends { id: string; name: string }> {
  tabs: TData[];
  selectedId: string;
  onClick: (id: string) => void;
}

const ButtonTab = <TData extends { id: string; name: string }>({
  tabs,
  selectedId,
  onClick,
}: ButtonTab<TData>) => {
  const [selected, setSelected] = useState<string>(selectedId);

  return (
    <div className="flex gap-2">
      <ButtonTabItem
        key={0}
        label={"전체"}
        value={"all"}
        selectedValue={selected}
        onClick={() => {
          onClick("전체");
        }}
      />
      {tabs.map((v, idx) => {
        return (
          <ButtonTabItem
            key={idx}
            label={v.name}
            value={v.id.toString()}
            selectedValue={selected}
            onClick={() => {
              onClick(v.name);
            }}
          />
        );
      })}
    </div>
  );
};

interface ButtonTabItemProps {
  label: string;
  value: string;
  selectedValue: string;
  onClick: () => void;
}

const ButtonTabItem = ({
  label,
  value,
  selectedValue,
  onClick,
}: ButtonTabItemProps) => {
  return (
    <div
      className={`px-6 py-2 rounded-sm hover:cursor-pointer border duration-150 ${
        label === decodeURIComponent(selectedValue)
          ? "bg-[var(--primary-color)]"
          : null
      }`}
      onClick={onClick}
    >
      <span
        className={`text-xs ${
          label === decodeURIComponent(selectedValue) ? "text-white" : null
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default ButtonTab;
