import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export const SideBar = () => {
  return (
    <Card className="flex-1/6">
      <CardHeader>
        <CardTitle>프로필 영역</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Link className="text-sm" href={"/manage/workplace"}>
          사업장
        </Link>
        <Link className="text-sm" href={"/manage/user"}>
          관리자
        </Link>
      </CardContent>
    </Card>
  );
};
