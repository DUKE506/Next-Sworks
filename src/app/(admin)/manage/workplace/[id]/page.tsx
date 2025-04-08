import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  CalendarCheck2,
  CalendarX2,
  ChevronsUpDown,
  Drill,
  Flame,
  MapPin,
  Megaphone,
  PaintRoller,
  Phone,
  ShieldBan,
  Wifi,
  Zap,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { CustomToggle } from "../components/Info/info-area";
import { Admins } from "./_components/table/table";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-6">
      <Card className="py-0  overflow-hidden">
        <CardContent className="flex flex-row px-0">
          {/* 이미지 */}
          <div className="bg-[#d3d3d3] w-[400px] h-[auto]"></div>

          <div className="flex flex-col flex-1">
            {/* 헤더 */}
            <div className="flex justify-between items-end px-6 py-4 border-b">
              <CardTitle>강남우체국</CardTitle>
              <span className="text-muted-foreground text-sm">
                CT-20240312-0023
              </span>
            </div>
            {/* 내용 */}
            <div className="grid grid-cols-2 gap-y-8 p-6 h-full">
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
                  <span className="text-sm">서울특별시 강남구 개포로 619</span>
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
                  <span className="text-sm">2025-04-08</span>
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
                  <span className="text-sm">02-154-8812</span>
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
                  <span className="text-sm">2026-04-09</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>권한</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between"></CardContent>
      </Card>
      <Admins />
    </div>
  );
};

export default Page;
