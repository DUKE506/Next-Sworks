import api from "@/middleware/api-manager";
import { AddDepartmentDto } from "@/types/(admin)/department/add-dept.dto";
import { Department } from "@/types/department";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useAdminStore } from "./admin-store";

interface deptState {
  departments: Department[];
  selectedDept: Department | null;
  addDept: (dept: AddDepartmentDto) => Promise<void>;
  getDepts: () => Promise<void>;
  selectDept: (dept: Department | "ALL") => void;
}

export const useDeptStore = create<deptState>()(
  devtools(
    persist<deptState>(
      (set, get) => ({
        departments: [],
        selectedDept: null,
        addDept: async (dept) => {
          const res = api.post("department/add", { json: dept }).json();
          await get().getDepts();
        },
        getDepts: async () => {
          const res = await api.get("department/all").json();

          set({ departments: res as Department[] });
        },
        selectDept: (dept) => {
          const { setAdminsByDepartment } = useAdminStore.getState();

          if (dept === "ALL") {
            set({ selectedDept: null });
            setAdminsByDepartment("ALL");
            return;
          }

          set({ selectedDept: dept });
          setAdminsByDepartment(dept);
        },
      }),
      { name: "dept-store" }
    )
  )
);
