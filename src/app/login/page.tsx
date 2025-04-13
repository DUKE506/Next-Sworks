import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { LoginForm } from "./_components/form";
//#53c56c
const Page = () => {
  return (
    <div className="flex w-full h-full gap-18 p-12 bg-gradient-to-r from-[var(--primary-color)] to-[#a7774ac7] bg-[length:200%_200%] animate-[var(--animate-gradient-flow)]">
      <LoginForm />
      <Card className="flex-1">영역</Card>
    </div>
  );
};

export default Page;
