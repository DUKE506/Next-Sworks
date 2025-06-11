import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WorkplaceFilterState {
  status: string[];
  search: string;
  page: string;
  pageSize: string;
  setStatus: (status: string[]) => void;
  setSearch: (search: string) => void;
  setPage: (page: string) => void;
  setPageSize: (pageSize: string) => void;
  resetFilter: () => void;
}

export const useWorkplaceFilterStore = create<WorkplaceFilterState>()(
  devtools(
    persist<WorkplaceFilterState>(
      (set, get) => ({
        status: ["계약", "해약"],
        search: "",
        page: "1",
        pageSize: "20",
        setStatus: (status) => {
          set({ status: status });
        },
        setSearch: (search) => {
          set({ search: search });
        },
        setPage: (page) => {
          set({ page: page });
        },
        setPageSize: (pageSize) => {
          set({ pageSize: pageSize });
        },
        resetFilter: () =>
          set({
            status: [],
            search: "",
            page: "1",
            pageSize: "20",
          }),
      }),
      {
        name: "workplace-filter-store",
      }
    )
  )
);
