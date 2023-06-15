'use client';
import styles from './Checkout.module.scss';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { inputValue, setAddress } from '@/src/store/reducers/User';

import { AddOrDeleteItems } from '../Button';
import { StripeButton } from '@/src/components/Button';
import { CustomCalendar } from '../Calendar';

import { getTotal } from '@/src/libs/getCartTotal';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CheckoutCart = ({ nextPage }) => {
  const cart = useSelector((state) => state.cart.cart)

  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Résumé de votre commande</h3>
        {
          cart.map(elem => {
            return (
              <div className='cart_modale_item' style={{ width: '100%' }} key={elem.name}>
                <div className='cart_modale_item_img'>
                  <Image src={`/images/${elem.img}`} alt={elem.name} width={50} height={75} />
                </div>
                <div className='cart_modale_item_desc'>
                  <p>{elem.name}</p>
                  <AddOrDeleteItems cart={elem} />
                </div>
              </div>
            )
          })
        }
        {
          getTotal(cart).totalQuantity === 0 ? <p>Votre panier est vide, commencez vos achats <Link href='/plateau' style={{ textDecoration: 'underline' }}>ici</Link></p>
            :
            <>
              <p className={styles.container_checkout_desc}>Nombre d&apos;articles dans votre panier : {getTotal(cart).totalQuantity}</p>
              <p className={styles.container_checkout_desc}>Montant du panier : {getTotal(cart).totalPrice.toFixed(2)}<span>€</span></p>
              <div className={styles.container_calendar}>
                <CustomCalendar />
              </div>
            </>
        }
      </div>
      <button className={styles.button} onClick={nextPage}>Validez</button>
    </>
  )
}

const CheckoutInformation = ({ previousPage, nextPage }) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)
  // state of address research
  const [searchTerm, setSearchTerm] = useState(user?.address?.label || '');
  const [results, setResults] = useState(null);
  // const [address, setAddress] = useState('');

  const handleSearchInput = async (event) => {
    console.log('event.target.value:', event.target.value);
    if (event.target.value < 3) setResults([])
    setSearchTerm(event.target.value)

    if (searchTerm.length > 3) {
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${event.target.value}&type=housenumber&autocomplete=1`)
        console.log('response:', response);
        if (response.ok) {
          const data = await response.json();
          setResults(data.features)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSetAddress = (elem) => {
    const { label, name, city, postcode } = elem
    dispatch(setAddress({ label, name, city, postcode }))
    // Results to undefined to close div research
    console.log('dans le handle setAddress voici le user profile', user);
    setSearchTerm(label)
    setResults([])
  }

  const theme = createTheme({
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: '#088519',
            fontSize: '0.8rem',
          },
          dayelected: {
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
  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputValue({ inputType: id, value }));
  };



  // const handleInputAddressChange = (value) => {
  //   setAddress(value);
  // };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 2, width: '300px', display: 'flex', fontSize: '0.8rem' },
          }}
          noValidate
          autoComplete='off'
        >
          {/* <TextField id='input-email' label='Email' value={user.email} onChange={handleInputChange} type='email' variant='outlined' size='small' required /> */}
          <TextField id='lastname' label='Nom' value={user.lastname} onChange={handleInputChange} variant='outlined' size='small' required />
          <TextField id='firstname' label='Prénom' value={user.firstname} onChange={handleInputChange} variant='outlined' size='small' required />
          <TextField id='phone' label='Téléphone' value={user.phone} onChange={handleInputChange} type='tel' variant='outlined' size='small' required />
          <TextField id='search' label='Adresse' value={searchTerm} onChange={handleSearchInput} variant='outlined' size='small' required />
          {
            results && (
              results.map(elem => {
                return (
                  <div className='profile_modale_form_input_results' onClick={() => handleSetAddress(elem.properties)} key={elem.properties.id}>{elem.properties.label}</div>
                )
              })
            )
          }
          <TextField id='complement' label='Bat. étage, interphone...' value={user.address?.complement} onChange={handleInputChange} variant='outlined' size='small' />
          <TextField id='postcode' label='Code postal' value={user.address?.postcode} onChange={handleInputChange} variant='outlined' size='small' required />
          <TextField id='city' label='Ville' value={user.address?.city} onChange={handleInputChange} variant='outlined' size='small' required />
        </Box>

      </ThemeProvider >
      <div style={{ display: 'flex' }}>
        <button className={styles.button} onClick={previousPage}>Précédent</button>
        <button className={styles.button} onClick={nextPage}>Validez</button>
      </div>

    </>
  )
}

const CheckoutPayment = ({ previousPage }) => {
  const cart = useSelector((state) => state.cart.cart)

  return (
    <>
      <StripeButton cart={cart} />
      <button className={styles.button} onClick={previousPage}>Précédent</button>
    </>
  )
}

export { CheckoutCart, CheckoutInformation, CheckoutPayment }