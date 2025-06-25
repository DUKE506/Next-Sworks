export class CreateSchedule {
  title?: string;
  startDt?: Date;
  endDt?: Date;
  color?: string;

  constructor({
    title,
    startDt,
    endDt,
    color,
  }: {
    title?: string;
    startDt?: Date;
    endDt?: Date;
    color?: string;
  }) {
    this.title = title;
    this.startDt = startDt;
    this.endDt = endDt;
    this.color = color;
  }
}
