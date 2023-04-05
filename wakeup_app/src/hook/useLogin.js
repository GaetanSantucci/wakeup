import { AuthService } from "../services/auth.services";
import Cookies from "js-cookie";

import { useDispatch } from 'react-redux';
import { userUpdate } from '../store/reducers/User';

const Auth = new AuthService();

export const useLogin = () => {

  const dispatch = useDispatch();

  const login = async (email, password) => {
    const user = await Auth.login(email, password);
    if (user) {
      //todo a faire dans le useCurrentUser, dispatche les infos utilisateur 
      dispatch(userUpdate(user));
      Cookies.set("refreshToken", user.refreshToken);
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user;
  };

  return { login };
};