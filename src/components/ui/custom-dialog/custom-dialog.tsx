import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface CustomDialogProps {
  label: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const CustomDialog = ({
  label,
  title,
  icon: Icon,
  children,
}: CustomDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-sm bg-white text-[var(--primary-color)] shadow-none border rounded-sm hover:bg-transparent hover:text-[var(--primary-color)]  hover:border-[var(--primary-color)] hover:cursor-pointer"
        >
          <Icon className="w-4" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <span className="text-lg font-bold"> {title}</span>
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
