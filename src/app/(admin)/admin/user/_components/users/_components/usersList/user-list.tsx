import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Admin } from "@/dtos/admin/department-admin.dto";
import { useAdminStore } from "@/store/admin/admin-store";
import { useDeptStore } from "@/store/dept-store";
import { Mail, Phone, Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

interface UserListProps {
  edit?: boolean;
  onClick?: () => void;
}

const UserList = ({ edit, onClick }: UserListProps) => {
  const {
    selectedAdminsByWorkplace,
    selectAdminsByWorkplace,
    postAdminsByWorkplace,
  } = useAdminStore();
  const { selectedDept } = useDeptStore();
  const { adminsByDepartment } = useAdminStore();
  const params = useParams();

  return (
    <div className="flex flex-col flex-5/6 px-6 py-6 gap-6 max-xl:h-full">
      <div className="flex justify-between max-xl:flex-col gap-6">
        <span className="text-lg text-muted-foreground">
          {selectedDept?.name || "전체"}
        </span>
        <Input className="w-70" />
      </div>
      {/* grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] */}
      <div className="grid gap-4 grid-cols-4 max-sm:grid-cols-1">
        {adminsByDepartment.map((a, i) => {
          const selected = selectedAdminsByWorkplace.includes(a);

          return (
            <AdminCard
              key={a.id}
              admin={a}
              selected={selected}
              edit={edit}
              onClick={() => selectAdminsByWorkplace(a)}
            />
          );
        })}
        {edit ? (
          <Button
            onClick={onClick}
            className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] hover:cursor-pointer absolute right-6 bottom-6"
          >
            Add
          </Button>
        ) : (
          <PlusBtn />
        )}
      </div>
    </div>
  );
};

interface UserItemProps {
  edit?: boolean;
  admin: Admin;
  selected: boolean;
  onClick?: () => void;
}

const AdminCard = ({ edit, admin, selected, onClick }: UserItemProps) => {
  const adminCard = (
    <div
      className={`flex flex-col  gap-4 border rounded-md px-4 py-4  hover:border-[var(--primary-color)] hover:bg-accent 
        ${edit ? "hover:cursor-pointer" : null}
        ${
          edit && selected ? "bg-accent border-[var(--primary-color)]" : null
        } duration-100`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>user</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm">{admin.name}</span>
          <span className="text-muted-foreground text-xs">
            {admin.permission}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-end gap-2">
          <Phone size={14} className="text-muted-foreground" />
          <span className="text-xs tracking-wide text-muted-foreground">
            {admin.phone || "-"}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <Mail size={14} className="text-muted-foreground" />
          <span className="text-xs tracking-wide text-muted-foreground">
            {admin.email || "-"}
          </span>
        </div>
      </div>
    </div>
  );

  return edit ? (
    adminCard
  ) : (
    <Link href={`/manage/user/${admin.id}`}>{adminCard}</Link>
  );
};

const PlusBtn = () => {
  const router = useRouter();
  return (
    <div
      className="flex justify-center items-center min-h-[130px] border rounded-md hover:cursor-pointer hover:border-[var(--primary-color)] hover:bg-accent duration-100"
      onClick={() => router.push("/manage/user/add")}
    >
      <Plus size={32} className="text-ring" />
    </div>
  );
};

export default UserList;
