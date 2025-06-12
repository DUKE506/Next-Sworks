import { Admin } from "@/dtos/admin/department-admin.dto";
import api from "@/middleware/api-manager";
import { DepartmentType } from "@/types/(admin)/department/department";
import { CreateAdmin } from "@/types/(admin)/user/create-admin";
import { Department } from "@/types/department";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useDeptStore } from "./dept-store";
import { useWorkplaceStore } from "./workplace-store";
import {
  ListBaseType,
  ListLoading,
  ListMeta,
  ListModel,
} from "@/types/list-type";

interface AdminState {
  //관리자 데이터
  admins: ListBaseType;
  //사업장 관리자 할당 시 선택한 관리자들
  selectedAdminsByWorkplace: Admin[];

  createAdmin: CreateAdmin;

  //관리자 초기값 세팅(임의값)
  getAdmins: (params: string) => Promise<boolean>;

  //관리자 생성
  setCreateAdmin: (admin: Record<string, any>) => void;

  postCreateAdmin: () => Promise<boolean>;

  //관리자 생성 초기화
  resetCreateAdmin: () => void;

  //사업장 관리자 추가 시 임시선택
  selectAdminsByWorkplace: (admin: Admin | "DELETE") => void;
  //사업장 관리자 추가
  postAdminsByWorkplace: (id: number) => Promise<boolean>;

  //===============아래 삭제===============

  //선택 부서의 관리자목록
  adminsByDepartment: Admin[];
  //부서별 관리자 조회 - 클릭이벤트
  setAdminsByDepartment: (dept: Department | "ALL") => void;
}

const initialCreateAdmin: CreateAdmin = {
  account: "",
  password: "",
  name: "",
  email: "",
  phone: "",
  permission: "MANAGER",
};

export const useAdminStore = create<AdminState>()(
  devtools(
    persist<AdminState>(
      (set, get) => ({
        admins: ListLoading,
        adminsByDepartment: [],
        selectedAdminsByWorkplace: [],
        createAdmin: initialCreateAdmin,
        getAdmins: async (params) => {
          const res = await api.get("user/admin/all", {
            searchParams: params,
          });

          if (!res.ok) return res.ok;

          const data = (await res.json()) as ListModel<Admin>;

          set({ admins: data });

          return res.ok;
        },
        setAdminsByDepartment: (dept) => {
          // const admins = get().admins;
          // if (dept === "ALL") {
          //   set({ adminsByDepartment: admins });
          //   return;
          // }
          // const departmentAdmins = admins.filter(
          //   (a) => a.department.name === dept.name
          // );
          // //부서 관리자 set
          // set({ adminsByDepartment: departmentAdmins });
        },
        setCreateAdmin: async (admin) => {
          set((state) => ({
            createAdmin: { ...state.createAdmin, ...admin },
          }));
        },
        postCreateAdmin: async () => {
          const { createAdmin } = get();
          const res = await api.post("user/create/admin", {
            json: createAdmin,
          });
          if (!res.ok) return res.ok;

          return res.ok;
        },
        resetCreateAdmin: () => {
          set({ createAdmin: initialCreateAdmin });
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
