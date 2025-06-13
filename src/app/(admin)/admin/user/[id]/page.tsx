"use client";
import React, { use, useEffect } from "react";
import { useAdminDetailStore } from "@/store/admin/admin-detail-store";
import { Profile } from "./_components/profile/profile";
import Workplaces from "./_components/workplace/workplace";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { admin, getAdmin } = useAdminDetailStore();

  useEffect(() => {
    getAdmin(parseInt(id));
  }, [id]);

  return (
    <div className="flex max-xl:flex-col gap-6 h-full">
      <Profile />
      <Workplaces />
    </div>
  );
};

export default Page;
