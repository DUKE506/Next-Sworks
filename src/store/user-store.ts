import api from "@/middleware/api-manager";
import { CreateUser } from "@/types/(user)/user/create-user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useAuthStore } from "./auth-store";
import { User } from "@/types/(user)/user/user";
import { UserPermission } from "@/types/(admin)/permission/user-permission";

interface UserState {
  createUser: CreateUser;
  allUser: User[];
  allWorkerPermission: UserPermission[];
  setCreateUser: (data: Record<string, any>) => void;
  setInitialCreateUser: () => void;
  postCreateUser: () => Promise<boolean>;
  getAllUser: () => Promise<boolean>;
  getAllWorkerPermission: () => Promise<boolean>;
}

const initialUser = {
  name: "",
  account: "",
  password: "",
  email: "",
  phone: "",
  permissionId: 0,
};

export const useUserStore = create<UserState>()(
  devtools(
    persist<UserState>(
      (set, get) => ({
        createUser: initialUser,
        allUser: [],
        allWorkerPermission: [],
        setCreateUser: (data) => {
          set((state) => ({ createUser: { ...state.createUser, ...data } }));
        },
        setInitialCreateUser: () => [
          set({
            createUser: initialUser,
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
        getAllWorkerPermission: async () => {
          const { currentWorkplace } = useAuthStore.getState();

          const res = await api.get(`perm/all/${currentWorkplace}`);

          if (!res.ok) return res.ok;
          console.log(await res.json());

          return res.ok;
        },
      }),
      { name: "user-store" }
    )
  )
);
