import Cookies from "js-cookie";

/**
 * 클라이언트 토큰 삭제
 */

export const removeClientAuthToken = () => {
  Cookies.remove("access-token");
  Cookies.remove("refresh-token");
};

export const getClientAccessToken = () => {
  const accessToken = Cookies.get("access-token");

  console.log("===액세스 토큰===");
  console.log(accessToken);
  return accessToken;
};
