import { Admin } from "@/dtos/admin/department-admin.dto";
import api from "@/middleware/api-manager";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AdminDetailState {
  admin: Admin | null;
  selectedWorkplace: Workplace | null;
  getAdmin: (id: number) => Promise<void>;
  selectWorkplace: (workplace: Workplace[] | Workplace) => void;
}

export const useAdminDetailStore = create<AdminDetailState>()(
  devtools(
    persist<AdminDetailState>(
      (set, get) => ({
        admin: null,
        selectedWorkplace: null,
        getAdmin: async (id) => {
          const res = await api.get(`user/${id}`).json();
          set({ admin: res as Admin });
        },
        selectWorkplace: (workplace) => {
          console.log(workplace);
        },
      }),
      { name: "adminDetail-store" }
    )
  )
);
