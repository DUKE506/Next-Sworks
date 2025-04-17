import { Admin } from "@/dtos/admin/department-admin.dto";
import api from "@/middleware/api-manager";
import { DepartmentType } from "@/types/(admin)/department/department";
import { CreateAdmin } from "@/types/(admin)/user/create-admin";
import { Department } from "@/types/department";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useDeptStore } from "./dept-store";
import { useWorkplaceStore } from "./workplace-store";

interface AdminState {
  //관리자 데이터
  admins: Admin[];
  //선택 부서의 관리자목록
  adminsByDepartment: Admin[];
  //사업장 관리자 할당 시 선택한 관리자들
  selectedAdminsByWorkplace: Admin[];
  //관리자 초기값 세팅(임의값)
  getAdmins: () => Promise<boolean>;
  //부서별 관리자 조회 - 클릭이벤트
  setAdminsByDepartment: (dept: Department | "ALL") => void;
  //관리자 생성
  createAdmin: (admin: CreateAdmin) => Promise<boolean>;
  //사업장 관리자 추가 시 임시선택
  selectAdminsByWorkplace: (admin: Admin | "DELETE") => void;
  //사업장 관리자 추가
  postAdminsByWorkplace: (id: number) => Promise<boolean>;
}

export const useAdminStore = create<AdminState>()(
  devtools(
    persist<AdminState>(
      (set, get) => ({
        admins: [],
        adminsByDepartment: [],
        selectedAdminsByWorkplace: [],
        getAdmins: async () => {
          const { selectDept } = useDeptStore.getState();

          const res = await api.get("user/all");
          selectDept("ALL");
          if (!res.ok) return res.ok;

          set({ admins: (await res.json()) as Admin[] });
          return res.ok;
        },
        setAdminsByDepartment: (dept) => {
          const admins = get().admins;

          if (dept === "ALL") {
            set({ adminsByDepartment: admins });
            return;
          }

          const departmentAdmins = admins.filter(
            (a) => a.department.name === dept.name
          );
          //부서 관리자 set
          set({ adminsByDepartment: departmentAdmins });
        },
        createAdmin: async (admin: CreateAdmin) => {
          const res = await api.post("user/create/admin", { json: admin });
          if (!res.ok) return res.ok;

          return res.ok;
        },
        selectAdminsByWorkplace: (admin) => {
          console.log("선택");
          const { selectedAdminsByWorkplace } = get();

          if (admin === "DELETE") {
            set({ selectedAdminsByWorkplace: [] });
            return;
          }

          if (selectedAdminsByWorkplace.includes(admin)) {
            let filtered = selectedAdminsByWorkplace.filter((a) => a !== admin);
            set({ selectedAdminsByWorkplace: filtered });
            return;
          }

          set({
            selectedAdminsByWorkplace: [...selectedAdminsByWorkplace, admin],
          });
        },
        postAdminsByWorkplace: async (id) => {
          const { selectedAdminsByWorkplace } = get();
          const { getWorkplaceDetail } = useWorkplaceStore.getState();
          const res = await api.post(`workplace/${id}/add/manager`, {
            json: selectedAdminsByWorkplace,
          });

          if (!res.ok) return res.ok;

          getWorkplaceDetail(id);
          return res.ok;
        },
      }),
      { name: "admin-store" }
    )
  )
);
