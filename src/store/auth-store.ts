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
  postSelectAdminWorkplace: (
    workplaceId: number
  ) => Promise<Record<string, any>>;
  postAdminLogin: (
    data: Record<string, string>,
    type: boolean
  ) => Promise<boolean>;
  resetProfile: () => void;
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

          setAccessToken(accessToken);

          //일반 사용자
          if (user.permission === "USER") {
            console.log("일반 사용자 로그인 본인 사업장 : ", user.workplace.id);
            set({ currentWorkplace: user.workplace.id });
            set({ profile: user });
          }

          return { success: res.ok, data: user };
        },
        postSelectAdminWorkplace: async (workplaceId: number) => {
          const { accessToken: storedAccessToken, setAccessToken } = get();
          const res = await fetch(`/api/auth/user/select/workplace`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedAccessToken}`,
            },

            body: JSON.stringify({ workplaceId: workplaceId }),
          });
          const { user, accessToken, refreshToken } = await res.json();
          set({ profile: user });
          console.log("관리자가 선택한 사업장 : ", workplaceId);
          set({ currentWorkplace: workplaceId });
          setAccessToken(accessToken);

          return { success: res.ok, data: user };
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
        resetProfile: () => {
          set({ profile: null });
        },
      }),
      {
        name: "auth-store",
      }
    )
  )
);
