import { Badge } from "@/components/ui/badge";
import { User } from "@/types/(user)/user/user";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarOff, CheckCircle, Clock, LogOut } from "lucide-react";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      const value = row.original.name;

      return value;
    },
  },
  {
    accessorKey: "permission",
    header: "권한",
    cell: ({ row }) => {
      const value = row.original.permission?.permission;

      return value;
    },
  },
  {
    accessorKey: "phone",
    header: "전화번호",
    cell: ({ row }) => {
      const value = row.original.phone;

      return value;
    },
  },
  {
    accessorKey: "email",
    header: "이메일",
    cell: ({ row }) => {
      const value = row.original.email;

      return value;
    },
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const value = row.original.status;
      switch (value) {
        case "OFF":
          return (
            <Badge className="bg-amber-100 text-amber-500 w-20 rounded-sm">
              <CalendarOff className="text-amber-500" />
              휴직
            </Badge>
          );
        case "RESIGN":
          return (
            <Badge className="bg-gray-100 text-gray-600 w-20 rounded-sm">
              <LogOut className="text-gray-600" />
              퇴사
            </Badge>
          );
        case "WORK":
          return (
            <Badge className="bg-green-100 text-green-500 w-20 rounded-sm">
              <CheckCircle className="text-green-500" />
              재직
            </Badge>
          );
      }
      return value;
    },
  },
];

// export const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => {
//   const id = i + 1;
//   const isManager = i % 2 === 0; // 짝수 ID는 MANAGER, 홀수 ID는 NORMAL

//   return new User({
//     id,
//     name: `사용자${id}`,
//     account: `user${id}`,
//     password: `password${id}`,
//     email: `user${id}@example.com`,
//     phone: `010-1234-${String(1000 + id).slice(-4)}`,
//     permission: ,
//     status: isManager ? "WORK" : "RESIGN",
//     basicPerm: Math.round(Math.random()),
//     machinePerm: Math.round(Math.random()),
//     electricPerm: Math.round(Math.random()),
//     firePerm: Math.round(Math.random()),
//     buildingPerm: Math.round(Math.random()),
//     networkPerm: Math.round(Math.random()),
//     beautyPerm: Math.round(Math.random()),
//     securityPerm: Math.round(Math.random()),
//     userPerm: Math.round(Math.random()),
//     vocPerm: Math.round(Math.random()),
//   });
// });
