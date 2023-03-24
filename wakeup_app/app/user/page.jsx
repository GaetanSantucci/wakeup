'use client';
import { UserLogin, UserRegister } from '@/components/Form';
import { ScrollToTop } from '@/components';
// import { useSelector } from 'react-redux';

export default function userConnection() {

  // const isRegister = useSelector(state => state.settings.userRegister)
  return (
    <>
      <ScrollToTop />
      {/* {
        isRegister ? <UserRegister /> : <UserLogin />
      } */}
      <UserLogin />
    </>
  )
}