import { Admin } from "@/dtos/admin/department-admin.dto";
import api from "@/middleware/api-manager";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AdminDetailState {
  admin: Admin | null;
  selectedWorkplace: Workplace[];
  getAdmin: (id: number) => Promise<void>;
  setSelectWorkplace: (workplace: Workplace) => void;
}

export const useAdminDetailStore = create<AdminDetailState>()(
  devtools(
    persist<AdminDetailState>(
      (set, get) => ({
        admin: null,
        selectedWorkplace: [],
        getAdmin: async (id) => {
          const res = await api.get(`user/${id}`).json();
          set({ admin: res as Admin });
        },
        setSelectWorkplace: (workplace) => {
          const { selectedWorkplace } = get();
          console.log("파라미터", workplace);
          console.log("상태에 저장된 값:", selectedWorkplace);

          set((state) => {
            const curWorkplace = state.selectedWorkplace || [];

            const exist = curWorkplace.some((w) => w === workplace);

            return {
              selectedWorkplace: exist
                ? curWorkplace.filter((w) => w !== workplace)
                : [...curWorkplace, workplace],
            };
          });
        },
      }),
      { name: "adminDetail-store" }
    )
  )
);
