import { Admin } from "@/dtos/admin/department-admin.dto";
import api from "@/middleware/api-manager";
import { Workplace } from "@/types/(admin)/workplace/workplace";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AdminDetailState {
  admin: Admin | null;
  restWorkplace: Workplace[];
  selectedWorkplace: Workplace[];
  delSelectedWorkplaces: Workplace[];
  getAdmin: (id: number) => Promise<void>;
  getRestWorkplace: (id: number) => Promise<boolean>;
  postAddWorkplace: () => Promise<boolean>;
  putDeleteWorkplaces: () => Promise<boolean>;
  setSelectWorkplace: (workplace: Workplace[] | Workplace) => void;
  setDelSelectedWorkplaces: (workplace: Workplace[] | Workplace) => void;
  resetSelectWorkplace: () => void;
  resetDelSelectedWorkplaces: () => void;
}

export const useAdminDetailStore = create<AdminDetailState>()(
  devtools(
    persist<AdminDetailState>(
      (set, get) => ({
        admin: null,
        restWorkplace: [],
        selectedWorkplace: [],
        delSelectedWorkplaces: [],
        getAdmin: async (id) => {
          const res = await api.get(`user/${id}`).json();
          set({ admin: res as Admin });
        },
        getRestWorkplace: async (id) => {
          const res = await api.get(`workplace/${id}/rest`);

          if (!res.ok) return res.ok;

          set({ restWorkplace: await res.json() });

          return res.ok;
        },
        postAddWorkplace: async () => {
          const {
            admin,
            selectedWorkplace,
            getAdmin,
            getRestWorkplace,
            resetSelectWorkplace,
          } = get();

          if (!admin) return false;
          const res = await api.post(`workplace/${admin.id}/add`, {
            json: selectedWorkplace,
          });

          if (!res.ok) return res.ok;

          //동기화
          getAdmin(admin.id);
          getRestWorkplace(admin.id);
          resetSelectWorkplace();

          return res.ok;
        },
        putDeleteWorkplaces: async () => {
          const {
            admin,
            delSelectedWorkplaces,
            getAdmin,
            resetDelSelectedWorkplaces,
          } = get();

          if (!admin) return false;

          const res = await api.put(`workplace/${admin.id}/delete`, {
            json: delSelectedWorkplaces,
          });

          if (!res.ok) return res.ok;

          //동기화
          getAdmin(admin.id);
          resetDelSelectedWorkplaces();

          return res.ok;
        },
        setSelectWorkplace: (workplace) => {
          const { selectedWorkplace } = get();

          const isArr = Array.isArray(workplace);

          if (isArr) {
            set({ selectedWorkplace: workplace });
          } else {
            set((state) => {
              const curWorkplace = state.selectedWorkplace || [];

              const exist = curWorkplace.some((w) => w === workplace);

              return {
                selectedWorkplace: exist
                  ? curWorkplace.filter((w) => w !== workplace)
                  : [...curWorkplace, workplace],
              };
            });
          }
        },
        setDelSelectedWorkplaces: (workplace) => {
          const isArr = Array.isArray(workplace);

          if (isArr) {
            set({ delSelectedWorkplaces: workplace });
          } else {
            set((state) => {
              const curWorkplace = state.selectedWorkplace || [];

              const exist = curWorkplace.some((w) => w === workplace);

              return {
                delSelectedWorkplaces: exist
                  ? curWorkplace.filter((w) => w !== workplace)
                  : [...curWorkplace, workplace],
              };
            });
          }
        },
        resetSelectWorkplace: () => {
          set({ selectedWorkplace: [] });
        },
        resetDelSelectedWorkplaces: () => {
          set({ delSelectedWorkplaces: [] });
        },
      }),
      { name: "adminDetail-store" }
    )
  )
);
