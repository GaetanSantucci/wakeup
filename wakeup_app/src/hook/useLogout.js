import Cookies from "js-cookie";

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { resetUser } from '@/src/store/reducers/User';


export const useLogout = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/login");
    dispatch(resetUser());
  };

  return { logout };
};