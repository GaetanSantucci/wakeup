'use client';
import styles from './Profile.module.scss';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useLogout } from '@/src/hook/useLogout';
import { useEffect, useState } from 'react';

import { useMediaQuery } from '@/src/hook/useMediaQuery';

import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Dialog, DialogContent } from '@mui/material';


import { useSetupUser } from '@/src/hook/useSetUser';
import { userUpdateProfile, inputValue } from '@/src/store/reducers/User';

import { fetchOrderByUser } from '@/src/libs/getOrderList';

import { ProfileBackground } from '../SVG';
import moment from 'moment';
import 'moment/locale/fr'; // import the French locale
moment.locale('fr'); // set the locale to French


const UserProfile = () => {

  const isBreakPoint = useMediaQuery(768);

  const dispatch = useDispatch();
  const { push } = useRouter();
  const { logout } = useLogout();
  const { update, deleted } = useSetupUser();

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
  const [showPassword, setShowPassword] = useState(false);
  const [openDeleteConfirmationModale, setOpenDeleteConfirmation] = useState(false);

  const fetchOrder = async () => {
    try {
      const response = await fetchOrderByUser(user.id);
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isLogged) {
        push('/');
      } else {
        await fetchOrder();
      }
    };

    fetchData();
  }, [isLogged]);

  const userLogout = () => {
    logout();
  }

  const toggleUpdateUser = () => toggleIsUserUpdate(!isUserUpdate)

  const handleFormSubmit = (e) => {
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
      },
      newsletter_optin: user.newsletter_optin
    }
    e.preventDefault();
    if (email === user.email) {
      const { ['email']: remove, ...updateData } = data;
      try {
        update(updateData) // & send patch request to update user in database
        toggleIsUserUpdate(!isUserUpdate)

      } catch (err) {
        console.log(err)
      }
    } else {

      try {
        const response = update(data) // & send patch request to update user in database
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


  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value } = event.target;

    dispatch(inputValue({ inputType: id, value }));
  };
  const isModify = isUserUpdate ? { readOnly: false } : { readOnly: true }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleOpenDeleteModale = () => setOpenDeleteConfirmation((openDeleteConfirmationModale) => !openDeleteConfirmationModale)

  const Modale = ({ onClose }) => {

    const [password, setPassword] = useState('')


    const sendResetPassword = async () => {
      const data = {
        id: user.id,
        email: user.email,
        password
      }

      try {
        const deleteUser = await deleted(data)
        if (response.status === 403) {
          console.log(
            "message :", deleteUser.message
          )
        } else {
          userLogout();
        }
      }
      catch (err) {

      }
    }

    return (

      <Dialog open={openDeleteConfirmationModale} onClose={onClose} sx={{ p: '2rem' }}>
        <DialogContent sx={{ display: 'flex', minWidth: '350px', flexDirection: "column", gap: "0.5rem" }}>
          <p >Saissisez votre mot de passe pour confirmer la suppression de votre compte</p>
          {/* <FormControl sx={{ width: '90%', mb: 2 }}
            variant="standard"
            size='small'
            required
          > */}
          <InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>
          <Input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
            type='password'
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
            label="Mot de passe"
          />
          {/* </FormControl> */}
          <button onClick={sendResetPassword}>Valider</button>
        </DialogContent>
      </Dialog>
      // <div className={styles.container_modale}>
      //   <p>Saissisez votre mot de passe pour supprimer votre compte</p>
      //   <FormControl sx={{ width: '90%', mb: 2 }}
      //     variant="standard"
      //     size='small'
      //     required
      //   >
      //     <InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>
      //     <Input
      //       id="password"
      //       onChange={(e) => setPassword(e.target.value)}
      //       defaultValue={password}
      //       type={showPassword ? 'text' : 'password'}
      //       endAdornment={
      //         <InputAdornment position="end">
      //           <IconButton
      //             aria-label="toggle password visibility"
      //             onClick={handleClickShowPassword}
      //             edge="end"
      //           >
      //             {showPassword ? <VisibilityOff /> : <Visibility />}
      //           </IconButton>
      //         </InputAdornment>
      //       }
      //       label="Mot de passe"
      //     />
      //   </FormControl>
      //   <button onClick={sendResetPassword}>Valider</button>
      // </div>
    )
  }


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
            {filteredOrders.map((elem, index) => {

              const inputDate = moment(elem.booking_date);
              const bookingDate = inputDate.format("dddd D MMMM YYYY");
              const capitalizedBookingDate = capitalizeFirstLetter(bookingDate);
              return (
                <div className={styles.container_booking_card} key={index}>
                  <p className={styles.container_booking_card_date}>{capitalizedBookingDate}</p>
                  <div className={styles.container_booking_card_desc}>
                    {
                      isBreakPoint ? null :
                        <ul>
                          {elem.products.map(product => {

                            const productName = product.quantity > 1
                              ? product.product_name.replace("plateau", "plateaux")
                              : product.product_name;

                            return (
                              <li className={styles.container_booking_card_desc_product} key={product.product_name}> {product.quantity} {productName}</li>
                            )
                          }
                          )}
                        </ul>
                    }
                    <p className={styles.container_booking_card_desc_price}><span>{elem.total_amount} €</span></p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    );
  };

  return (

    <section className={styles.container}>
      {openDeleteConfirmationModale &&
        <Modale onClose={() => setOpenDeleteConfirmation(false)} />}
      <aside className={styles.container_user}>

        <div className={styles.container_user_information}>
          <h4>Mon profil</h4>
          <form >
            <TextField
              label="Email"
              id='email'
              onChange={e => setEmail(e.target.value)}
              type="email"
              sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '95%' }}
              size='small'
              value={email}
              InputProps={isModify}
              error={errorEmail}
              helperText={errorEmail ? "L'email existe déjà" : ''}
              variant='standard'
            />
            <TextField
              label="Téléphone"
              id='phone'
              onChange={e => setPhone(e.target.value)}
              type="tel"
              sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '95%', padding: '' }}
              size='small'
              value={phone}
              InputProps={isModify}
              variant='standard'
            />
            <TextField
              label="Nom"
              id='lastname'
              onChange={e => setLastname(e.target.value)}
              type="text"
              sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '95%' }}
              size='small'
              value={lastname}
              InputProps={isModify}
              variant='standard'
            />
            <TextField
              label="Prénom"
              id='firstname'
              onChange={e => setFirstname(e.target.value)}
              size='small'
              type="text"
              sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '95%' }}
              value={firstname}
              InputProps={isModify}
              variant='standard'
            />
            <TextField
              label="Adresse"
              id='line1'
              onChange={e => setLine1(e.target.value)}
              size='small'
              type="text"
              sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '95%' }}
              value={line1}
              InputProps={isModify}
              variant='standard'
            />
            {user.address.complement || isUserUpdate ? <TextField
              label="Complément"
              id='line2'
              onChange={e => setLine2(e.target.value)}
              size='small'
              type="text"
              sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '95%' }}
              value={line2}
              InputProps={isModify}
              variant='standard'
            /> : null}
            <TextField
              label="Code postal"
              id='postcode'
              onChange={e => setPostcode(e.target.value)}
              size='small'
              type="text"
              sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '95%' }}
              value={postcode}
              InputProps={isModify}
              variant='standard'

            />
            <TextField
              label="Ville"
              id='city'
              onChange={e => setCity(e.target.value)}
              size='small'
              type="text"
              sx={isBreakPoint ? { mb: 2, width: '80%' } : { mb: 1.4, width: '95%' }}
              value={city}
              InputProps={isModify}
              variant='standard'
            />
            {isUserUpdate &&
              <div className={styles.container_user_information_checkbox}>
                <Checkbox
                  id='newsletter_optin'
                  size='small'
                  // value={user.newsletter_optin}
                  checked={user.newsletter_optin}
                  onChange={handleInputChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  sx={{
                    color: '#424242',
                    '&.Mui-checked': {
                      color: '#202020',
                    },
                    '& .MuiSvgIcon-root': { fontSize: 16 }
                  }}
                />
                <p>Recevoir newsletter de WAKE UP uniquement</p>
              </div>}
          </form>
        </div>
        <div className={styles.container_user_button}>
          {
            isUserUpdate ?
              <>
                <div className={styles.container_user_button_update}>
                  <button onClick={toggleUpdateUser}>Annuler</button>
                  <button type='submit ' onClick={handleFormSubmit}>Enregistrer</button>
                </div>
                <div className={styles.container_user_button_delete} onClick={handleOpenDeleteModale}>
                  <DeleteOutlineOutlinedIcon /><span>Supprimer le compte</span>
                </div>
              </>
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
        <div onClick={userLogout} className={styles.container_user_logout}>
          <LogoutIcon />
          <div className={styles.container_user_logout_info}>Se déconnecter</div>
        </div>
      }
    </section>
  )
}

export default UserProfile;