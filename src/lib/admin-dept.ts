import { Department } from "@/types/department";

export const convertDeptNameToRecord = (depts: Department[]) => {
  console.log(depts);
  const record: Record<string, string> = {};
  depts.map((d) => (record[d.name] = d.name));

  return record;
};
