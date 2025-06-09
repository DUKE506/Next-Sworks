import React from "react";
import { Button } from "../button";

interface CustomButtonProps {
  label: string;
}

const CustomButton = ({ label, ...props }: CustomButtonProps) => {
  return (
    <Button
      className="w-full bg-[var(--primary-color)] rounded-sm cursor-pointer hover:bg-[var(--primary-hover-color)]"
      {...props}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
