'use client';
import styles from './Profile.module.scss';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useLogout } from '@/src/hook/useLogout';
import { useEffect, useState } from 'react';

import { useMediaQuery } from '@/src/hook/useMediaQuery';

import { TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useSetupUser } from '@/src/hook/useSetUser';
import { userUpdateProfile } from '@/src/store/reducers/User';

import { fetchOrderByUser } from '@/src/libs/getOrderList';
import { getTotalPrice } from '@/src/libs/getCartTotal';

import { ProfileBackground } from '../SVG';
import moment from 'moment';
import 'moment/locale/fr'; // import the French locale
moment.locale('fr'); // set the locale to French


const UserProfile = () => {

  const isBreakPoint = useMediaQuery(768);

  const dispatch = useDispatch();
  const { push } = useRouter();
  const { logout } = useLogout();
  const { update } = useSetupUser();

  const { isLogged, user } = useSelector((state) => state.user);

  const [isUserUpdate, toggleIsUserUpdate] = useState(false);
  const [orders, setOrders] = useState();
  const [lastname, setLastname] = useState(user.lastname || "");
  const [firstname, setFirstname] = useState(user.firstname || "");
  const [line1, setLine1] = useState(user.address.line1 || "");
  const [line2, setLine2] = useState(user.address.line2 || "");
  const [postcode, setPostcode] = useState(user.address.postcode || "");
  const [city, setCity] = useState(user.address.city || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [errorEmail, setErrorEmail] = useState(false);

  useEffect(() => {

    if (!isLogged) {
      push('/')
    } else (

      fetchOrderByUser(user.id)
        .then(response => {
          setOrders(response)
        })
    )
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

  const BookingList = ({ orders, currentDateCheck }) => {
    const currentDate = new Date();

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const filteredOrders = orders.filter(elem => {
      const inputDate = moment(elem.booking_date);
      return currentDateCheck ? currentDate < inputDate : currentDate > inputDate;
    });

    return (
      <>
        {filteredOrders.length > 0 ? (
          <div className={currentDateCheck ? styles.container_booking_next : styles.container_booking_outdated}>
            {filteredOrders.map(elem => {
              const { totalPrice } = getTotalPrice(elem);
              const inputDate = moment(elem.booking_date);
              const bookingDate = inputDate.format("dddd D MMMM YYYY");
              const capitalizedBookingDate = capitalizeFirstLetter(bookingDate);
              return (
                <div className={styles.container_booking_card} key={elem.id}>
                  <p className={styles.container_booking_card_date}>{capitalizedBookingDate}</p>
                  {
                    isBreakPoint ? null :
                      <ul>
                        {elem.products.map(product => {

                          const productName = product.total_order_quantity > 1
                            ? product.product_name.replace("plateau", "plateaux")
                            : product.product_name;

                          return (
                            <li className={styles.container_booking_card_product} key={product.product_name}> {product.total_order_quantity} {productName}</li>
                          )
                        }
                        )}
                      </ul>
                  }
                  <p className={styles.container_booking_card_price}><span>{totalPrice.toFixed(2)} €</span></p>
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>
      <section className={styles.container}>
        <aside className={styles.container_user}>
          <div className={styles.container_user_information}>
            <h4>Mon profil</h4>
            <form >
              <TextField
                label="Email"
                id='email'
                onChange={e => setEmail(e.target.value)}
                type="email"
                sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '100%' }}
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
                sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '100%', padding: '' }}
                size='small'
                value={phone}
                InputProps={isModify}
              />
              <TextField
                label="Nom"
                id='lastname'
                onChange={e => setLastname(e.target.value)}
                type="text"
                sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '100%' }}
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
                sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '100%' }}
                value={firstname}
                InputProps={isModify}
              />
              <TextField
                label="Adresse"
                id='line1'
                onChange={e => setLine1(e.target.value)}
                size='small'
                type="text"
                sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '100%' }}
                value={line1}
                InputProps={isModify}
              />
              <TextField
                label="Complément"
                id='line2'
                onChange={e => setLine2(e.target.value)}
                size='small'
                type="text"
                sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '100%' }}
                value={line2}
                InputProps={isModify}
              />
              <TextField
                label="Code postal"
                id='postcode'
                onChange={e => setPostcode(e.target.value)}
                size='small'
                type="text"
                sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '100%' }}
                value={postcode}
                InputProps={isModify}
              />
              <TextField
                label="Ville"
                id='city'
                onChange={e => setCity(e.target.value)}
                size='small'
                type="text"
                sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '100%' }}
                value={city}
                InputProps={isModify}
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
              {isBreakPoint ? null :
                <>
                  <LogoutIcon />
                  <div className={styles.container_user_logout_info}>Se déconnecter</div>
                </>
              }
            </div>
          </div>
        </aside>
        <div className={styles.container_booking}>
          <div className={styles.container_booking_background}>
            <ProfileBackground />
          </div>
          {
            orders && <>
              <h4>Prochaine réservation</h4>
              <BookingList orders={orders} currentDateCheck={true} />

              <h4>Historiques</h4>
              <BookingList orders={orders} currentDateCheck={false} />
            </>
          }
        </div>
        {isBreakPoint &&
          <>
            <LogoutIcon />
            <div className={styles.container_user_logout_info}>Se déconnecter</div>
          </>}
      </section>
    </>
  )
}

export default UserProfile;