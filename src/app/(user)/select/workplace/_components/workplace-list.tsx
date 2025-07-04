"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { removeClientAuthToken } from "@/lib/auth-client";
import { useAdminStore } from "@/store/admin/admin-store";
import { useAdminDetailStore } from "@/store/admin/admin-detail-store";
import { useAuthStore } from "@/store/auth-store";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const WorkplaceList = () => {
  //담당 사업장 조회
  const { profile, postSelectAdminWorkplace, resetProfile } = useAuthStore();
  const { admin, getAdmin } = useAdminDetailStore();
  const router = useRouter();

  useEffect(() => {
    if (!profile) return;
    getAdmin(profile?.id);
  }, []);

  const handleSelectWorkplace = async (workplaceId: number) => {
    const res: Record<string, any> = await postSelectAdminWorkplace(
      workplaceId
    );
    console.log(res);

    if (res.success) {
      router.replace(`/user/workplace`);
    }
  };

  const handleLogOut = () => {
    //토큰삭제
    removeClientAuthToken();
    //프로필삭제
    resetProfile();
    //로그인페이지
    router.replace("/login");
  };

  return (
    <Card className="w-130 min-w-100 flex justify-center items-center gap-6">
      <CardHeader className="flex flex-col gap-2 w-full ">
        <div className="flex gap-0 w-full items-end ">
          <CardTitle className="text-2xl">{profile?.name}</CardTitle>
          <CardTitle className="text-lg">님 사업장</CardTitle>
        </div>
        <CardDescription>관리할 사업장을 선택해주세요.</CardDescription>
      </CardHeader>
      <CardContent className="w-full p-0 px-2">
        {admin?.workplaces.map((w, i) => (
          <WorkplaceItem key={i} data={w} onClick={handleSelectWorkplace} />
        ))}
      </CardContent>
      <CardFooter className="w-full">
        <Button
          className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer"
          onClick={handleLogOut}
        >
          취소
        </Button>
      </CardFooter>
    </Card>
  );
};

interface WorkplaceItemProps {
  data: Workplace;
  onClick: (workplaceId: number) => void;
}

const WorkplaceItem = ({ data, onClick }: WorkplaceItemProps) => {
  return (
    <div
      className="flex justify-between items-center rounded-sm px-4 py-2 hover:bg-gray-200 hover:cursor-pointer"
      onClick={() => onClick(data.id)}
    >
      <span className="text-sm">{data.name}</span>
      <span className="text-xs">{data.contractNum}</span>
    </div>
  );
};

export default WorkplaceList;
