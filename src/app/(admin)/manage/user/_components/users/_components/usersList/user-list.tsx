import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAdminStore } from "@/store/admin-store";
import { Mail, Phone, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserList = () => {
  const { adminsByDepartment, selectedDepartment } = useAdminStore();

  return (
    <div className="flex flex-col flex-5/6 px-6 pt-6 gap-6">
      <div className="flex justify-between">
        <span className="text-lg text-muted-foreground">
          {selectedDepartment?.name || "부서"}
        </span>
        <Input className="w-70" />
      </div>

      <div className="grid grid-cols-5 gap-4">
        {adminsByDepartment.map((a, i) => {
          return (
            <UserItem
              key={a.id}
              id={a.id}
              name={a.name}
              permission={a.permission}
              email={a.email}
              phone={a.phone}
            />
          );
        })}

        <div className="flex justify-center items-center min-h-[130px] border rounded-md hover:cursor-pointer hover:border-[var(--primary-color)] hover:bg-accent duration-100">
          <Plus size={32} className="text-ring" />
        </div>
      </div>
    </div>
  );
};

const UserItem = ({
  id,
  name,
  permission,
  email,
  phone,
}: {
  id?: number;
  name?: string;
  permission?: string;
  email?: string;
  phone?: string;
}) => {
  return (
    <Link href={`/manage/user/${id}`}>
      <div className="flex flex-col gap-4 border rounded-md px-4 py-4  hover:border-[var(--primary-color)] hover:bg-accent duration-100">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-sm">{name}</span>
            <span className="text-muted-foreground text-xs">{permission}</span>
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
    </Link>
  );
};

export default UserList;
