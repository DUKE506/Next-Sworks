import { useState } from "react";
import { Label } from "../label";

interface IconToggleProps {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly?: boolean;
  pressed?: boolean;
  onChange?: () => void;
}

export const IconToggle = ({
  label,
  icon: Icon,
  readonly = false,
  pressed,
  onChange,
}: IconToggleProps) => {
  return (
    <div
      className={`inline-flex flex-col w-12 gap-1 ${
        readonly ? "hover:cursor-default" : "hover:cursor-pointer"
      }`}
      onClick={() => (!readonly && onChange ? onChange() : null)}
    >
      <div
        className={`inline-flex justify-center items-center border h-12 rounded-sm
            ${
              pressed
                ? "bg-[var(--primary-color)] border-[var(--primary-color)]"
                : "bg-stone-100 "
            }   duration-300`}
      >
        <Icon
          className={`w-4.5 ${
            pressed ? " text-white" : "text-muted-foreground"
          } `}
        />
      </div>

      <Label className={`justify-center text-xs "text-gray-600"`}>
        {label}
      </Label>
    </div>
  );
};
