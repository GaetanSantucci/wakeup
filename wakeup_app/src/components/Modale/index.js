'use client';
import './modale.scss';

//! test new form
import styles from '../Checkout/Checkout.module.scss';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@/src/hook/useMediaQuery';


import Link from 'next/link';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { toggleCartModale, toggleLoginModale, toggleProfileModale, toggleShowNavbar } from '@/src/store/reducers/Settings';
import { /* setAddress, */ inputValue, updateComplement, toggleCheckbox } from '@/src/store/reducers/User';

import { getTotal } from '@/src/libs/getCartTotal';
import { useSetupUser } from '@/src/hook/useSetUser';
import { resetAllCartItems } from '@/src/store/reducers/Cart';
import { AddOrDeleteItems } from '../Button';


const CartModale = () => {

  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.settings.cartIsOpen)
  const { cart } = useSelector((state) => state.cart)
  const { loginModale } = useSelector((state) => state.settings)

  const closeModale = () => {
    dispatch(toggleCartModale())
    dispatch(toggleShowNavbar())
    if (loginModale) dispatch(toggleLoginModale())
  };
  const handleRemoveItem = () => {
    dispatch(resetAllCartItems());
    setTimeout(() => {
      closeModale();
    }, 400)

  }

  return (
    <div className={cartOpen ? 'cart_modale open_cart_modale' : 'cart_modale'}>
      <div className='modale_close' onClick={closeModale}>
        <CancelSharpIcon />
      </div>
      <h3 className='cart_modale_title'>Votre panier </h3>
      {
        cart.map(elem => {
          return (
            <div className='cart_modale_item' key={elem.name}>
              <p>{elem.name}</p>
              <AddOrDeleteItems cart={elem} />
            </div>
          )
        })
      }
      <p className='cart_modale_price'>Montant du panier : {getTotal(cart).totalPrice.toFixed(2)}<span> €</span></p>
      <div className='cart_modale_controler'>
        <Link href='/checkout'>
          <button onClick={closeModale}>Validez</button>
        </Link>
        <p onClick={() => handleRemoveItem()}>Videz le panier</p>
      </div>
    </div>
  )
}

const ProfileModale = () => {

  const dispatch = useDispatch();
  const { update } = useSetupUser();

  const { user } = useSelector((state) => state.user);
  const profileOpen = useSelector((state) => state.settings.profileIsOpen);

  // state of address research
  const [searchTerm, setSearchTerm] = useState(user?.address?.label || '');
  const [results, setResults] = useState([]);

  const handleCloseProfileModale = () => {
    dispatch(toggleProfileModale())
  }


  const submitUserProfile = async (event) => {
    event.preventDefault();
    await update(user)
    console.log('je mets a jour le profile')
  }

  const handleSetAddress = (elem) => {
    const { label, name, city, postcode } = elem
    dispatch(setAddress({ label, name, city, postcode }))
    // Results to undefined to close div research
    setSearchTerm(label)
    setResults([])
  }

  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value, checked } = event.target;
    if (id === 'complement') {
      dispatch(updateComplement(value));
    } else if (id === 'newsletter_optin') {
      dispatch(toggleCheckbox(checked));
    } else {
      dispatch(inputValue({ inputType: id, value }));
    }
  };
  const isBreakpoint = useMediaQuery(768) // Custom hook to check screen size, return boolean

  let widthElement = '45%'
  if (isBreakpoint) {
    widthElement = '85%' // To display calendar in middle of the page
  }

  const theme = createTheme({
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: '#088519',
            fontSize: '0.8rem',
          },
          daySelected: {
            backgroundColor: '#ff00ff !important'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
          },
          color: '#252525 !important',
          notchedOutline: {
            borderColor: '#252525 !important',
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: '#252525 !important',
            fontSize: '0.9rem',
          }
        }
      }
    }
  });


  return (
    <div className={profileOpen ? 'profile_modale open_profile_modale' : 'profile_modale'}>
      <div className='modale_close' onClick={handleCloseProfileModale}>
        <CancelSharpIcon />
      </div>

      <h3 className={styles.container_checkout_title}>Saisie de vos informations</h3>
      <ThemeProvider theme={theme}>
        <Box
          component='form'
          sx={{
            width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', /* margin: '8rem 0 2rem 0' */
            '& > :not(style)': { m: '0.5rem', width: widthElement, fontSize: '0.8rem' },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField id='lastname' label='Nom' value={user.lastname} onChange={handleInputChange} variant='outlined' size='small' />
          <TextField id='firstname' label='Prénom' value={user.firstname} onChange={handleInputChange} variant='outlined' size='small' />
          <TextField id='email' label='Email' value={user.email} onChange={handleInputChange} type='email' variant='outlined' size='small' />
          <TextField id='phone' label='Téléphone' value={user.phone} onChange={handleInputChange} type='tel' variant='outlined' size='small' />
          {/* <div className={styles.container_information}> */}
          <TextField id='name' className={styles.container_information_input} label='Adresse' value={user.address?.name} onChange={handleInputChange} variant='outlined' autoComplete='off' size='small' />
          <TextField id='complement' label='Bât., étage, interphone...' value={user.address?.complement} onChange={handleInputChange} variant='outlined' size='small' />
          <TextField id='postcode' label='Code postal' value={user.address?.postcode} onChange={handleInputChange} variant='outlined' size='small' />
          <div className={styles.container_information}>
            <TextField id='city' className={styles.container_information_input} label='Ville' value={user.address?.city} onChange={handleInputChange} variant='outlined' size='small' />
            {/* <div className={styles.container_information_address} >
                <div className={styles.container_information_address_block} >
                  {
                    isDeliverableCity && (
                      isDeliverableCity.map((elem, index) => {
                        if (index <= 4) {
                          return (
                            <div className={styles.container_information_address_block_result} onClick={() => handleSetAddress(elem)} key={elem.id}>{elem.name}</div>
                          )
                        }
                      })
                    )
                  }
                </div>
              </div> */}
          </div>
        </Box>

      </ThemeProvider >
      {/* <form className='profile_modale_form' onSubmit={submitUserProfile}>
        <div className='profile_modale_form_input'>
          <input type='email' id='email' placeholder='Modifier votre email' value={user.email} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input type='tel' id='phone' placeholder='Modifier votre numéro de téléphone' value={user.phone} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input type='text' id='lastname' placeholder='Ajouter ou modifier le nom' value={user.lastname} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input type='text' id='firstname' placeholder='Ajouter ou modifier le prénom' value={user.firstname} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input id='search' type='search' placeholder='Saisissez votre adresse' aria-autocomplete='list' onChange={handleInputChange} value={user.address.name} />
        </div>
        <div className='profile_modale_form_input'>
          <input type='text' id='complement' placeholder='Étage, bâtiment, interphone' onChange={handleInputChange} value={user.address.complement} />
        </div> */}
      <div className='profile_modale_form_input_checkbox'>
        {user.newsletter_optin ? (
          <input type='checkbox' id='newsletter_optin' onChange={handleInputChange} checked={user.newsletter_optin} />
        ) : (
          <input type='checkbox' id='newsletter_optin' onChange={handleInputChange} />
        )}
        <p>J&apos;accepte de recevoir des emails de la part de WAKE UP, newsletter, offre promotionnelle</p>
      </div>
      <button type='submit' onClick={handleCloseProfileModale} >Valider</button>
      {/* </form> */}
    </div>
  )
}

export { CartModale, ProfileModale }