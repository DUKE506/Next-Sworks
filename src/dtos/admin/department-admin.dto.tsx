import { ManagerPermissionUnion } from "@/types/(admin)/user";
import { Department } from "../department/department.dto";
import { Workplace } from "@/types/(admin)/workplace/workplace";

export class Admin {
  id: number;
  account: string;
  name: string;
  permission: ManagerPermissionUnion;
  email: string;
  phone: string;
  department: Department;
  workplaces: Workplace[];

  constructor(
    id: number,
    account: string,
    name: string,
    permission: ManagerPermissionUnion,
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
