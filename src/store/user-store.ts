import api from "@/middleware/api-manager";
import { CreateUser } from "@/types/(user)/user/create-user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  createUser: CreateUser;
  setCreateUser: (data: Record<string, any>) => void;
  setInitialCreateUser: () => void;
  postCreateUser: () => Promise<boolean>;
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
          const { createUser } = get();
          console.log(createUser);
          const res = await api.post("user/create/user", { json: createUser });

          return res.ok;
        },
      }),
      { name: "user-store" }
    )
  )
);
