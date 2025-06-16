"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { useAuthStore } from "@/store/auth-store";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

import { LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { removeClientAuthToken } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ProfileBadge = () => {
  const router = useRouter();
  const { resetProfile } = useAuthStore();
  const handleLogout = () => {
    //토큰삭제
    removeClientAuthToken();
    //프로필 삭제
    resetProfile();
    //로그인페이지
    router.replace("/login");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Profile />
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <ItemBox
          className="text-red-500"
          icon={LogOutIcon}
          label="로그아웃"
          onClick={() => handleLogout()}
        />
      </PopoverContent>
    </Popover>
  );
};

const Profile = () => {
  const { profile } = useAuthStore();
  const [img, setImg] = useState<boolean>(false);

  return (
    <Card className="w-fit gap-0 rounded-sm px-4 py-2 hover:cursor-pointer">
      <div></div>
      <div className="flex gap-2">
        {img ? (
          <img className="w-8 h-8" src="" />
        ) : (
          <div className="rounded-[50%] border w-10 h-10 flex justify-center items-center">
            {profile?.name.slice(0, 1)}
          </div>
        )}

        <div className="flex flex-col justify-between">
          <span className="text-start text-sm">{profile?.name}</span>
          <span className="text-start text-xs">{profile?.permission}</span>
        </div>
      </div>
    </Card>
  );
};

interface ItemBoxProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  className?: string;
  onClick: () => void;
}

const ItemBox = ({ icon: Icon, label, className, onClick }: ItemBoxProps) => {
  return (
    <div
      className={cn(
        "flex gap-2 py-2 px-4 hover:bg-gray-100 hover:cursor-pointer rounded-sm",
        className
      )}
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs">{label}</span>
    </div>
  );
};

export default ProfileBadge;
