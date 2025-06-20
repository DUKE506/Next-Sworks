import { AdminPermission } from "@/types/(admin)/permission/admin-permission/admin-permission";
import { Department } from "../department/department.dto";
import { Workplace } from "@/types/(admin)/workplace/workplace";

export class Admin {
  id: number;
  account: string;
  name: string;

  email: string;
  phone: string;
  department: Department;
  workplaces: Workplace[];
  permission: AdminPermission;

  constructor(
    id: number,
    account: string,
    name: string,
    permission: AdminPermission,
    email: string,
    phone: string,
    department: Department,
    workplaces: Workplace[]
  ) {
    this.id = id;
    this.account = account;
    this.name = name;
    this.permission = permission;
    this.email = email;
    this.phone = phone;
    this.department = department;
    this.workplaces = workplaces;
  }
}
