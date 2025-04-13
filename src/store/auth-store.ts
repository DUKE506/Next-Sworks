import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  logout: () => void;
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
      }),
      {
        name: "auth-store",
      }
    )
  )
);
