import React, { useEffect, useState } from "react";
import { Card } from "../card";
import { useAuthStore } from "@/store/auth-store";
import { LogOut, User } from "lucide-react";

const TopBar = () => {
  //현재 내정보
  return (
    <div className="w-full flex justify-end items-center">
      <ProfileBadge />
    </div>
  );
};

const ProfileBadge = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { profile } = useAuthStore();

  // 팝오버 이외의 영역 클릭 시 닫기 위한 참조
  const handleOutsideClick = () => {
    if (open) {
      setOpen(false);
    }
  };

  // 클릭 이벤트 등록 및 제거
  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [open]);

  // 프로필 배지 클릭 핸들러
  const handleBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setOpen(!open);
  };

  return (
    <div className="relative">
      <Card
        className="w-fit py-2 px-4 rounded-sm hover:cursor-pointer"
        onClick={handleBadgeClick}
      >
        <div>
          <span className="text-xs font-bold">{profile?.name}</span>
          <span className="text-xs">님</span>
        </div>
      </Card>
      {open && <ProfilePopover onClose={() => setOpen(false)} />}
    </div>
  );
};

const ProfilePopover = ({ onClose }: { onClose: () => void }) => {
  return (
    <Card className="absolute z-10 px-1 py-1 rounded-sm top-[110%] gap-0">
      <div className="flex gap-2 items-center px-3 py-2 rounded-sm  hover:cursor-pointer hover:bg-gray-50">
        <User className="w-4" />
        <span className="text-xs">내 정보</span>
      </div>
      <div className="flex gap-2 items-center px-3 py-2 rounded-sm  hover:cursor-pointer hover:bg-gray-50">
        <LogOut className="w-4 text-red-500" />
        <span className="text-xs text-red-500">로그아웃</span>
      </div>
    </Card>
  );
};

export default TopBar;
