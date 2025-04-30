"use client";
import { useEffect, useState } from "react";

type Building = {
  id: number;
  name: string;
};

interface TabProps<TData extends { name: string; id: number }> {
  tabs: TData[];
}

export const Tab = <TData extends { name: string; id: number }>({
  tabs,
}: TabProps<TData>) => {
  const [select, setSelect] = useState<string>("전체");

  return (
    <div className="flex border-b ">
      <TabItem
        key={0}
        label={"전체"}
        value={"0"}
        selectedValue={select}
        onClick={() => {
          setSelect("전체");
        }}
      />
      {tabs.map((v, idx) => {
        return (
          <TabItem
            key={idx}
            label={v.name}
            value={v.id.toString()}
            selectedValue={select}
            onClick={() => {
              setSelect(v.name);
            }}
          />
        );
      })}
    </div>
  );
};

interface TabItemProps {
  label: string;
  value: string;
  selectedValue: string;
  onClick: () => void;
}

const TabItem = ({ label, value, selectedValue, onClick }: TabItemProps) => {
  return (
    <div
      className={`px-6 py-2 hover:cursor-pointer ${
        label === selectedValue
          ? " border-b-[2px] border-[var(--primary-color)]"
          : null
      } `}
      onClick={onClick}
    >
      <span className="text-sm">{label}</span>
    </div>
  );
};
