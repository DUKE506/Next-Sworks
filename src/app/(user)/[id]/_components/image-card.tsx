import IconButton from "@/components/ui/icon-button/icon-button";
import { Edit } from "lucide-react";
import React from "react";

interface ImageCardProps {
  label: string;
  description: string;
  defaultIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ImageCard = ({
  label,
  description,
  defaultIcon: Icon,
}: ImageCardProps) => {
  return (
    <div className="p-0 min-w-80 gap-0">
      <div className=" w-full h-40 rounded-sm overflow-hidden group relative hover:cursor-pointer">
        <div className="bg-gray-200 w-full h-full flex justify-center items-center">
          <Icon className="w-20 text-muted-foreground" />
        </div>
        <div className="absolute top-0 p-2 items-end  left-0 w-full h-full hidden bg-opacity-50 bg-gradient-to-b from-[rgba(229,229,229,0.5)] to-[rgba(75,85,99,0.5)] group-hover:flex">
          <span className="text-xs text-white">{description}</span>
        </div>
      </div>

      <div className="flex justify-between items-center py-2">
        <span className="text-sm font-bold">{label}</span>
        <IconButton
          icon={Edit}
          className="text-muted-foreground"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ImageCard;
