import { ManagerPermissionUnion } from "@/types/(admin)/user";
import { Department } from "../department/department.dto";

export class Admin {
  id: number;
  account: string;
  name: string;
  permission: ManagerPermissionUnion;
  email: string;
  phone: string;
  department: Department;

  constructor(
    id: number,
    account: string,
    name: string,
    permission: ManagerPermissionUnion,
    email: string,
    phone: string,
    department: Department
  ) {
    this.id = id;
    this.account = account;
    this.name = name;
    this.permission = permission;
    this.email = email;
    this.phone = phone;
    this.department = department;
  }
}
