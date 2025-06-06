"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Mail, Phone, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const UserList = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">직원</span>
        <Button
          className="text-xs rounded-sm bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer"
          onClick={() => router.push("/1/workplace/user/add")}
        >
          <Plus size={24} />
          직원추가
        </Button>
      </div>

      <div className="h-150 border p-6  rounded-sm bg-accent overflow-auto">
        <ScrollArea>
          <div className="grid grid-cols-6 max-xl:grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 grid-rows-4 gap-x-4 gap-y-6 v">
            {Array.from({ length: 6 }).map((_, x) => {
              return (
                <UserCard
                  key={x}
                  name="이동희"
                  phone="01032665670"
                  email="duke@gmail.com"
                />
              );
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  );
};

interface UserCardProps {
  edit?: boolean;
  name: string;
  phone: string;
  email: string;
  selected?: boolean;
  onClick?: () => void;
}

const UserCard = ({
  edit,
  name,
  phone,
  email,
  selected,
  onClick,
}: UserCardProps) => {
  return (
    <div
      className={`flex flex-col  gap-4 bg-white border rounded-md px-4 py-4  hover:border-[var(--primary-color)] hover:bg-accent 
            ${edit ? "hover:cursor-pointer" : null}
            ${
              edit && selected
                ? "bg-accent border-[var(--primary-color)]"
                : null
            } duration-100`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>user</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm">{name}</span>
          <span className="text-muted-foreground text-xs"></span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-end gap-2">
          <Phone size={14} className="text-muted-foreground" />
          <span className="text-xs tracking-wide text-muted-foreground">
            {phone || "-"}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <Mail size={14} className="text-muted-foreground" />
          <span className="text-xs tracking-wide text-muted-foreground">
            {email || "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserList;
