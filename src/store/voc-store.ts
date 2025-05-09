import { CreateVoc } from "@/types/(user)/voc/create-voc";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface VocState {
  createVoc: CreateVoc;
  initialCreateVoc: () => void;
}

export const useVocStore = create<VocState>()(
  devtools(
    persist<VocState>(
      (set, get) => ({
        createVoc: {
          building: null,
          type: "",
          status: "",
          complainant: "",
          title: "",
          content: "",
          phone: "",
        },
        initialCreateVoc: () => {
          set({
            createVoc: {
              building: null,
              type: "",
              status: "",
              complainant: "",
              title: "",
              content: "",
              phone: "",
            },
          });
        },
      }),
      { name: "voc-store" }
    )
  )
);
