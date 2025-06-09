import React from "react";
import { toast, Toaster } from "sonner";

interface useToastProp {
  message: string;
  type?: "success" | "error";
}

const useToast = () => {
  const addToast = ({ message, type = "success" }: useToastProp) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
    }
  };
  return { addToast };
};

export default useToast;

export const Toast = () => {
  return <Toaster richColors position="bottom-right" duration={1500} />;
};
