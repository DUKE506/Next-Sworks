import api from "@/middleware/api-manager";
import { CreateVoc } from "@/types/(user)/voc/create-voc";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useAuthStore } from "./auth-store";
import { Voc } from "@/types/(user)/voc/voc";

interface VocState {
  // createVoc: CreateVoc;
  // initialCreateVoc: () => void;
  vocs: Voc[];
  postCreateVoc: (data: CreateVoc) => Promise<boolean>;
  getAllVocByWorkplaceId: (queryString?: string) => Promise<boolean>;
}

const initialVoc: CreateVoc = {
  building: undefined,
  type: undefined,
  status: "",
  complainant: "",
  title: "",
  content: "",
  phone: "",
};

export const useVocStore = create<VocState>()(
  devtools(
    persist<VocState>(
      (set, get) => ({
        // createVoc: initialVoc,
        // initialCreateVoc: () => set({ createVoc: initialVoc }),
        vocs: [],
        postCreateVoc: async (data) => {
          const res = await api.post(`voc/create/handwrite`, {
            json: { ...data },
          });

          return res.ok;
        },
        getAllVocByWorkplaceId: async (queryString) => {
          console.log(queryString);
          const { currentWorkplace } = useAuthStore.getState();

          const res = await api.get(
            `voc/all/${currentWorkplace}${queryString ? `?${queryString}` : ""}`
          );
          const result = await res.json();
          if (!res.ok) return res.ok;

          set({ vocs: result as Voc[] });
          return res.ok;
        },
      }),
      { name: "voc-store" }
    )
  )
);
