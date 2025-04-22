"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Building2,
  ChevronsUpDown,
  Drill,
  FireExtinguisher,
  Flame,
  Megaphone,
  PaintRoller,
  ShieldBan,
  Triangle,
  Wifi,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import VocChart from "../voc/voc-chart";
import { useWorkplaceStore } from "@/store/workplace-store";
import { IconToggle } from "@/components/ui/icon-toggle/icon-toggle";

export const InfoArea = () => {
  const { selectedWorkplace } = useWorkplaceStore();

  return (
    <Card className="flex-2/6 ">
      <CardContent className="flex flex-col gap-8">
        <div className="flex gap-6 max-xl:flex-col">
          <div className="flex flex-col flex-1 gap-4">
            <span className="text-lg font-extrabold">
              {selectedWorkplace?.name}
            </span>
            <StatCard label={"직원"} value={12} />
            <StatCard label={"민원"} value={8} delta={5} deltaType="INCREASE" />
          </div>
          <div className=" grid grid-cols-3 gap-y-6 gap-x-6 w-fit max-xl:w-full max-xl:grid max-xl:grid-cols-[repeat(auto-fit,_minmax(48px,_1fr))] max-xl:place-items-center">
            <IconToggle
              label="기계"
              icon={Drill}
              readonly={true}
              pressed={selectedWorkplace?.permMachine}
            />

            <IconToggle
              label="전기"
              icon={Zap}
              readonly={true}
              pressed={selectedWorkplace?.permElectronic}
            />

            <IconToggle
              label="승강"
              icon={ChevronsUpDown}
              readonly={true}
              pressed={selectedWorkplace?.permLift}
            />

            <IconToggle
              label="소방"
              icon={Flame}
              readonly={true}
              pressed={selectedWorkplace?.permFire}
            />

            <IconToggle
              label="건축"
              icon={Building2}
              readonly={true}
              pressed={selectedWorkplace?.permConstruct}
            />

            <IconToggle
              label="통신"
              icon={Wifi}
              readonly={true}
              pressed={selectedWorkplace?.permNetwork}
            />

            <IconToggle
              label="미화"
              icon={PaintRoller}
              readonly={true}
              pressed={selectedWorkplace?.permBeauty}
            />

            <IconToggle
              label="보안"
              icon={ShieldBan}
              readonly={true}
              pressed={selectedWorkplace?.permBeauty}
            />

            <IconToggle
              label="민원"
              icon={Megaphone}
              readonly={true}
              pressed={selectedWorkplace?.permVoc}
            />
          </div>
        </div>
        <VocChart />
      </CardContent>
    </Card>
  );
};

export const StatCard = ({
  label,
  value,
  delta,
  deltaType,
}: {
  label: string;
  value: number;
  delta?: number;
  deltaType?: "INCREASE" | "DECREASE";
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center border-t pt-4 px-4">
      <div className="flex justify-between items-start">
        <span className="text-sm">{label}</span>
        {delta ? (
          <div
            className={`flex items-center gap-4 ${
              deltaType == "INCREASE" ? "bg-[#8fb38c6b]" : "bg-red-200"
            } rounded-xl px-2 py-1`}
          >
            <Triangle size={10} color="#637e61" fill="#637e61" />
            <span className="text-xs font-bold text-[#637e61]">{delta}</span>
          </div>
        ) : null}
      </div>
      <span className="text-2xl font-extrabold text-stone-500">
        {value.toString()}
      </span>
    </div>
  );
};
