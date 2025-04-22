import { ListBaseType, ListLoading, ListModel } from "@/types/list-type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "@/middleware/api-manager";

import { Workplace } from "@/types/(admin)/workplace/workplace";
import { CreateWorkplace } from "@/types/(admin)/workplace/create-workplace";
import { EditPerm } from "@/types/(admin)/workplace/edit-perm";

interface WorkplaceState {
  workplaces: ListBaseType;
  workplaceDetail: Workplace | null;
  selectedWorkplace: Workplace | null;
  getWorkplaces: () => Promise<boolean>;
  getWorkplaceDetail: (id: number) => Promise<boolean>;
  createWorkplace: (workplace: CreateWorkplace) => Promise<void>;
  selectWorkplace: (workplace: Workplace | null) => void;
  patchEditPerm: (workplacePerm: EditPerm) => Promise<boolean>;
}

export const useWorkplaceStore = create<WorkplaceState>()(
  devtools(
    persist<WorkplaceState>(
      (set, get) => ({
        workplaces: ListLoading,
        workplaceDetail: null,
        selectedWorkplace: null,
        getWorkplaces: async () => {
          const res = await api.get("workplace/all", {
            searchParams: {
              page: 1,
              pageSize: 20,
            },
          });

          if (res.ok) {
            set({ workplaces: (await res.json()) as ListModel<Workplace> });
            return res.ok;
          }

          return res.ok;
        },
        getWorkplaceDetail: async (id) => {
          const res = await api.get(`workplace/${id}`);
          if (res.ok) {
            set({ workplaceDetail: (await res.json()) as Workplace });
            return res.ok;
          }
          return res.ok;
        },
        createWorkplace: async (workplace) => {
          const res = await api
            .post("workplace/create", { json: workplace })
            .json();
          console.log(res);
        },
        selectWorkplace: (workplace) => {
          set({ selectedWorkplace: workplace });
        },
        patchEditPerm: async (workplacePerm): Promise<boolean> => {
          const { workplaceDetail, getWorkplaceDetail } = get();
          if (!workplaceDetail) {
            return false;
          }

          const res = await api.patch(
            `workplace/${workplaceDetail.id}/edit/perm`,
            {
              json: workplacePerm,
            }
          );

          if (!res.ok) {
            return false;
          }
          await getWorkplaceDetail(workplaceDetail.id);
          return res.ok;
        },
      }),
      { name: "workplace-store" }
    )
  )
);
