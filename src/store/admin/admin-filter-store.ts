import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AdminFilterState {
  filterAdminDept: string[];
  filterAdminPerm: string[];
  filterAdminSearch: string;
  page: string;
  pageSize: string;
  setFilterAdminDept: (dept: string[]) => void;
  setFilterAdminPerm: (perm: string[]) => void;
  setFilterAdminSearch: (search: string) => void;
  setPage: (page: string) => void;
  setPageSize: (pageSize: string) => void;
  resetFilter: () => void;
}

export const useAdminFilterStore = create<AdminFilterState>()(
  devtools(
    persist<AdminFilterState>(
      (set, get) => ({
        filterAdminDept: [],
        filterAdminPerm: ["MANAGER", "NORMAL"],
        filterAdminSearch: "",
        page: "1",
        pageSize: "20",

        setFilterAdminDept: (dept) => {
          set({ filterAdminDept: dept });
        },
        setFilterAdminPerm: (perm) => {
          set({ filterAdminPerm: perm });
        },
        setFilterAdminSearch: (search) => {
          set({ filterAdminSearch: search });
          set({ page: "1" });
        },
        setPage: (page) => {
          set({ page: page });
        },
        setPageSize: (pageSize) => {
          set({ pageSize: pageSize });
          set({ page: "1" });
        },
        resetFilter: () => {
          set({
            filterAdminDept: [],
            filterAdminPerm: ["MANAGER", "NORMAL"],
            filterAdminSearch: "",
            page: "1",
            pageSize: "20",
          });
        },
      }),
      {
        name: "admin-filter-store",
      }
    )
  )
);
