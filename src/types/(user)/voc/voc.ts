import { Building } from "../building/building";

export class Voc {
  id: number;
  building: Building;
  channel: string;
  type: string; //미분류, 기계, 전기, 승강 등등
  status: string;
  complainant: string;
  phone: string;
  contents: string;
  title: string;
  createdAt: Date;
  completedAt: Date | null;
  processTime: string | null;

  constructor({
    id,
    building,
    channel,
    type,
    status,
    complainant,
    phone,
    title,
    contents,
    createdAt,
    completedAt,
    processTime,
  }: {
    id: number;
    building: Building;
    channel: string;
    type: string; //미분류, 기계, 전기, 승강 등등
    status: string;
    complainant: string;
    phone: string;
    title: string;
    contents: string;
    createdAt: Date;
    completedAt: Date | null;
    processTime: string | null;
  }) {
    this.id = id;
    this.building = building;
    this.channel = channel;
    this.type = type;
    this.status = status;
    this.complainant = complainant;
    this.phone = phone;
    this.title = title;
    this.contents = contents;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.processTime = processTime;
  }
}

export interface SelectOption {
  id: number | string;
  name: string;
}

//민원구분
export const VocInputChannel = {
  MOBILE: "모바일",
  MANUAL: "수기입력",
};

export type VocInputChannel =
  (typeof VocInputChannel)[keyof typeof VocInputChannel];

//민원유형 = 사업장권한
export const VocType = {
  UNCATEGORIZED: "미분류",
  MACHINE: "기계",
  ELECTRIC: "전기",
  LIFT: "승강",
  FIRE: "소방",
  CONSTRUCTOR: "건축",
  NETWORK: "통신",
  BEAUTY: "미화",
  SECURITY: "보안",
};

export type VocType = (typeof VocType)[keyof typeof VocType];

export const VocTypeOptions: SelectOption[] = Object.entries(VocType).map(
  ([key, value], i) => ({
    id: i,
    name: value,
  })
);

//민원상태
export const VocStatus = {
  PENDING: "미처리",
  INPROGRESS: "처리중",
  COMPLETED: "처리완료",
};

export type VocStatus = (typeof VocStatus)[keyof typeof VocStatus];
