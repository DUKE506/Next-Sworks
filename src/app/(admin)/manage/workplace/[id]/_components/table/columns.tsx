import { Admin } from "@/dtos/admin/department-admin.dto";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      const value = row.original.name;
      const id = row.original.id;

      return <Link href={`/manage/user/${id}`}>{value}</Link>;
    },
  },
  {
    accessorKey: "department",
    header: "부서",
    cell: ({ row }) => {
      const value = row.original.department.name;

      return value;
    },
  },
  {
    accessorKey: "permission",
    header: "권한",
    cell: ({ row }) => {
      const value = row.original.permission;

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
    accessorKey: "phone",
    header: "연락처",
    cell: ({ row }) => {
      const value = row.original.phone;

      return value;
    },
  },
];
