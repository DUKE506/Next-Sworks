import api from "@/middleware/api-manager";
import { CreateUser } from "@/types/(user)/user/create-user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useAuthStore } from "./auth-store";
import { User } from "@/types/(user)/user/user";

interface UserState {
  createUser: CreateUser;
  allUser: User[];
  setCreateUser: (data: Record<string, any>) => void;
  setInitialCreateUser: () => void;
  postCreateUser: () => Promise<boolean>;
  getAllUser: () => Promise<boolean>;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist<UserState>(
      (set, get) => ({
        createUser: {
          name: "",
          account: "",
          password: "",
          email: "",
          phone: "",
          basicPerm: 0,
          machinePerm: 0,
          electricPerm: 0,
          firePerm: 0,
          buildingPerm: 0,
          networkPerm: 0,
          beautyPerm: 0,
          securityPerm: 0,
          userPerm: 0,
          vocPerm: 0,
        },
        allUser: [],
        setCreateUser: (data) => {
          set((state) => ({ createUser: { ...state.createUser, ...data } }));
        },
        setInitialCreateUser: () => [
          set({
            createUser: {
              name: "",
              account: "",
              password: "",
              email: "",
              phone: "",
              basicPerm: 0,
              machinePerm: 0,
              electricPerm: 0,
              firePerm: 0,
              buildingPerm: 0,
              networkPerm: 0,
              beautyPerm: 0,
              securityPerm: 0,
              userPerm: 0,
              vocPerm: 0,
            },
          }),
        ],
        postCreateUser: async () => {
          const { currentWorkplace } = useAuthStore.getState();
          const { createUser } = get();

          const res = await api.post(`user/create/user/${currentWorkplace}`, {
            json: createUser,
          });

          return res.ok;
        },
        getAllUser: async () => {
          const { currentWorkplace } = useAuthStore.getState();

          const res = await api.get(`user/all/${currentWorkplace}`);

          if (!res.ok) return res.ok;

          set({ allUser: await res.json() });

          return res.ok;
        },
      }),
      { name: "user-store" }
    )
  )
);
