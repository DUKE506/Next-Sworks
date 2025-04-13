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
  contractNum: string;
  address: string;
  tel: string;
  contractedAt: Date;
  expiredAt: Date;
  state: "계약" | "해약";

  constructor({
    id,
    contractNum,
    address,
    tel,
    contractedAt,
    expiredAt,
    state,
  }: {
    id: number;
    contractNum: string;
    address: string;
    tel: string;
    contractedAt: Date;
    expiredAt: Date;
    state: "계약" | "해약";
  }) {
    (this.id = id),
      (this.contractNum = contractNum),
      (this.address = address),
      (this.tel = tel),
      (this.contractedAt = contractedAt),
      (this.expiredAt = expiredAt),
      (this.state = state);
  }
}
