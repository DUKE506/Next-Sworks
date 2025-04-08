import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Admin = {
  id: number;
  name: string;
  email: string;
  permission: "MANAGER" | "NORMAL";
  phone: string;
  department: Department;
};

export type Department = {
  id: number;
  name: string;
};

export const admins: Admin[] = [
  {
    id: 1,
    name: "이동희",
    email: "dukeldh1128@gmail.com",
    permission: "MANAGER",
    phone: "010-1566-4851",
    department: { id: 1, name: "시스템개발연구소" },
  },
  {
    id: 2,
    name: "김지수",
    email: "jisoo.kim@example.com",
    permission: "NORMAL",
    phone: "010-2345-6789",
    department: { id: 2, name: "운영팀" },
  },
  {
    id: 3,
    name: "박민준",
    email: "minjun.park@example.com",
    permission: "MANAGER",
    phone: "010-9876-5432",
    department: { id: 3, name: "인프라팀" },
  },
  {
    id: 4,
    name: "최수연",
    email: "sooyun.choi@example.com",
    permission: "NORMAL",
    phone: "010-1122-3344",
    department: { id: 1, name: "시스템개발연구소" },
  },
  {
    id: 5,
    name: "정예린",
    email: "yerin.jung@example.com",
    permission: "NORMAL",
    phone: "010-3344-5566",
    department: { id: 2, name: "운영팀" },
  },
  {
    id: 6,
    name: "한도현",
    email: "dohyun.han@example.com",
    permission: "MANAGER",
    phone: "010-7788-9900",
    department: { id: 4, name: "기획팀" },
  },
  {
    id: 7,
    name: "유승민",
    email: "seungmin.yoo@example.com",
    permission: "NORMAL",
    phone: "010-1212-3434",
    department: { id: 3, name: "인프라팀" },
  },
  {
    id: 8,
    name: "서지은",
    email: "jieun.seo@example.com",
    permission: "MANAGER",
    phone: "010-5656-7878",
    department: { id: 1, name: "시스템개발연구소" },
  },
  {
    id: 9,
    name: "오하늘",
    email: "haneul.oh@example.com",
    permission: "NORMAL",
    phone: "010-9090-8080",
    department: { id: 5, name: "디자인팀" },
  },
  {
    id: 10,
    name: "배현우",
    email: "hyunwoo.bae@example.com",
    permission: "MANAGER",
    phone: "010-6767-4545",
    department: { id: 4, name: "기획팀" },
  },
  {
    id: 11,
    name: "임하린",
    email: "harin.lim@example.com",
    permission: "NORMAL",
    phone: "010-9898-5656",
    department: { id: 2, name: "운영팀" },
  },
  {
    id: 12,
    name: "신유진",
    email: "yujin.shin@example.com",
    permission: "NORMAL",
    phone: "010-2121-3434",
    department: { id: 5, name: "디자인팀" },
  },
  {
    id: 13,
    name: "정태영",
    email: "taeyoung.jung@example.com",
    permission: "MANAGER",
    phone: "010-8989-6767",
    department: { id: 3, name: "인프라팀" },
  },
  {
    id: 14,
    name: "강서윤",
    email: "seoyoon.kang@example.com",
    permission: "NORMAL",
    phone: "010-1313-2424",
    department: { id: 4, name: "기획팀" },
  },
  {
    id: 15,
    name: "문지호",
    email: "jiho.moon@example.com",
    permission: "NORMAL",
    phone: "010-5656-2323",
    department: { id: 1, name: "시스템개발연구소" },
  },
];

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
