import { AuthService } from "../services/auth.services";
import Cookies from "js-cookie";

const Auth = new AuthService();

export const useLogin = () => {

  const login = async (email, password) => {
    const user = await Auth.login(email, password);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user;
  };

  return { login };
};