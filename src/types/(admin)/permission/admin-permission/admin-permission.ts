import { AdminPermissionType } from "./create-admin-permission";

export class AdminPermission {
  id: number;
  name: string;
  permission: string;
  basicPerm: number;
  machinePerm: number;
  electricPerm: number;
  liftPerm: number;
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
    permission,
    basicPerm,
    machinePerm,
    electricPerm,
    liftPerm,
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
    permission: string;
    basicPerm: number;
    machinePerm: number;
    electricPerm: number;
    liftPerm: number;
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
    this.permission = permission;
    this.basicPerm = basicPerm;
    this.machinePerm = machinePerm;
    this.electricPerm = electricPerm;
    this.liftPerm = liftPerm;
    this.firePerm = firePerm;
    this.buildingPerm = buildingPerm;
    this.networkPerm = networkPerm;
    this.beautyPerm = beautyPerm;
    this.securityPerm = securityPerm;
    this.userPerm = userPerm;
    this.vocPerm = vocPerm;
  }
}
