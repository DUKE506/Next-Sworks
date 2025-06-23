import { CreateWorkerPermission } from "@/types/(admin)/permission/admin-permission/create-admin-permission";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useWorkplaceStore } from "../workplace-store";
import api from "@/middleware/api-manager";
import { WorkerPermission } from "@/types/(admin)/permission/worker-permission/worker-permission";

interface WorkerPermissionState {
  allWorkerPermission: WorkerPermission[];
  getWorkerPermission: () => Promise<boolean>;
  postCreateWorkerPermission: (
    perm: CreateWorkerPermission
  ) => Promise<boolean>;
  deleteWorkerPermission: (id: number) => Promise<boolean>;
}

export const useWorkerPermissionStore = create<WorkerPermissionState>()(
  devtools(
    persist<WorkerPermissionState>(
      (set, get) => ({
        allWorkerPermission: [],
        getWorkerPermission: async () => {
          const { workplaceDetail } = useWorkplaceStore.getState();

          if (!workplaceDetail) return false;

          const res = await api.get(`perm/all/${workplaceDetail.id}`);

          const resData = await res.json();

          set({ allWorkerPermission: resData as WorkerPermission[] });

          return res.ok;
        },
        postCreateWorkerPermission: async (perm) => {
          const { getWorkerPermission } = get();
          const { workplaceDetail } = useWorkplaceStore.getState();

          if (!workplaceDetail) return false;

          const res = await api.post(`perm/create/${workplaceDetail.id}`, {
            json: { ...perm },
          });

          getWorkerPermission();

          return res.ok;
        },
        deleteWorkerPermission: async (id) => {
          const { getWorkerPermission } = get();

          const res = await api.delete(`perm/delete/${id}`);
          getWorkerPermission();
          return res.ok;
        },
      }),
      {
        name: "worker-permission-store",
      }
    )
  )
);
