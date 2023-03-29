import { AuthService } from "../services/auth.services";
import Cookies from "js-cookie";

const auth = new AuthService();

export const useLogin = () => {
  const login = async (username, password) => {
    const user = await auth.login(username, password);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user;
  };

  return { login };
};