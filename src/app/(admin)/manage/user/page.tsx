"use client";
import React, { useEffect } from "react";
import Profile from "./_components/profile/profile";

import Users from "./_components/users/users";
import { DepartmentAdmin } from "../../../../dtos/admin/department-admin.dto";
import { Department } from "../../../../dtos/department/department.dto";
import { useAdminStore } from "@/store/admin-store";
import { DepartmentType } from "@/types/(admin)/department/department";

const department: Department[] = [
  {
    id: 1,
    name: "시스템개발연구소",
  },
  {
    id: 2,
    name: "운영팀",
  },
  {
    id: 3,
    name: "인프라팀",
  },
  {
    id: 4,
    name: "기획팀",
  },
  {
    id: 5,
    name: "디자인팀",
  },
];

const departmentCount: DepartmentType[] = [
  {
    name: "시스템개발연구소",
    value: 4,
  },
  {
    name: "운영팀",
    value: 3,
  },
  {
    name: "인프라팀",
    value: 4,
  },
  {
    name: "기획팀",
    value: 4,
  },
  {
    name: "디자인팀",
    value: 0,
  },
];

const departmentUsers: DepartmentAdmin[] = [
  {
    id: 1,
    name: "이동희",
    email: "dukeldh1128@gmail.com",
    permission: "MANAGER",
    phone: "010-1566-4851",
    department: department[0],
  },
  {
    id: 2,
    name: "김지수",
    email: "jisoo.kim@example.com",
    permission: "NORMAL",
    phone: "010-2345-6789",
    department: department[1],
  },
  {
    id: 3,
    name: "박민준",
    email: "minjun.park@example.com",
    permission: "MANAGER",
    phone: "010-9876-5432",
    department: department[2],
  },
  {
    id: 4,
    name: "최수연",
    email: "sooyun.choi@example.com",
    permission: "NORMAL",
    phone: "010-1122-3344",
    department: department[0],
  },
  {
    id: 5,
    name: "정예린",
    email: "yerin.jung@example.com",
    permission: "NORMAL",
    phone: "010-3344-5566",
    department: department[1],
  },
  {
    id: 6,
    name: "한도현",
    email: "dohyun.han@example.com",
    permission: "MANAGER",
    phone: "010-7788-9900",
    department: department[3],
  },
  {
    id: 7,
    name: "유승민",
    email: "seungmin.yoo@example.com",
    permission: "NORMAL",
    phone: "010-1212-3434",
    department: department[2],
  },
  {
    id: 8,
    name: "서지은",
    email: "jieun.seo@example.com",
    permission: "MANAGER",
    phone: "010-5656-7878",
    department: department[0],
  },
  {
    id: 9,
    name: "오하늘",
    email: "haneul.oh@example.com",
    permission: "NORMAL",
    phone: "010-9090-8080",
    department: department[3],
  },
  {
    id: 10,
    name: "배현우",
    email: "hyunwoo.bae@example.com",
    permission: "MANAGER",
    phone: "010-6767-4545",
    department: department[3],
  },
  {
    id: 11,
    name: "임하린",
    email: "harin.lim@example.com",
    permission: "NORMAL",
    phone: "010-9898-5656",
    department: department[1],
  },
  {
    id: 12,
    name: "신유진",
    email: "yujin.shin@example.com",
    permission: "NORMAL",
    phone: "010-2121-3434",
    department: department[2],
  },
  {
    id: 13,
    name: "정태영",
    email: "taeyoung.jung@example.com",
    permission: "MANAGER",
    phone: "010-8989-6767",
    department: department[2],
  },
  {
    id: 14,
    name: "강서윤",
    email: "seoyoon.kang@example.com",
    permission: "NORMAL",
    phone: "010-1313-2424",
    department: department[3],
  },
  {
    id: 15,
    name: "문지호",
    email: "jiho.moon@example.com",
    permission: "NORMAL",
    phone: "010-5656-2323",
    department: department[0],
  },
];

const Page = () => {
  const { setDepartmentAdmins, setDepartments } = useAdminStore();
  useEffect(() => {
    //전체 관리자 데이터
    setDepartmentAdmins(departmentUsers);
    //부서 데이터
    setDepartments(departmentCount);
  }, []);
  return (
    <div className="flex flex-col gap-6 h-full">
      <Profile />
      <Users />
    </div>
  );
};

export default Page;
