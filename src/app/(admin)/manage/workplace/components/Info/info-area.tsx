"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Drill } from "lucide-react";
import React, { useState } from "react";

export const InfoArea = () => {
  return (
    <Card className="flex-2/5 w-full">
      <CardContent>
        <CustomToggle label="기계">
          <Drill color="#818181" size={24} strokeWidth={0.5} />
        </CustomToggle>
      </CardContent>
    </Card>
  );
};

const CustomToggle = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  const [isPressed, setPressed] = useState<boolean>(false);

  return (
    <div
      className="inline-flex flex-col min-w-12 gap-1"
      onClick={() => setPressed(!isPressed)}
    >
      <div
        className={`inline-flex justify-center items-center border h-12 rounded-sm ${
          isPressed ? "bg-stone-400" : "bg-muted"
        } duration-300`}
      >
        {children}
      </div>
      <Label className={`justify-center text-xs "text-gray-600"`}>
        {label}
      </Label>
    </div>
  );
};
