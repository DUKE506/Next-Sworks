"use client";
import React from "react";
import { SideBar } from "../../../components/ui/SideBar/side-bar";
import { useAuthStore } from "@/store/auth-store";
import TopBar from "@/components/ui/top-bar/top-bar";
import ProfileBadge from "@/components/common/profiles";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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

  return (
    <div className="flex h-full bg-stone-50">
      <SideBar data={userSideBar} />
      <div className="flex flex-col gap-6  w-full overflow-y-auto py-6 px-24 max-sm:px-6 bg-white min-h-screen ">
        <div className="flex justify-end">
          <ProfileBadge />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default layout;
