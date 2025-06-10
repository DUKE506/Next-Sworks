import { cn } from "@/lib/utils";
import React from "react";

interface IconButton {
  className?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

const IconButton = ({ className, icon: Icon, onClick }: IconButton) => {
  return (
    <div className="p-[8px] rounded-[50px] aspect-square hover:cursor-pointer hover:bg-gray-200">
      <Icon className={cn("w-4 h-4 ", className)} onClick={onClick} />
    </div>
  );
};

export default IconButton;
