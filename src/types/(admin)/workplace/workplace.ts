import { Admin } from "@/dtos/admin/department-admin.dto";

/**
 * 사업장명
 * 계약번호
 * 주소
 * 연락처
 * 계약일자
 * 해약일자
 * 상태 - 계약 | 해지지
 */
export class Workplace {
  id: number;
  name: string;
  contractNum: string;
  address: string;
  tel: string;
  contractedAt: Date;
  expiredAt: Date;
  state: "계약" | "해약";
  permMachine: boolean;
  permElectronic: boolean;
  permLift: boolean;
  permFire: boolean;
  permConstruct: boolean;
  permNetwork: boolean;
  permBeauty: boolean;
  permSecurity: boolean;
  permVoc: boolean;
  workplaceAdmins: Admin[];

  constructor({
    id,
    name,
    contractNum,
    address,
    tel,
    contractedAt,
    expiredAt,
    state,
    permMachine,
    permElectronic,
    permLift,
    permFire,
    permConstruct,
    permNetwork,
    permBeauty,
    permSecurity,
    permVoc,
    workplaceAdmins,
  }: {
    id: number;
    name: string;
    contractNum: string;
    address: string;
    tel: string;
    contractedAt: Date;
    expiredAt: Date;
    state: "계약" | "해약";
    permMachine: boolean;
    permElectronic: boolean;
    permLift: boolean;
    permFire: boolean;
    permConstruct: boolean;
    permNetwork: boolean;
    permBeauty: boolean;
    permSecurity: boolean;
    permVoc: boolean;
    workplaceAdmins: Admin[];
  }) {
    (this.id = id),
      (this.name = name),
      (this.contractNum = contractNum),
      (this.address = address),
      (this.tel = tel),
      (this.contractedAt = contractedAt),
      (this.expiredAt = expiredAt),
      (this.state = state);
    this.permMachine = permMachine;
    this.permElectronic = permElectronic;
    this.permLift = permLift;
    this.permFire = permFire;
    this.permConstruct = permConstruct;
    this.permNetwork = permNetwork;
    this.permBeauty = permBeauty;
    this.permSecurity = permSecurity;
    this.permVoc = permVoc;
    this.workplaceAdmins = workplaceAdmins;
  }
}
