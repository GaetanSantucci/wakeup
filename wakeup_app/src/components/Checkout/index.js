'use client';
import styles from './Checkout.module.scss';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, use } from 'react';
import { inputValue, setAddress } from '@/src/store/reducers/User';
import { getArea } from '/src/libs/getDeliveryArea.js';

import { AddOrDeleteItems, PaypalButton } from '../Button';
import { StripeButton } from '@/src/components/Button';
import { CustomCalendar } from '../Calendar';

import { getTotal } from '@/src/libs/getCartTotal';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoomIcon from '@mui/icons-material/Room';

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
      <div className={styles.checkout_button}>
        <button onClick={nextPage}>Validez</button>
      </div>
    </>
  )
}

const areaFetch = getArea();

const CheckoutInformation = ({ previousPage, nextPage }) => {

  const data = use(areaFetch);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)
  // state of address research
  const [searchTerm, setSearchTerm] = useState('' || user.address.name);
  const [results, setResults] = useState(null);
  const [isAvailable, setIsAvailable] = useState();
  const [notInOurZone, setNotInOurZone] = useState();


  const handleSearchInput = async (event) => {
    if (event.target.value < 4) setResults([])
    setSearchTerm(event.target.value)

    if (searchTerm.length > 4) {
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${event.target.value}&type=housenumber&autocomplete=1`)
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
    const { label, name, postcode } = elem
    const customerCity = elem.city.toLowerCase();

    const result = data.filter(o =>
      o.city.toLowerCase().includes(customerCity));
    console.log('result:', result);

    if (result.length !== 0) {
      setNotInOurZone(false);
      // setInputValue('')
      setIsAvailable(result[0]);
      dispatch(setAddress({ label, name, city: result[0].city, postcode }))

    } else {
      setIsAvailable(null)
      setNotInOurZone(true);
    }

    // Results to undefined to close div research
    setSearchTerm(name)
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
  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputValue({ inputType: id, value }));
  };

  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Saisie de vos informations</h3>
        <ThemeProvider theme={theme}>
          <Box
            component='form'
            sx={{
              width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', /* margin: '8rem 0 2rem 0' */
              '& > :not(style)': { m: '0.8rem', width: '45%', fontSize: '0.8rem' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField id='lastname' label='Nom' value={user.lastname} onChange={handleInputChange} variant='outlined' size='small' required />
            <TextField id='firstname' label='Prénom' value={user.firstname} onChange={handleInputChange} variant='outlined' size='small' required />
            <TextField id='phone' label='Téléphone' value={user.phone} onChange={handleInputChange} type='tel' variant='outlined' size='small' required />
            <div className={styles.container_information}>
              <TextField id='search' className={styles.container_information_input} label='Adresse' value={searchTerm || user.address?.name} onChange={handleSearchInput} variant='outlined' size='small' required />
              <div className={styles.container_information_address} >
                <div className={styles.container_information_address_block} >
                  {
                    results && (
                      results.map(elem => {
                        return (
                          <div className={styles.container_information_address_block_result} onClick={() => handleSetAddress(elem.properties)} key={elem.properties.id}><RoomIcon fontSize='small' /> {elem.properties.label}</div>
                        )
                      })
                    )
                  }
                </div>
              </div>
            </div>
            <TextField id='complement' label='Bat. étage, interphone...' value={user.address?.complement} onChange={handleInputChange} variant='outlined' size='small' />
            <TextField id='postcode' label='Code postal' value={user.address?.postcode || ''} onChange={handleInputChange} variant='outlined' size='small' required />
            <TextField id='city' label='Ville' value={user.address?.city || ''} onChange={handleInputChange} variant='outlined' size='small' required />
          </Box>

        </ThemeProvider >
      </div>
      <div className={styles.checkout_button}>
        <button onClick={previousPage}>Précédent</button>
        <button onClick={nextPage}>Validez</button>
      </div>
    </>
  )
}

const CheckoutPayment = ({ previousPage }) => {
  const cart = useSelector((state) => state.cart.cart)

  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Choisissez votre mode de paiement</h3>

        <StripeButton cart={cart} />
        <PaypalButton />
      </div>
      <div className={styles.checkout_button}>
        <button onClick={previousPage}>Précédent</button>
      </div>
    </>
  )
}

export { CheckoutCart, CheckoutInformation, CheckoutPayment }