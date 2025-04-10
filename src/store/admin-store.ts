import { DepartmentAdmin } from "@/dtos/admin/department-admin.dto";
import { DepartmentType } from "@/types/(admin)/department";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AdminState {
  //관리자 데이터
  departmentAdmins: DepartmentAdmin[];
  //부서목록
  departmentList: DepartmentType[];
  //선택 부서의 관리자목록
  adminsByDepartment: DepartmentAdmin[];
  //선택부서
  selectedDepartment: DepartmentType | null;
  //관리자 초기값 세팅(임의값)
  setDepartmentAdmins: (datas: DepartmentAdmin[]) => void;
  //관리자 부서 초기값 세팅(임의)
  setDepartments: (datas: DepartmentType[]) => void;
  //부서별 관리자 조회 - 클릭이벤트
  setAdminsByDepartment: (dept: DepartmentType) => void;
}

export const useAdminStore = create<AdminState>()(
  devtools(
    persist<AdminState>(
      (set, get) => ({
        departmentAdmins: [],
        departmentList: [],
        adminsByDepartment: [],
        selectedDepartment: null,
        setDepartmentAdmins: (datas) => {
          set({ departmentAdmins: datas });
        },
        setDepartments: (datas) => {
          set({ departmentList: datas });
        },
        setAdminsByDepartment: (dept) => {
          const admins = get().departmentAdmins;

          const departmentAdmins = admins.filter(
            (a) => a.department.name === dept.name
          );
          //부서 선택
          set({ selectedDepartment: dept });
          //부서 관리자 set
          set({ adminsByDepartment: departmentAdmins });
        },
      }),
      { name: "admin-store" }
    )
  )
);
