"use client";
import React, { useEffect } from "react";

import Users from "./_components/users/users";
import { useAdminStore } from "@/store/admin-store";

import { useDeptStore } from "@/store/dept-store";
import Profile from "./_components/profile/profile";

const Page = () => {
  const { getDepts } = useDeptStore();
  const { getAdmins } = useAdminStore();
  useEffect(() => {
    //전체 관리자 데이터
    getAdmins();
    // //부서 데이터
    getDepts();
  }, []);
  return (
    <div className="flex flex-col gap-6 min-xl:h-full w-full ">
      <Profile />
      <Users />
    </div>
  );
};

export default Page;
