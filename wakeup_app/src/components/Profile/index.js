'use client';
import styles from './Profile.module.scss';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useLogout } from '@/src/hook/useLogout';
import { useEffect, useState } from 'react';

import { TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useSetupUser } from '@/src/hook/useSetUser';
import { userUpdateProfile } from '@/src/store/reducers/User';

import { fetchOrderByUser } from '@/src/libs/getOrderList';

import moment from 'moment';
import 'moment/locale/fr'; // import the French locale
moment.locale('fr'); // set the locale to French


const UserProfile = () => {

  const dispatch = useDispatch();
  const { push } = useRouter();
  const { logout } = useLogout();
  const { update } = useSetupUser();

  const { isLogged, user } = useSelector((state) => state.user);

  const [isUserUpdate, toggleIsUserUpdate] = useState(false);
  const [orders, setOrders] = useState();
  console.log('orders:', orders);
  const [lastname, setLastname] = useState(user.lastname || "");
  const [firstname, setFirstname] = useState(user.firstname || "");
  const [line1, setLine1] = useState(user.address.line1 || "");
  const [line2, setLine2] = useState(user.address.line2 || "");
  const [postcode, setPostcode] = useState(user.address.postcode || "");
  const [city, setCity] = useState(user.address.city || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {

    fetchOrderByUser(user.id)
      .then(response => {
        console.log('response:', response);
        setOrders(response)
      })



    if (!isLogged) {
      push('/')
    }
  }, [isLogged])

  const userLogout = () => {
    logout();
  }

  const toggleUpdateUser = () => toggleIsUserUpdate(!isUserUpdate)

  const handleFormSubmit = async (e) => {
    const data = {
      id: user.id,
      email,
      lastname,
      firstname,
      phone,
      address: {
        line1,
        line2,
        postcode,
        city
      }
    }
    e.preventDefault();
    if (email === user.email) {
      const { ['email']: remove, ...updateData } = data;
      try {
        const response = await update(updateData) // & send patch request to update user in database
      } catch (err) {
        console.log(err)
      }
    } else {

      try {
        const response = await update(data) // & send patch request to update user in database
        if (response.includes('email')) {
          setErrorEmail(true)

        } else {
          dispatch(userUpdateProfile(data)); // & set user update in redux store
          toggleIsUserUpdate(!isUserUpdate)
          setErrorEmail(false)

        }

      } catch (err) {
        console.log(err)
      }

    }

  }

  const isModify = isUserUpdate ? { readOnly: false } : { readOnly: true }

  return (
    <>
      {/* <h3 style={{ marginTop: '3rem', marginBottom: '3rem' }}>Bienvenu sur votre page membre</h3> */}
      <section className={styles.container}>
        <aside className={styles.container_user}>
          <div className={styles.container_user_information}>
            <h2>Mes coordonnées</h2>
            {/* {
              isUserUpdate ? */}
            <form >

              <TextField
                label="Email"
                id='email'
                onChange={e => setEmail(e.target.value)}
                type="email"
                sx={{ mb: 1.4, width: '100%' }}
                size='small'
                value={email}
                InputProps={isModify}
                error={errorEmail}
                helperText={errorEmail ? "L'email existe déjà" : ''}
              />
              <TextField
                label="Téléphone"
                id='phone'
                onChange={e => setPhone(e.target.value)}
                type="tel"
                sx={{ mb: 1.4, width: '100%', padding: '' }}
                size='small'
                value={phone}
                InputProps={isModify}
              // error={ema}
              />
              <TextField
                label="Nom"
                id='lastname'
                onChange={e => setLastname(e.target.value)}
                type="text"
                sx={{ mb: 1.4, width: '100%' }}
                size='small'
                value={lastname}
                InputProps={isModify}
              />
              <TextField
                label="Prénom"
                id='firstname'
                onChange={e => setFirstname(e.target.value)}
                size='small'
                type="text"
                sx={{ mb: 1.4, width: '100%' }}
                value={firstname}
                InputProps={isModify}
              // error={emailError}
              />
              <TextField
                label="Adresse"
                id='line1'
                onChange={e => setLine1(e.target.value)}
                size='small'
                type="text"
                sx={{ mb: 1.4, width: '100%' }}
                value={line1}
                InputProps={isModify}
              // error={emailError}
              />
              <TextField
                label="Complément"
                id='line2'
                onChange={e => setLine2(e.target.value)}
                size='small'
                type="text"
                sx={{ mb: 1.4, width: '100%' }}
                value={line2}
                InputProps={isModify}
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
                InputProps={isModify}
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
                InputProps={isModify}
              // error={emailError}
              />
            </form>
          </div>


          <div className={styles.container_user_button}>

            {
              isUserUpdate ?
                <div className={styles.container_user_button_update}>
                  <button onClick={toggleUpdateUser}>Annuler</button>
                  <button type='submit ' onClick={handleFormSubmit}>Enregistrer</button>
                </div>
                :
                <button onClick={toggleUpdateUser}>Modifier</button>
            }
            <div onClick={userLogout} className={styles.container_user_logout}>
              <LogoutIcon />
              <div className={styles.container_user_logout_info}>Se déconnecter</div>
            </div>
          </div>
        </aside>
        <div className={styles.container_booking}>
          {orders ? <ul>
            {
              orders.map(elem => {
                console.log(elem.products)
                const inputDate = moment(elem.booking_date);
                const bookingDate = inputDate.format("dddd D MMMM YYYY")
                return <li>{bookingDate} - {elem.products[0].product_name} - {elem.products[0].total_order_quantity}</li>
              })
            }
          </ul>
            :
            null
          }
        </div>
      </section>
      {/* <button className={styles.profile_logout} onClick={userLogout}>Se deconnecter</button> */}
    </>
  )
}

export default UserProfile;