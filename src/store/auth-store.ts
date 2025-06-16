import api from "@/middleware/api-manager";
import { User } from "@/types/(user)/user/user";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  profile: User | null;
  accessToken: string;
  setAccessToken: (token: string) => void;
  currentWorkplace: number;
  logout: () => void;
  postUserLogin: (
    data: Record<string, string>,
    type: boolean
  ) => Promise<Record<string, any>>;
  postSelectAdminWorkplace: (workplaceId: number) => Promise<void>;
  postAdminLogin: (
    data: Record<string, string>,
    type: boolean
  ) => Promise<boolean>;
  setProfile: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist<AuthState>(
      (set, get) => ({
        profile: null,
        accessToken: "",
        currentWorkplace: 0,
        setAccessToken: (token) => {
          set({ accessToken: token });
        },
        logout: () => {
          set({ accessToken: "" });
        },
        postUserLogin: async (data, type) => {
          const { setAccessToken } = get();

          const res = await fetch(`/api/auth/admin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ ...data }),
          });

          const { user, accessToken } = await res.json();

          set({ profile: user });

          console.log(accessToken);
          setAccessToken(accessToken);

          //일반 사용자
          if (user.permission === "USER") {
            set({ currentWorkplace: user.workplace.id });
            set({ profile: user });
          }

          return { success: res.ok, data: user };
        },
        postSelectAdminWorkplace: async (workplaceId: number) => {
          const res = await fetch(`/api/auth/user/select/workplace`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ workplaceId: workplaceId }),
          });
        },
        postAdminLogin: async (data, type) => {
          const { setAccessToken } = get();

          const res = await fetch(`/api/auth/admin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ ...data }),
          });

          const { user, accessToken } = await res.json();

          set({ profile: user });

          setAccessToken(accessToken);

          return res.ok;
        },
        setProfile: () => {
          set({ profile: null });
        },
      }),
      {
        name: "auth-store",
      }
    )
  )
);
