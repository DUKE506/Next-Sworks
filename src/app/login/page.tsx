import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const Page = () => {
  return (
    <div className="flex w-full h-full gap-18 p-12">
      <Card className="w-130 min-w-100">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <Input></Input>
          <Input></Input>
        </CardContent>
      </Card>
      <div className="flex-1">플랫봄 ui 영역</div>
    </div>
  );
};

export default Page;
