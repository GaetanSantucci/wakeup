// import { useEffect } from "react";
import { AuthService } from "../services/auth.services";

import { useDispatch } from 'react-redux';
import { userUpdate } from '../store/reducers/User';


// Hook to get userProfile with jwt authentification and set user state un redux store
export const useCurrentUser = () => {

  const Auth = new AuthService();

  const dispatch = useDispatch();

  const setUser = async (id) => {
    const currentUser = await Auth.getMe(id)
    console.log('currentUser:', currentUser);
    if (currentUser) {
      dispatch(userUpdate(currentUser));

    }
    return currentUser;
  }

  return { setUser };
};