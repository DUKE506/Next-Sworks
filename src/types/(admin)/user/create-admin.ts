import { Department } from "@/types/department";

export class CreateAdmin {
  account: string;
  password: string;
  name: string;
  // department?: Department;
  department?: string;
  phone: string;
  email: string;
  permission: "운영관리자" | "일반관리자";

  constructor({
    account,
    password,
    name,
    department,
    phone,
    email,
    permission,
  }: {
    account: string;
    password: string;
    name: string;
    department?: string;
    phone: string;
    email: string;
    permission: "운영관리자" | "일반관리자";
  }) {
    this.account = account;
    this.password = password;
    this.name = name;
    this.department = department;
    this.phone = phone;
    this.email = email;
    this.permission = permission;
  }
}
