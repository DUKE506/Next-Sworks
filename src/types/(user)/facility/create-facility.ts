import { Room } from "../room/room";

export class CreateFacility {
  category: string;
  name: string;
  type: string;
  room: number;
  standard: string;
  count: number;
  life: string;
  setDt: Date;
  changeDt: Date;

  constructor({
    category,
    name,
    type,
    room,
    standard,
    count,
    life,
    setDt,
    changeDt,
  }: {
    category: string;
    name: string;
    type: string;
    room: number;
    standard: string;
    count: number;
    life: string;
    setDt: Date;
    changeDt: Date;
  }) {
    (this.category = category),
      (this.name = name),
      (this.type = type),
      (this.room = room),
      (this.standard = standard),
      (this.count = count),
      (this.life = life),
      (this.setDt = setDt),
      (this.changeDt = changeDt);
  }
}
