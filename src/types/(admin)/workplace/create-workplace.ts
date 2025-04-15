/**
 * 사업장명
 * 계약번호
 * 주소
 * 연락처
 * 계약일자
 * 해약일자
 *
 * (추후) 상태 - 계약 | 해지지
 * (추후) 권한
 */
export class CreateWorkplace {
  contractNum: string;
  address: string;
  tel: string;
  contractedAt: Date;
  expiredAt: Date;
  permMachine: boolean;
  permElectronic: boolean;
  permLift: boolean;
  permFire: boolean;
  permConstruct: boolean;
  permNetwork: boolean;
  permBeauty: boolean;
  permSecurity: boolean;
  permVoc: boolean;
  // state: "계약" | "해약";

  constructor({
    contractNum,
    address,
    tel,
    contractedAt,
    expiredAt,
    permMachine,
    permElectronic,
    permLift,
    permFire,
    permConstruct,
    permNetwork,
    permBeauty,
    permSecurity,
    permVoc,
  }: //   state,
  {
    contractNum: string;
    address: string;
    tel: string;
    contractedAt: Date;
    expiredAt: Date;
    permMachine: boolean;
    permElectronic: boolean;
    permLift: boolean;
    permFire: boolean;
    permConstruct: boolean;
    permNetwork: boolean;
    permBeauty: boolean;
    permSecurity: boolean;
    permVoc: boolean;
    //   state: "계약" | "해약";
  }) {
    (this.contractNum = contractNum),
      (this.address = address),
      (this.tel = tel),
      (this.contractedAt = contractedAt),
      (this.expiredAt = expiredAt);
    this.permMachine = permMachine;
    this.permElectronic = permElectronic;
    this.permLift = permLift;
    this.permFire = permFire;
    this.permConstruct = permConstruct;
    this.permNetwork = permNetwork;
    this.permBeauty = permBeauty;
    this.permSecurity = permSecurity;
    this.permVoc = permVoc;
    // (this.state = state);
  }
}
