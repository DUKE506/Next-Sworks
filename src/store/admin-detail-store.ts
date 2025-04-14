import { Admin } from "@/dtos/admin/department-admin.dto";
import api from "@/middleware/api-manager";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AdminDetailState {
  admin: Admin | null;
  getAdmin: (id: number) => Promise<void>;
}

export const useAdminDetailStore = create<AdminDetailState>()(
  devtools(
    persist<AdminDetailState>(
      (set, get) => ({
        admin: null,
        getAdmin: async (id) => {
          const res = await api.get(`user/id/${id}`).json();
          set({ admin: res as Admin });
          console.log(res);
        },
      }),
      { name: "adminDetail-store" }
    )
  )
);
