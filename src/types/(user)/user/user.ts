import { UserPermission } from "@/types/(admin)/permission/user-permission";
import { WorkerPermission } from "@/types/(admin)/permission/worker-permission/worker-permission";

export class User {
  id: number;
  name: string;
  account: string;
  password: string | null;
  email: string;
  phone: string;
  status: string;
  permission: WorkerPermission;

  constructor({
    id,
    name,
    account,
    password,
    email,
    phone,
    status,
    permission,
  }: {
    id: number;
    name: string;
    account: string;
    password: string | null;
    email: string;
    phone: string;
    status: string;
    permission: WorkerPermission;
  }) {
    this.id = id;
    this.name = name;
    this.account = account;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.status = status;
    this.permission = permission;
  }
}
