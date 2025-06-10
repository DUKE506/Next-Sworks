import { cn } from "@/lib/utils";
import React from "react";

const CustomSeparator = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("bg-border", className)}></div>;
};

export default CustomSeparator;
