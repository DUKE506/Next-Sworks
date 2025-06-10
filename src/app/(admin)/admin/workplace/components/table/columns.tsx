"use client";
import { Badge } from "@/components/ui/badge";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Link from "next/link";

export const workplaceColumns: ColumnDef<Workplace>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => {
      const value = row.original.name;
      const id = row.original.id;

      return <Link href={`/admin/workplace/${id}`}>{value}</Link>;
    },
  },
  {
    accessorKey: "contractNum",
    header: "계약번호",
    cell: ({ row }) => {
      const value = row.original.contractNum;

      return value;
    },
  },
  {
    accessorKey: "contractedAt",
    header: "계약일자",
    cell: ({ row }) => {
      const value = row.original.contractedAt;

      return dayjs(value).format("YYYY-MM-DD");
    },
  },
  {
    accessorKey: "canceledAt",
    header: "해약일자",
    cell: ({ row }) => {
      const value = row.original.expiredAt;

      return value ? dayjs(value).format("YYYY-MM-DD") : null;
    },
  },
  {
    accessorKey: "state",
    header: "상태",
    cell: ({ row }) => {
      const value = row.original.state;
      const bgColor = value
        ? "bg-[var(--primary-light-color)]"
        : "bg-[#ffcbcf7f]";
      const textColor = value
        ? "text-[var(--primary-color)]"
        : "text-[#973250]";

      return (
        <Badge className={`${bgColor} ${textColor} font-bold px-3`}>
          {" "}
          {value ? "계약" : "해약"}
        </Badge>
      );
    },
  },
];
