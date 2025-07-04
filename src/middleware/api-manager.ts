import { useAuthStore } from "@/store/auth-store";
import ky from "ky";

const getAccessToken = () => useAuthStore.getState().accessToken;

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = getAccessToken();

        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
  },
});

export default api;
