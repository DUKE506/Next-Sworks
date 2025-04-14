import { z } from "zod";

export class Department {
  id: number;
  name: string;

  constructor({ id, name }: { id: number; name: string }) {
    this.id = id;
    this.name = name;
  }
}

export const DepartmentSchema = z.object({
  id: z.number(),
  name: z.string().min(2, { message: "2글자 이상으로 입력해주세요." }),
});
