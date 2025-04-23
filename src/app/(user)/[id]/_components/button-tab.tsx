"use client";
import React, { useState } from "react";

type Facility = {
  id: number;
  name: string;
};

export const facilities: Facility[] = [
  {
    id: 1,
    name: "기계",
  },
  {
    id: 1,
    name: "전기",
  },
  {
    id: 1,
    name: "승강",
  },
  {
    id: 1,
    name: "소방",
  },
  {
    id: 1,
    name: "건축",
  },
  {
    id: 1,
    name: "통신",
  },
  {
    id: 1,
    name: "미화",
  },
  {
    id: 1,
    name: "보안",
  },
];

interface ButtonTab<TData extends { id: number; name: string }> {
  tabs: TData[];
}

const ButtonTab = <TData extends { id: number; name: string }>({
  tabs,
}: ButtonTab<TData>) => {
  const [selected, setSelected] = useState<string>("전체");

  return (
    <div className="flex gap-2">
      <ButtonTabItem
        key={0}
        label={"전체"}
        value={"0"}
        selectedValue={selected}
        onClick={() => {
          setSelected("전체");
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
              setSelected(v.name);
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
        label === selectedValue ? "bg-[var(--primary-color)]" : null
      }`}
      onClick={onClick}
    >
      <span
        className={`text-xs ${label === selectedValue ? "text-white" : null}`}
      >
        {label}
      </span>
    </div>
  );
};

export default ButtonTab;
