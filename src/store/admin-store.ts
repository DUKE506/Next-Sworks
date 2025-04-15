import { Admin } from "@/dtos/admin/department-admin.dto";
import api from "@/middleware/api-manager";
import { DepartmentType } from "@/types/(admin)/department/department";
import { CreateAdmin } from "@/types/(admin)/user/create-admin";
import { Department } from "@/types/department";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useDeptStore } from "./dept-store";

interface AdminState {
  //관리자 데이터
  admins: Admin[];
  //선택 부서의 관리자목록
  adminsByDepartment: Admin[];
  //관리자 초기값 세팅(임의값)
  getAdmins: () => Promise<void>;
  //부서별 관리자 조회 - 클릭이벤트
  setAdminsByDepartment: (dept: Department | "ALL") => void;
  //관리자 생성
  createAdmin: (admin: CreateAdmin) => Promise<void>;
}

export const useAdminStore = create<AdminState>()(
  devtools(
    persist<AdminState>(
      (set, get) => ({
        admins: [],
        adminsByDepartment: [],
        getAdmins: async () => {
          const { selectDept } = useDeptStore.getState();

          const res = await api.get("user/all").json();
          selectDept("ALL");
          set({ admins: res as Admin[] });
        },
        setAdminsByDepartment: (dept) => {
          const admins = get().admins;

          if (dept === "ALL") {
            set({ adminsByDepartment: admins });
            return;
          }

          console.log(admins);

          const departmentAdmins = admins.filter(
            (a) => a.department.name === dept.name
          );
          //부서 관리자 set
          set({ adminsByDepartment: departmentAdmins });
        },
        createAdmin: async (admin: CreateAdmin) => {
          const res = await api
            .post("user/create/admin", { json: admin })
            .json();
          console.log(res);
        },
      }),
      { name: "admin-store" }
    )
  )
);
