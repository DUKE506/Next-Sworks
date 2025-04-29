import api from "@/middleware/api-manager";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  logout: () => void;
  postUserLogin: (
    data: Record<string, string>,
    type: boolean
  ) => Promise<Record<string, any>>;
  postAdminLogin: (
    data: Record<string, string>,
    type: boolean
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist<AuthState>(
      (set, get) => ({
        accessToken: "",
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

          const { access_token, place_id } = (await res.json()) as any;
          setAccessToken(access_token);
          return { success: res.ok, data: place_id };
        },
        postAdminLogin: async (data, type) => {
          const { setAccessToken } = get();

          const res = await api.post(`auth/login`, {
            json: data,
          });

          if (!res.ok) return res.ok;

          const { access_token } = (await res.json()) as any;
          setAccessToken(access_token);
          return res.ok;
        },
      }),
      {
        name: "auth-store",
      }
    )
  )
);
