import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import IconButton from "../ui/icon-button/icon-button";

interface CustomDialogProps {
  label?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title?: string;
  modal?: boolean;
  children: (props: {
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
  className?: string;
}

const CustomDialog = ({
  label,
  icon: Icon = PlusIcon,
  title,
  modal = true,
  children,
  className,
}: CustomDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={modal}>
      <DialogTrigger asChild>
        {!label ? (
          <IconButton className="text-muted-foreground" icon={Icon} />
        ) : (
          <div className="flex gap-4 hover:cursor-pointer hover:bg-gray-200">
            <PlusIcon className="text-black stroke-1 dark:text-white" />
            <span className="text-black text-xs dark:text-white">{label}</span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? "다이얼로그"}</DialogTitle>
        </DialogHeader>
        {children({ setIsOpen })}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
