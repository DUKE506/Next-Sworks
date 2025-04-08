"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
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

export const InfoArea = () => {
  return (
    <Card className="flex-2/5 w-full">
      <CardContent className="flex flex-col gap-8">
        <div className="flex gap-6">
          <div className="flex flex-col flex-1 gap-4">
            <span className="text-lg font-extrabold">강남우체국</span>
            <StatCard label={"직원"} value={12} />
            <StatCard label={"민원"} value={8} delta={5} deltaType="INCREASE" />
          </div>
          <div className="grid grid-cols-3 gap-y-6 gap-x-6 w-fit">
            <CustomToggle label="기계" readonly={true}>
              <Drill color="#818181" size={24} strokeWidth={0.5} />
            </CustomToggle>
            <CustomToggle label="전기" readonly={true}>
              <Zap color="#818181" size={24} strokeWidth={0.5} />
            </CustomToggle>
            <CustomToggle label="승강" readonly={true}>
              <ChevronsUpDown color="#818181" size={24} strokeWidth={0.5} />
            </CustomToggle>
            <CustomToggle label="소방" readonly={true}>
              <Flame color="#818181" size={24} strokeWidth={0.5} />
            </CustomToggle>
            <CustomToggle label="건축" readonly={true}>
              <Building2 color="#818181" size={24} strokeWidth={0.5} />
            </CustomToggle>
            <CustomToggle label="통신" readonly={true}>
              <Wifi color="#818181" size={24} strokeWidth={0.5} />
            </CustomToggle>
            <CustomToggle label="미화" readonly={true}>
              <PaintRoller color="#818181" size={24} strokeWidth={0.5} />
            </CustomToggle>
            <CustomToggle label="보안" readonly={true}>
              <ShieldBan color="#818181" size={24} strokeWidth={0.5} />
            </CustomToggle>
            <CustomToggle label="민원" readonly={true}>
              <Megaphone color="#818181" size={24} strokeWidth={0.5} />
            </CustomToggle>
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

const CustomToggle = ({
  children,
  label,
  readonly = false,
}: {
  children: React.ReactNode;
  label: string;
  readonly?: boolean;
}) => {
  const [isPressed, setPressed] = useState<boolean>(false);

  return (
    <div
      className="inline-flex flex-col w-12 gap-1"
      onClick={() => (readonly ? setPressed(!isPressed) : null)}
    >
      <div
        className={`inline-flex justify-center items-center border h-12 rounded-sm ${
          isPressed ? "bg-stone-400" : "bg-muted"
        } duration-300`}
      >
        {children}
      </div>
      <Label className={`justify-center text-xs "text-gray-600"`}>
        {label}
      </Label>
    </div>
  );
};
