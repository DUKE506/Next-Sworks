import { UserPermission } from "@/types/(admin)/permission/user-permission";

export class User {
  id: number;
  name: string;
  account: string;
  password: string | null;
  email: string;
  phone: string;
  permission: UserPermission;

  constructor({
    id,
    name,
    account,
    password,
    email,
    phone,

    permission,
  }: {
    id: number;
    name: string;
    account: string;
    password: string | null;
    email: string;
    phone: string;

    permission: UserPermission;
  }) {
    this.id = id;
    this.name = name;
    this.account = account;
    this.password = password;
    this.email = email;
    this.phone = phone;

    this.permission = permission;
  }
}
