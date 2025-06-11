import React, { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";

interface FIlterLayoutProps {
  isSearch?: boolean;
  value?: string;
  onChangeValue?: (v: string) => void;
  children: React.ReactNode;
}

const FilterLayout = ({
  isSearch = true,
  value,
  onChangeValue,
  children,
}: FIlterLayoutProps) => {
  const [inputValue, setInputValue] = useState<string>(value ?? "");
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChangeValue) return;
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!onChangeValue) return;
    if (e.key !== "Enter") return;
    onChangeValue(inputValue);
  };
  return (
    <div className="border-b border-t py-4 px-2">
      <div className="flex px-0 justify-between">
        {isSearch ? (
          <Input
            className="w-60 rounded-sm"
            placeholder="관리자"
            value={inputValue}
            onChange={(e) => handleValue(e)}
            onKeyDown={(e) => handleSubmit(e)}
          />
        ) : null}
        <div className="flex gap-4">{children}</div>
      </div>
    </div>
  );
};

export default FilterLayout;
