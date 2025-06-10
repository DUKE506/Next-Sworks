"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlignJustify, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export type SideBar = {
  label: string;
  href: string;
  ref?: string;
};

export const managerSideBar: SideBar[] = [
  {
    label: "사업장",
    href: "/admin/workplace",
    ref: "workplace",
  },
  {
    label: "관리자",
    href: "/admin/user",
    ref: "user",
  },
];

export const userSideBar: SideBar[] = [
  {
    label: "사업장",
    href: "/1/workplace",
  },
  {
    label: "설비",
    href: "/1/facility",
  },
];

interface SideBarProps {
  data: SideBar[];
}

export const SideBar = ({ data }: SideBarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  // 창 크기 변경 시 처리
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        // 예: 1280px 이상일 때 오버레이 닫기
        setOpen(false);
      }
    };

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 unmount 될 때 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onOpen = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* 오버레이 */}
      {open ? (
        <div
          className="absolute w-[100vw] h-full transition-opacity duration-300 bg-[var(--overlay-color)] opacity-20 z-30"
          onClick={() => setOpen(!open)}
        />
      ) : null}

      <div
        className={`flex flex-col justify-between max-xl:fixed top-0 left-0 h-full bg-white shadow-xl z-50
          w-[280px] transform transition-transform duration-300
          ${open ? "max-xl:translate-x-0" : "max-xl:-translate-x-full"}
        `}
      >
        <div className="p-6 font-extrabold text-2xl">
          <CardTitle>S-Works</CardTitle>
        </div>
        <CardContent className="flex flex-col flex-1 gap-4">
          {data.map((v, i) => {
            return (
              <SideBarItem
                key={i}
                label={v.label}
                href={v.href}
                ref={v.ref ?? ""}
                onClick={onOpen}
              />
            );
          })}
        </CardContent>
        {/* <div className="p-6">
          <Button className="w-full bg-white border border-red-500 hover:cursor-pointer  hover:bg-white group ">
            <LogOut size={24} className="text-red-500" />
            <span className="text-red-500 group-hover:font-bold">로그아웃</span>
          </Button>
        </div> */}
      </div>
      <Button
        className={`fixed top-4 left-[280px] z-50 bg-[var(--primary-color)] 
        rounded-tl-none rounded-bl-none hover:cursor-pointer hover:bg-[var(--primary-hover-color)] 
        transition-transform duration-300 xl:hidden  ${
          open ? "translate-x-0" : "-translate-x-[280px]"
        }`}
        onClick={() => setOpen(!open)}
      >
        <AlignJustify size={28} />
      </Button>
    </div>
  );
};

interface SideBarItemProps {
  label: string;
  href: string;
  ref: string;
  onClick?: () => void;
}

const SideBarItem = ({ label, href, ref, ...props }: SideBarItemProps) => {
  const pathName = usePathname();

  return (
    <Link
      className={`${
        pathName.includes(ref) ? "text-[var(--primary-color)]! font-bold" : null
      } text-sm hover:font-bold hover:text-[var(--primary-color)]!`}
      href={href}
      {...props}
    >
      {label}
    </Link>
  );
};
