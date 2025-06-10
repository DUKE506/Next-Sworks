import { Admin } from "@/dtos/admin/department-admin.dto";
import { ColumnDef } from "@tanstack/react-table";

export const userColumns: ColumnDef<Admin>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      return row.original.name;
    },
  },
  {
    accessorKey: "department",
    header: "부서",
    cell: ({ row }) => {
      return row.original.department.name;
    },
  },
  {
    accessorKey: "email",
    header: "이메일",
    cell: ({ row }) => {
      return row.original.email;
    },
  },
  {
    accessorKey: "phone",
    header: "전화번호",
    cell: ({ row }) => {
      return row.original.phone;
    },
  },
];
