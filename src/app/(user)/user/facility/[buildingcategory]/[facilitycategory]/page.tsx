"use client";
import React, { useEffect, useState } from "react";
import { Tab } from "../../../_components/tab";
import ButtonTab, { facilityCategory } from "../../../_components/button-tab";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useBuildingStore } from "@/store/building-store";
import { useAuthStore } from "@/store/auth-store";
import { useFacilityStore } from "@/store/facility-store";

import { Card } from "@/components/ui/card";
import { Bolt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FacCard } from "./_components/facility-card";

const Page = () => {
  const { currentWorkplace } = useAuthStore();
  const { buildings } = useBuildingStore();
  const { getFacilityByCategory, facilities } = useFacilityStore();
  const router = useRouter();
  const pathname = usePathname();

  const buildingIdFromPath = pathname.split("/")[3] || "0";
  const facCategoryPath = pathname.split("/")[4] || "전체";

  useEffect(() => {
    getFacilityByCategory(
      buildingIdFromPath,
      decodeURIComponent(facCategoryPath)
    );
  }, []);

  // 건물 탭 클릭 시 선택된 건물 ID 변경 및 URL 이동
  const handleBuildingTabClick = (id: string) => {
    // URL을 동적으로 변경하여 해당 건물에 맞는 페이지로 이동
    router.push(`/${currentWorkplace}/facility/${id}/전체`); // 여기서 0/0을 원하는 facility 관련 ID로 변경 가능
  };

  // 설비 카테고리 탭 클릭 시 선택 카테코리 변경 및 url 이동
  const handleCategoryClick = (id: string) => {
    // URL을 동적으로 변경하여 해당 건물에 맞는 페이지로 이동
    router.push(`/${currentWorkplace}/facility/${buildingIdFromPath}/${id}`); // 여기서 0/0을 원하는 facility 관련 ID로 변경 가능
  };

  return (
    <div className="flex flex-col gap-6">
      <span className="text-xl font-bold">설비</span>
      <div className="flex flex-col gap-4">
        <Tab
          tabs={buildings}
          selectedId={buildingIdFromPath}
          onTabClick={handleBuildingTabClick}
        />
        <div className="flex justify-between">
          <ButtonTab
            tabs={facilityCategory}
            selectedId={facCategoryPath}
            onClick={handleCategoryClick}
          />
          <Button
            className="rounded-sm text-xs bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer"
            onClick={() => {
              router.push(`/${currentWorkplace}/facility/add`);
            }}
          >
            생성
          </Button>
        </div>
      </div>
      <div className="w-full rounded-sm grid grid-cols-5 gap-x-8 gap-y-10">
        {facilities.map((v, i) => {
          return <FacCard key={i} data={v} />;
        })}
      </div>
    </div>
  );
};

export default Page;
