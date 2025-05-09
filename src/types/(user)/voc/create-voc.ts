import { Building } from "../building/building";

export class CreateVoc {
  building: Building | null;
  type: string; //미분류, 기계, 전기, 승강 등등
  status: string;
  complainant: string;
  phone: string;
  title: string;
  content: string;

  constructor({
    building,
    type,
    status,
    complainant,
    phone,
    title,
    content,
  }: {
    building: Building;
    type: string; //미분류, 기계, 전기, 승강 등등
    status: string;
    complainant: string;
    phone: string;
    title: string;
    content: string;
  }) {
    this.building = building;
    this.type = type;
    this.status = status;
    this.complainant = complainant;
    this.phone = phone;
    this.title = title;
    this.content = content;
  }
}
