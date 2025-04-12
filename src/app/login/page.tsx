import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";
import { LoginForm } from "./_components/form";

const Page = () => {
  return (
    <div className="flex w-full h-full gap-18 p-12 bg-gradient-to-r from-[#53c56c] to-[#f5d100] bg-[length:200%_200%] animate-[var(--animate-gradient-flow)]">
      <LoginForm />
      <Card className="flex-1">영역</Card>
    </div>
  );
};

export default Page;
