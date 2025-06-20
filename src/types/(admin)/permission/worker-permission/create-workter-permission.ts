export class CreateWorkerPermission {
  name: string;
  permission: WorkerPermissionType;
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
    name,
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
    name: string;
    permission: WorkerPermissionType;
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
    this.name = name;
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

export const AdminPermissionType = {
  운영관리자: "운영관리자",
  일반관리자: "일반관리자",
};

export type AdminPermissionType =
  (typeof AdminPermissionType)[keyof typeof AdminPermissionType];

export const WorkerPermissionType = {
  사업소장: "사업소장",
  근무자: "근무자",
};

export const WorkerPermissionSelectData = [
  {
    id: "사업소장",
    name: "사업소장",
  },
  {
    id: "근무자",
    name: "근무자",
  },
];

export type WorkerPermissionType =
  (typeof WorkerPermissionType)[keyof typeof WorkerPermissionType];
