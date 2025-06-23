import React, { useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../form";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { HexColorPicker } from "react-colorful";

interface ColorFormItemProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const ColorFormItem = ({
  value,
  label,
  required,
  onChange,
}: ColorFormItemProps) => {
  return (
    <FormItem className="gap-2">
      <div className="flex justify-between">
        <FormLabel className="text-xs text-[var(--description-value-color)] gap-0">
          {label}
          <span className="text-red-500">{required ? "*" : ""}</span>
        </FormLabel>
        <FormMessage />
      </div>
      <FormControl>
        <ColorPickerPopover
          color={value}
          onChange={(value) => onChange(value)}
        />
      </FormControl>
    </FormItem>
  );
};

interface ColorPickerPopover {
  color: string;
  onChange: (value: string) => void;
}

const ColorPickerPopover = ({ color, onChange }: ColorPickerPopover) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = () => {};

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      modal={true}
    >
      <PopoverTrigger className="w-fit">
        <div className="w-fit flex gap-2 items-center">
          <div
            className={`w-6 h-6 border rounded-sm`}
            style={{ backgroundColor: color }}
          />
          <span className="text-xs">{color}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorFormItem;
