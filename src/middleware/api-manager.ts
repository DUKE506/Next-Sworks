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
        console.log(accessToken);
        if (accessToken) {
          request.headers.set("Authorization", `bearer ${accessToken}`);
        }
      },
    ],
  },
});

export default api;
