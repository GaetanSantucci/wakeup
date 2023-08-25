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
import { getTotalPrice } from '@/src/libs/getCartTotal';

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

  const BookingList = ({ orders, currentDateCheck }) => {
    console.log('orders:', orders);
    const currentDate = new Date();

    const filteredOrders = orders.filter(elem => {
      const inputDate = moment(elem.booking_date);
      return currentDateCheck ? currentDate < inputDate : currentDate > inputDate;
    });

    return (
      <div>
        {filteredOrders.length > 0 ? (
          <div className={currentDateCheck ? styles.container_booking_next : styles.container_booking_outdated}>
            {filteredOrders.map(elem => {
              const { totalPrice } = getTotalPrice(elem);
              const inputDate = moment(elem.booking_date);
              const bookingDate = inputDate.format("dddd D MMMM YYYY");

              return (
                <div key={elem.id}>
                  <p>Le {bookingDate}</p>
                  {currentDateCheck && <p>Vous avez réservé :</p>}
                  <ul>
                    {elem.products.map(product => (
                      <li key={product.id}> {product.total_order_quantity} - {product.product_name} </li>
                    ))}
                  </ul>
                  <p>montant total : {totalPrice.toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };



  return (
    <>

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
          {
            orders && <>
              <h4>Prochaine réservation</h4>
              <BookingList orders={orders} currentDateCheck={true} />

              <h4>Historiques</h4>
              <BookingList orders={orders} currentDateCheck={false} />
            </>
          }
          <div className={styles.container_booking_svg}>
            <svg className='loader' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412.83 215.85"><g id="Calque_2" data-name="Calque 2"><g id="Calque_1-2" data-name="Calque 1"><path d="M294.28,40.1c22.7,3.4,41,13.2,53.2,30.8a54,54,0,0,1,9.72,38.88c-1.5,11.7-7.6,21.6-13.3,31.7-5.1,9.2-10.8,18.1-15.9,27.2-8.8,15.8-22.7,23.9-42.2,23.5-7.3-.1-14.1-2.7-21-4.5-1.6-.4-1-1.4-.7-2.4,12-40.4,20.4-81.6,30.5-122.5A46,46,0,0,0,294.28,40.1Z" /><path d="M127.38,191c-19.8-.3-32.5-7.5-40.6-21.2-8.1-13.5-15.9-27.3-23.6-41-5-9-7.7-18.6-7.2-28.7.8-14.5,6.3-27.2,16.9-38.3,12-12.7,27.5-19,44.8-22.5,1.2-.2,2.6-1,2.1,1.2-3.2,13.9,1.1,27.1,4.1,40.5,5.5,24,10.8,48,16.6,72,2.5,10.6,4,21.5,8.2,31.7.5,1.2.6,2.1-1.2,2.4C140.2,188.6,132.88,191.6,127.38,191Z" /><path d="M24.58,212.2c-11.5,0-17.6-4.2-20.2-14.6-6-23.9-.6-45.6,15.7-65,5.7-6.7,12.5-12.4,19.5-17.9,1.9-1.5,3-1.5,3.6,1.3a71.34,71.34,0,0,0,10.1,24.2c4.9,7.9,9.1,16.1,13.7,24.1,4.4,7.7,8.2,15.7,14.5,22.3,1.1,1.1,2.2,2.3-.3,3.7-15.3,8.3-30.8,16.3-48.2,20.5a21,21,0,0,1-4.4.5C27.38,212.3,25.78,211.3,24.58,212.2Z" /><path d="M371.48,115c13.6,9.4,24.3,20.2,31.2,33.8,8.4,16.4,10.5,33.6,5.4,51.1-3.6,12.1-10.2,15.4-24.6,13.4-16.7-2.4-30.9-10.6-45.4-18-2.9-1.5-7.3-2.6-7.7-5.2-.3-2,3.5-4.4,5.4-6.8,3.9-5,6.6-10.7,9.8-16,6.1-10.1,12-20.2,17.8-30.5A77.42,77.42,0,0,0,371.48,115Z" /><path d="M205.48,2c11.2,0,22.4-.2,33.5,2.2,20.5,4.5,36,18.2,40.7,37.4,2.2,8.9.8,17.4-1.3,26q-12,49.35-23.8,98.7c-2.1,8.8-4.5,17.4-11.2,24.4a48.08,48.08,0,0,1-31.2,14.8c-10.8,1-21-.6-30.4-5.7-11.1-6-18.6-14.5-21.4-26.2q-8.25-35.25-16.4-70.5c-3.3-14.2-6.8-28.4-9.8-42.6-4.4-20.6,7.1-42.1,27.6-51.7a73.61,73.61,0,0,1,31.3-6.7C197.2,2,201.38,2,205.48,2Z" /></g></g></svg>
            {/* <svg version="1.1" id="coffee" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path class="steam steam1" d="M221.4,65.5l-4.9-6.2c-7.3-9.1-7.3-21.8,0-30.9c3.3-4.1,2.6-10.1-1.5-13.3c-4.1-3.3-10.1-2.6-13.3,1.5
	c-12.8,16.1-12.7,38.5,0,54.6l4.9,6.2c9.5,11.9,9.5,28.5,0,40.4l-5.1,6.4c-3.3,4.1-2.6,10.1,1.5,13.3c1.7,1.4,3.8,2.1,5.9,2.1
	c2.8,0,5.6-1.2,7.4-3.6l5.1-6.4C236.4,110.7,236.4,84.4,221.4,65.5z"/>
              <path class="steam steam2" d="M274,86.9l-4.9-6.2c-7.3-9.1-7.3-21.8,0-30.9c3.3-4.1,2.6-10.1-1.5-13.3c-4.1-3.3-10.1-2.6-13.3,1.5
	c-12.8,16.1-12.7,38.5,0,54.6l4.9,6.2c9.5,11.9,9.5,28.5,0,40.4l-5.1,6.4c-3.3,4.1-2.6,10.1,1.5,13.3c1.7,1.4,3.8,2.1,5.9,2.1
	c2.8,0,5.6-1.2,7.4-3.6l5.1-6.4C289,132.1,289,105.7,274,86.9z"/>
              <path class="steam steam3" d="M168.8,86.9l-4.9-6.2c-7.3-9.1-7.3-21.8,0-30.9c3.3-4.1,2.6-10.1-1.5-13.3c-4.1-3.3-10.1-2.6-13.3,1.5
	c-12.8,16.1-12.7,38.5,0,54.6l4.9,6.2c9.5,11.9,9.5,28.5,0,40.4l-5.1,6.4c-3.3,4.1-2.6,10.1,1.5,13.3c1.7,1.4,3.8,2.1,5.9,2.1
	c2.8,0,5.6-1.2,7.4-3.6l5.1-6.4C183.8,132.1,183.8,105.7,168.8,86.9z"/>
              <g>
                <path class="coffee-cup" d="M489.5,209h-77.8v-20.1c0-5.2-4.3-9.5-9.5-9.5h-205c-5.2,0-9.5,4.2-9.5,9.5c0,5.2,4.3,9.5,9.5,9.5h195.5v72.8
		c0,63.9-34.1,123.3-89.2,155.7H121.2C66.1,394.5,32,335.1,32,271.2v-72.8h63.6c5.2,0,9.5-4.2,9.5-9.5c0-5.2-4.3-9.5-9.5-9.5H22.5
		c-5.2,0-9.5,4.2-9.5,9.5v82.3c0,35.9,9.6,71.1,27.9,101.7c12.3,20.7,28.3,39,47,53.9H22.5c-5.2,0-9.5,4.2-9.5,9.5
		c0,34.5,28.1,62.6,62.6,62.6h296.2c34.5,0,62.6-28.1,62.6-62.6c0-5.2-4.3-9.5-9.5-9.5h-88.1c17.2-13.8,32.1-30.4,44-49h26.8
		c50.4,0,91.4-41,91.4-91.4v-67.9C499,213.3,494.8,209,489.5,209z M414.4,445.8c-4.3,19.5-21.8,34.2-42.6,34.2H75.6
		c-20.8,0-38.3-14.6-42.6-34.2h85.7H306H414.4z M411.7,271.2V266H442v20.4c0,19-15.5,34.5-34.5,34.5h-2.2
		C409.5,304.7,411.7,288,411.7,271.2z M480,286.4c0,40-32.5,72.5-72.5,72.5h-16.2c3-6.2,5.7-12.5,8.1-19h8.1
		c29.5,0,53.5-24,53.5-53.5v-29.9c0-5.2-4.3-9.5-9.5-9.5h-39.9v-19H480V286.4z"/>
                <path class="coffee-cup" d="M148.9,198.4c2.5,0,4.9-1,6.7-2.8c1.8-1.8,2.8-4.2,2.8-6.7c0-2.5-1-4.9-2.8-6.7c-1.8-1.8-4.2-2.8-6.7-2.8s-4.9,1-6.7,2.8
		c-1.8,1.8-2.8,4.2-2.8,6.7s1,4.9,2.8,6.7C144,197.4,146.4,198.4,148.9,198.4z"/>
                <path class="coffee-cup" d="M321.4,379.6c28.4-28.7,44.7-68.2,44.7-108.4c0-5.2-4.3-9.5-9.5-9.5s-9.5,4.2-9.5,9.5c0,35.2-14.3,69.9-39.2,95
		c-3.7,3.7-3.7,9.7,0.1,13.4c1.9,1.8,4.3,2.8,6.7,2.8C317.1,382.4,319.5,381.4,321.4,379.6z"/>
                <path class="coffee-cup" d="M283.5,406.2c1.6,0,3.2-0.4,4.7-1.2l0.2-0.1c4.6-2.6,6.2-8.4,3.6-12.9c-2.6-4.6-8.4-6.2-12.9-3.6l-0.2,0.1
		c-4.6,2.6-6.2,8.4-3.6,12.9C277,404.5,280.2,406.2,283.5,406.2z"/>
              </g>
            </svg> */}
          </div>

        </div>
      </section>
    </>
  )
}

export default UserProfile;