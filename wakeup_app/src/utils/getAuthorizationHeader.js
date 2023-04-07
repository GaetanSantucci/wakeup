import Cookies from "js-cookie";

// function to set JWT Token in bearer
export function getAuthorizationHeader() {

  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  return {
    Authorization: `Bearer ${accessToken || refreshToken || ""}`,
  };
}