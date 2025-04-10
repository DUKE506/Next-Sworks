import { ManagerPermissionUnion } from "@/types/(admin)/user";
import { Department } from "../department/department.dto";

export class DepartmentAdmin {
  id: number;
  name: string;
  permission: ManagerPermissionUnion;
  email: string;
  phone: string;
  department: Department;

  constructor(
    id: number,
    name: string,
    permission: ManagerPermissionUnion,
    email: string,
    phone: string,
    department: Department
  ) {
    this.id = id;
    this.name = name;
    this.permission = permission;
    this.email = email;
    this.phone = phone;
    this.department = department;
  }
}
