'use client';
import './profile.scss'

import Cookies from 'js-cookie';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import SettingsIcon from '@mui/icons-material/Settings';

import { ProfileModale } from '@/src/components';

import { toggleProfileModale } from '@/src/store/reducers/Settings';

import Pseudo from '@/src/utils/pseudoProfilePage';

import { useLogout } from '@/src/hook/useLogout';
import { useEffect } from 'react';

const UserProfile = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { logout } = useLogout();

  const { isLogged, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isLogged) {
      push('/login')
      // return null;
    }
  })

  const handleInputChange = () => {
    dispatch(toggleProfileModale());
  }

  const userLogout = () => {
    logout();
  }

  return (
    <>
      <h3 style={{ marginTop: '3rem', marginBottom: '3rem' }}>Bienvenu sur votre page membre</h3>
      <div className='container'>
        <ProfileModale />
        <div className='profile_card'>
          <div className='profile_card_avatar' >
            {user.lastname && user.firstname ? <h2> {<Pseudo user={user} />} </h2> : <AccountCircleIcon className='avatar_logo' />}
            <SettingsIcon className='settings' onClick={handleInputChange} />
          </div>
          <div className='profile_card_details'>
            <div className='profile_card_contact'>
              <div className='profile_card_input'>
                <p>Email : <span>{user.email}</span></p>
              </div>
              <div className='profile_card_input'>
                <p>Télephone : {user.phone}</p>
              </div>
            </div>
            <div className='profile_card_name'>
              <div className='profile_card_input'>
                <p>Nom : <span>{user.lastname}</span></p>
              </div>
              <div className='profile_card_input'>
                <p>Prénom : <span>{user.firstname}</span></p>
              </div>
            </div>
            {user.address !== undefined && (
              <div className='profile_card_address'>
                <div className='profile_card_input'>
                  <p>Adresse : {user.address.name}</p>
                </div>
                {
                  user.address.complement && <div className='profile_card_input'>
                    <p>Complement : {user.address.complement}</p>
                  </div>
                }

                <div className='profile_card_input'>
                  <p>Code postal : <span>{user.address.postcode}</span></p>
                  <p><span>Ville : {user.address.city}</span></p>
                </div>
              </div>
            )}

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
      <div className='profile_logout' onClick={userLogout}>Se deconnecter</div>
    </>
  )
}

export default UserProfile;