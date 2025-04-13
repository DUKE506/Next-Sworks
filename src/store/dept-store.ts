import api from "@/middleware/api-manager";
import { AddDepartmentDto } from "@/types/(admin)/department/add-dept.dto";
import { Department } from "@/types/department";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface deptState {
  departments: Department[];
  addDept: (dept: AddDepartmentDto) => Promise<void>;
}

export const useDeptStore = create<deptState>()(
  devtools(
    persist<deptState>(
      (set, get) => ({
        departments: [],
        addDept: async (dept) => {
          const res = api.post("department/add", { json: dept }).json();

          console.log(res);
        },
      }),
      { name: "dept-store" }
    )
  )
);
