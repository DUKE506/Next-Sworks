export class Schedule {
  id: string;
  title: string;
  startDt: Date;
  endDt: Date;
  color: string;

  constructor({
    id,
    title,
    startDt,
    endDt,
    color,
  }: {
    id: string;
    title: string;
    startDt: Date;
    endDt: Date;
    color: string;
  }) {
    this.id = id;
    this.title = title;
    this.startDt = startDt;
    this.endDt = endDt;
    this.color = color;
  }
}
