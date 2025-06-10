"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import { CalendarCheck2, CalendarX2, MapPin, Phone } from "lucide-react";
import { useWorkplaceStore } from "@/store/workplace-store";
import { format } from "date-fns";

const Info = () => {
  const { workplaceDetail } = useWorkplaceStore();

  return (
    <Card className="py-0  overflow-hidden">
      <CardContent className="flex flex-row max-xl:flex-col px-0">
        {/* 이미지 */}
        <div className="bg-[#d3d3d3] w-[400px] h-[auto] max-xl:w-full max-xl:h-50"></div>

        <div className="flex flex-col flex-1">
          {/* 헤더 */}
          <div className="flex justify-between items-end px-6 py-4 border-b">
            <CardTitle>{workplaceDetail?.name}</CardTitle>
            <span className="text-muted-foreground text-sm">
              {workplaceDetail?.contractNum}
            </span>
          </div>
          {/* 내용 */}
          <div className="grid grid-cols-2 gap-y-8 p-6 h-full max-xl:w-full max-xl:grid max-xl:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] max-xl:place-items-start">
            {/* 아이템  */}
            <div className="flex items-center gap-4">
              <MapPin
                size={18}
                className="text-blue-400 bg-blue-50 w-10 h-10 p-2 rounded-md"
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground font-semibold">
                  주소
                </span>
                <span className="text-sm">{workplaceDetail?.address}</span>
              </div>
            </div>
            {/* 아이템  */}
            <div className="flex items-center gap-4">
              <CalendarCheck2
                size={18}
                className="text-amber-400 bg-amber-50 w-10 h-10 p-2 rounded-md"
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground font-semibold">
                  계약일자
                </span>
                <span className="text-sm">
                  {workplaceDetail?.contractedAt
                    ? format(workplaceDetail?.contractedAt, "yyyy-MM-dd")
                    : ""}
                </span>
              </div>
            </div>
            {/* 아이템  */}
            <div className="flex items-center gap-4">
              <Phone
                size={18}
                className="text-green-400 bg-green-50 w-10 h-10 p-2 rounded-md"
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground font-semibold">
                  연락처
                </span>
                <span className="text-sm">{workplaceDetail?.tel}</span>
              </div>
            </div>
            {/* 아이템  */}
            <div className="flex items-center gap-4">
              <CalendarX2
                size={18}
                className="text-red-400 bg-red-50 w-10 h-10 p-2 rounded-md"
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground font-semibold">
                  해약일자
                </span>
                <span className="text-sm">
                  {workplaceDetail?.expiredAt
                    ? format(workplaceDetail?.expiredAt, "yyyy-MM-dd")
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Info;
