import { AuthService } from "../services/auth.services";
import Cookies from "js-cookie";

const Auth = new AuthService();

//hook to fetch user and set jwt token
export const useLogin = () => {

  const login = async (email, password) => {

    const response = await Auth.login(email, password);

    // set accessToken and refreshToken in cookie
    if (response.accessToken) {
      Cookies.set("refreshToken", response.refreshToken);
      Cookies.set("accessToken", response.accessToken);
    }
    return response;
  };

  return { login };
};