import { AuthService } from "../services/auth.services";
import Cookies from "js-cookie";

import { useSelector, useDispatch } from 'react-redux';
import { userUpdate, inputValue } from '../store/reducers/User';

const Auth = new AuthService();

export const useLogin = () => {

  const dispatch = useDispatch();

  // const { user } = useSelector((state) => state.user)

  const login = async (email, password) => {
    const user = await Auth.login(email, password);
    console.log('response user database: ', user);
    if (user) {
      dispatch(userUpdate(user));
      Cookies.set("refreshToken", user.refreshToken);
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user;
  };

  return { login };
};