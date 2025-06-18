"use client";
import React, { useEffect } from "react";
import { SideBar } from "../../../components/ui/SideBar/side-bar";
import { useAuthStore } from "@/store/auth-store";
import TopBar from "@/components/ui/top-bar/top-bar";
import ProfileBadge from "@/components/common/profiles";
import { useWorkplaceStore } from "@/store/workplace-store";
import { Layers } from "lucide-react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { workplaceDetail, getWorkplaceDetail } = useWorkplaceStore();

  const { currentWorkplace } = useAuthStore();
  const userSideBar: SideBar[] = [
    {
      label: "사업장",
      href: `/user/workplace`,
      ref: `workplace`,
    },
    {
      label: "설비",
      href: `/user/facility/0/전체`,
      ref: `facility`,
    },
    {
      label: "민원",
      href: `/user/voc`,
      ref: `voc`,
    },
  ];

  useEffect(() => {
    if (!currentWorkplace) return;
    getWorkplaceDetail(currentWorkplace);
  }, [currentWorkplace]);

  return (
    <div className="flex h-full bg-stone-50">
      <SideBar data={userSideBar} />
      <div className="flex flex-col gap-6  w-full overflow-y-auto py-6 px-24 max-sm:px-6 bg-white min-h-screen ">
        <div className="flex justify-end items-center gap-8">
          <div className="flex items-center gap-2 ">
            <Layers className="w-6 h-6 text-gray-500" />
            <span className="text-md font-bold">{workplaceDetail?.name}</span>
          </div>

          <ProfileBadge />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default layout;
