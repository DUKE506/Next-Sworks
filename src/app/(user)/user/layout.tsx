"use client";
import React from "react";
import { SideBar } from "../../../components/ui/SideBar/side-bar";
import { useAuthStore } from "@/store/auth-store";
import TopBar from "@/components/ui/top-bar/top-bar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { currentWorkplace } = useAuthStore();
  const userSideBar: SideBar[] = [
    {
      label: "사업장",
      href: `/${currentWorkplace}/workplace`,
      ref: `workplace`,
    },
    {
      label: "설비",
      href: `/${currentWorkplace}/facility/0/전체`,
      ref: `facility`,
    },
    {
      label: "민원",
      href: `/${currentWorkplace}/voc`,
      ref: `voc`,
    },
  ];

  return (
    <div className="flex h-full bg-stone-50">
      <SideBar data={userSideBar} />
      <div className="flex flex-col gap-6  w-full overflow-y-auto py-6 px-24 max-sm:px-6 bg-white min-h-screen ">
        <TopBar />
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default layout;
