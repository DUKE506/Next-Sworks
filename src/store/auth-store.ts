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

          const res = await api.post(`auth/login`, {
            json: data,
          });

          if (!res.ok) return { success: res.ok };

          const { access_token, place_id, user } = (await res.json()) as any;
          setAccessToken(access_token);
          set({ currentWorkplace: place_id });
          set({ profile: user });

          return { success: res.ok, data: place_id };
        },
        postAdminLogin: async (data, type) => {
          const { setAccessToken } = get();

          const res = await fetch(`/api/auth/admin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data }),
          });

          const { user, accessToken } = await res.json();

          set({ profile: user });

          // const res = await api.post(`auth/login`, {
          //   json: data,
          // });

          // if (!res.ok) return res.ok;

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
