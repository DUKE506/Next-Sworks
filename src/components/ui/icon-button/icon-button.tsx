import { cn } from "@/lib/utils";
import React from "react";

interface IconButton {
  className?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

const IconButton = ({ className, icon: Icon, onClick }: IconButton) => {
  return (
    <Icon
      className={cn(
        "w-4 hover:text-[var(--primary-color)] hover:cursor-pointer",
        className
      )}
      onClick={onClick}
    />
  );
};

export default IconButton;
