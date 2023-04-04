'use client';
import './profile.scss'

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';

import { ProfileModale } from '@/src/components';

import { toggleProfileModale } from '@/src/store/reducers/Settings';

const UserProfile = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.user);

  // Read the 'userData' cookie value
  const userData = Cookies.get('currentUser');

  const currentUser = userData ? JSON.parse(userData) : null;

  if (!currentUser) {
    push('/login')
    return null;
  }

  const handleInputChange = () => {
    dispatch(toggleProfileModale());
  }

  const pseudo = () => {
    const lastname = user?.lastname;
    const firstname = user?.firstname;

    const firstnameLetter = firstname.charAt(0);
    const lastnameLetter = lastname.charAt(0);

    const result = `${lastnameLetter}${firstnameLetter}`.toUpperCase();
    return result
  }

  const test = pseudo();


  return (
    <>
      <h3>Bienvenu sur votre page membre</h3>
      <div className='container'>
        <ProfileModale />
        <div className='profile_card'>
          <div className='profile_card_avatar' >
            {user.lastname && user.firstname ? <h2> {pseudo()} </h2> : <AccountCircleIcon className='avatar_logo' />}
            <SettingsIcon className='settings' onClick={handleInputChange} />
          </div>
          <div className='profile_card_details'>
            <div className='profile_card_input'>
              <p>Email : <span>{user.email}</span></p>
            </div>
            <div className='profile_card_input'>
              <p>Nom : <span>{user.lastname}</span></p>
            </div>
            <div className='profile_card_input'>
              <p>Prénom : <span>{user.firstname}</span></p>
            </div>

            {user.address !== undefined && (
              <>
                <div className='profile_card_input'>
                  <p>Adresse : {user?.address?.label}</p>
                </div>
                <div className='profile_card_input'>
                  <p>Complement : {user?.address?.complement}</p>
                </div>
                <div className='profile_card_input'>
                  <p>Code postal : <span>{user?.address?.zipcode}</span></p>
                  <p><span>Ville : {user?.address?.city}</span></p>
                </div>
              </>
            )}
            {/* <div className='profile_card_input'>
              <p>{currentUser?.address?.city}</p>
            </div> */}
          </div>
          <div className='profile_card_input'>
            <p>{currentUser?.phone}</p>
          </div>
        </div>
        <div className='booking_card'>
          <div className='next_book'>
            <div className='all_orders_card'>
              <div>Plateau Sunshine<div className='all_orders_card_details'><p>qté: 2</p><span>33,40 €</span></div><div><p>29-03-2023</p></div></div>
            </div>
          </div>
          <div className='all_orders'>
            <div className='all_orders_card'>
              <div>Plateau Sunshine<div className='all_orders_card_details'><p>qté: 2</p><span>66,80 €</span></div><div><p>14-01-2023</p></div></div>
            </div>
            <div className='all_orders_card'>
              <div>Plateau Best-Seller<div className='all_orders_card_details'><p>qté: 2</p><span>46,40 €</span></div><div><p>04-12-2022</p></div></div>
            </div>
            <div className='all_orders_card'>
              <div>Plateau  Dolce Vita<div className='all_orders_card_details'><p>qté: 2</p><span>53,40 €</span></div><div><p>28-11-2022</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile;