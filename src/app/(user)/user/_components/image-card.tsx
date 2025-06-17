import IconButton from "@/components/ui/icon-button/icon-button";
import { Edit, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ImageCardProps {
  id: number;
  label: string;
  description: string;
  defaultIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ImageCard = ({
  id,
  label,
  description,
  defaultIcon: Icon,
}: ImageCardProps) => {
  const router = useRouter();

  const onDetail = () => {
    router.push(`workplace/building/${id}`);
  };
  return (
    <div className="flex flex-col gap-2 min-w-80 ">
      <div
        className=" w-full h-40 rounded-sm overflow-hidden group relative hover:cursor-pointer"
        onClick={() => onDetail()}
      >
        <div className="bg-gray-200 w-full h-full flex justify-center items-center">
          <Icon className="w-20 text-muted-foreground" />
        </div>
        <div className="absolute top-0 p-2 items-end  left-0 w-full h-full hidden bg-opacity-50 bg-gradient-to-b from-[rgba(229,229,229,0.5)] to-[rgba(75,85,99,0.5)] group-hover:flex">
          <span className="text-xs text-white">{description}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span
          className="text-sm font-bold hover:cursor-pointer"
          onClick={() => onDetail()}
        >
          {label}
        </span>
        <IconButton
          icon={QrCode}
          className="text-muted-foreground"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ImageCard;
