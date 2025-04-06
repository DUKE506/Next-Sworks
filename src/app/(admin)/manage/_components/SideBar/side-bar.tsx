import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export const SideBar = () => {
  return (
    <Card className="flex-1/6">
      <CardHeader>
        <CardTitle>프로필 영역</CardTitle>
      </CardHeader>
      <CardContent>메뉴 영역</CardContent>
    </Card>
  );
};
