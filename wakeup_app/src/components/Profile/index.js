'use client';
import styles from './Profile.module.scss';

import Cookies from 'js-cookie';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

import { ProfileModale } from '@/src/components';

import { toggleProfileModale } from '@/src/store/reducers/Settings';

import Pseudo from '@/src/utils/pseudoProfilePage';

import { useLogout } from '@/src/hook/useLogout';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

const UserProfile = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { logout } = useLogout();

  const { isLogged, user } = useSelector((state) => state.user);

  const [isUserUpdate, toggleIsUserUpdate] = useState(true)
  const [lastname, setLastname] = useState(user.lastname || "");
  const [firstname, setFirstname] = useState(user.firstname || "");
  const [line1, setLine1] = useState(user.address.name || "");
  const [line2, setLine2] = useState(user.address.complement || "");
  const [postcode, setPostcode] = useState(user.address.postcode || "");
  const [city, setCity] = useState(user.address.city || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");


  useEffect(() => {
    if (!isLogged) {
      push('/')
    }
  })

  const handleInputChange = () => {
    dispatch(toggleProfileModale());
  }

  const userLogout = () => {
    logout();
  }

  // const handleInputChangeCity = () => {
  //todo recuperer methode pour zone de livraison
  // }

  const toggleUpdateUser = () => toggleIsUserUpdate(!isUserUpdate)

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Je modifie les donnees user");
  }
  return (
    <>
      {/* <h3 style={{ marginTop: '3rem', marginBottom: '3rem' }}>Bienvenu sur votre page membre</h3> */}
      <section className={styles.container}>
        <aside className={styles.container_user}>
          <div className={styles.container_user_information}>
            <h2>Mes coordonnées</h2>
            {
              isUserUpdate ?
                <form onSubmit={handleFormSubmit}>
                  <TextField
                    label="Email"
                    id='email'
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    sx={{ mb: 1.4, width: '100%' }}
                    value={email}
                    size='small'
                  // error={emailError}
                  />
                  <TextField
                    label="Téléphone"
                    id='phone'
                    onChange={e => setPhone(e.target.value)}
                    type="tel"
                    sx={{ mb: 1.4, width: '100%', padding: '' }}
                    size='small'
                    value={phone}
                  // error={emailError}
                  />
                  <TextField
                    label="Nom"
                    id='lastname'
                    onChange={e => setLastname(e.target.value)}
                    type="text"
                    sx={{ mb: 1.4, width: '100%' }}
                    size='small'
                    value={lastname}
                  // error={emailError}
                  />
                  <TextField
                    label="Prénom"
                    id='firstname'
                    onChange={e => setFirstname(e.target.value)}
                    size='small'
                    type="text"
                    sx={{ mb: 1.4, width: '100%' }}
                    value={firstname}
                  // error={emailError}
                  />
                  <TextField
                    label="Adresse"
                    id='name'
                    onChange={e => setLine1(e.target.value)}
                    size='small'
                    type="text"
                    sx={{ mb: 1.4, width: '100%' }}
                    value={line1}
                  // error={emailError}
                  />
                  <TextField
                    label="Complément"
                    id='complement'
                    onChange={e => setLine2(e.target.value)}
                    size='small'
                    type="text"
                    sx={{ mb: 1.4, width: '100%' }}
                    value={line2}
                  // error={emailError}
                  />
                  <TextField
                    label="Code postal"
                    id='postcode'
                    onChange={e => setPostcode(e.target.value)}
                    size='small'
                    type="text"
                    sx={{ mb: 1.4, width: '100%' }}
                    value={postcode}
                  // error={emailError}
                  />
                  <TextField
                    label="Ville"
                    id='city'
                    onChange={e => setCity(e.target.value)}
                    size='small'
                    type="text"
                    sx={{ mb: 1.4, width: '100%' }}
                    value={city}
                  // error={emailError}
                  />
                </form>
                :
                <ul className={styles.container_user_list}>
                  <li><span>Email</span> : {user.email}</li>
                  <li><span>Téléphone </span>: {user.phone}</li>
                  <li><span>Nom </span>: {user.lastname}</li>
                  <li><span>Prénom </span>: {user.firstname}</li>
                  <li><span>Adresse </span>:</li>
                  <li>{user.address.name}</li>
                  <li>{user.address.postcode}</li>
                  {
                    user.address?.complement ?? <li>{user.address.complement}</li>
                  }
                </ul>

            }
          </div>


          <div className={styles.container_user_button}>

            {
              isUserUpdate ?
                <div className={styles.container_user_button_update}>
                  <button>Annuler</button>
                  <button>Enregistrer</button>
                </div>
                :
                <button onClick={toggleUpdateUser}>Modifier</button>
            }
            <LogoutIcon />
          </div>
        </aside>
        <div className={styles.container_booking}></div>
      </section>
      {/* <button className={styles.profile_logout} onClick={userLogout}>Se deconnecter</button> */}
    </>
  )
}

export default UserProfile;