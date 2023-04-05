import { useEffect } from "react";
import Cookies from "js-cookie";
import { AuthService } from "../services/auth.services";

import { useDispatch, useSelector } from 'react-redux';
import { userUpdate } from '../store/reducers/User';

//? je recupere les infos set dans le cookie, j utilise la fonction getUser pour fetch et valider a vec le token le user database

export const useCurrentUser = () => {

  const { user } = useSelector((state) => state.user)
  console.log('user dans le hook useCurrent: ', user);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    // const newUser = JSON.parse(currentUser)
    // console.log('newUser: ', newUser);
    // console.log('currentUser dans le hook useCurrent: ', currentUser);
    if (currentUser) {
      dispatch(userUpdate(JSON.parse(currentUser)));
    }
  }, []);

  const refetchUser = async (userId) => {
    const userInfo = await AuthService.getUser(userId);
    console.log('userInfo: ', userInfo);
    const currentUser = Cookies.get("currentUser");
    console.log('currentUser: ', currentUser);

    const test = userInfo && currentUser
    console.log('test: ', test);
    // if (userInfo && currentUser) {
    //   const newUser = {
    //     ...JSON.parse(currentUser)
    //   };
    //   Cookies.set("currentUser", JSON.stringify(newUser));
    //   dispatch(userUpdate(newUser));
    // }
  };

  return { refetchUser };
};