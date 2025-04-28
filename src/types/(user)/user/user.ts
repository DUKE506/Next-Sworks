export class User {
  id: number;
  name: string;
  account: string;
  password: string;
  email: string;
  phone: string;
  permission: string;

  basicPerm: number;
  machinePerm: number;
  electricPerm: number;
  firePerm: number;
  buildingPerm: number;
  networkPerm: number;
  beautyPerm: number;
  securityPerm: number;

  userPerm: number;
  vocPerm: number;

  constructor({
    id,
    name,
    account,
    password,
    email,
    phone,
    permission,
    basicPerm,
    machinePerm,
    electricPerm,
    firePerm,
    buildingPerm,
    networkPerm,
    beautyPerm,
    securityPerm,
    userPerm,
    vocPerm,
  }: {
    id: number;
    name: string;
    account: string;
    password: string;
    email: string;
    phone: string;
    permission: string;

    basicPerm: number;
    machinePerm: number;
    electricPerm: number;
    firePerm: number;
    buildingPerm: number;
    networkPerm: number;
    beautyPerm: number;
    securityPerm: number;

    userPerm: number;
    vocPerm: number;
  }) {
    this.id = id;
    this.name = name;
    this.account = account;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.permission = permission;
    this.basicPerm = basicPerm;
    this.machinePerm = machinePerm;
    this.electricPerm = electricPerm;
    this.firePerm = firePerm;
    this.buildingPerm = buildingPerm;
    this.networkPerm = networkPerm;
    this.beautyPerm = beautyPerm;
    this.securityPerm = securityPerm;
    this.userPerm = userPerm;
    this.vocPerm = vocPerm;
  }
}
