'use client';
import styles from './Checkout.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { useState, use } from 'react';
import { inputValue, setAddress } from '@/src/store/reducers/User';
import { addDeliveryCost } from '@/src/store/reducers/Cart';

import { AddOrDeleteItems, PayPalButtonComponent } from '../Button';
import { StripeButton } from '@/src/components/Button';
import { CustomCalendar } from '../Calendar';

import { getTotal } from '@/src/libs/getCartTotal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoomIcon from '@mui/icons-material/Room';

import { getArea } from '/src/libs/getDeliveryArea.js';
import { useMediaQuery } from '@/src/hook/useMediaQuery';




const areaFetch = getArea(); // fetch to database for delivery area

const CheckoutCart = ({ nextPage }) => {
  const allCart = useSelector((state) => state.cart)

  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Résumé de votre commande</h3>
        {
          allCart.cart.map(elem => {
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
          getTotal(allCart.cart).totalQuantity === 0 ? <p>Votre panier est vide, commencez vos achats <Link href='/plateau' style={{ textDecoration: 'underline' }}>ici</Link></p>
            :
            <>
              <p className={styles.container_checkout_desc}>Nombre d&apos;articles dans votre panier : {getTotal(allCart.cart).totalQuantity}</p>
              <p className={styles.container_checkout_desc}>Montant du panier : {getTotal(allCart.cart).totalPrice.toFixed(2)}<span>€</span></p>
              <div className={styles.container_calendar}>
                <CustomCalendar />
              </div>
            </>
        }
      </div>
      <div className={styles.checkout_button}>
        {allCart.bookingDate && <button onClick={nextPage}>Validez</button>}

      </div>
    </>
  )
}



const CheckoutInformation = ({ previousPage, nextPage }) => {

  const data = use(areaFetch);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState('' || user.address.name);
  const [results, setResults] = useState(null); // to display the result of the addresses following the api data.gouv fetch
  const [isDeliverableCity, setIsDeliverableCity] = useState([]); // to display if the city is in our database
  const [notInOurZone, setNotInOurZone] = useState(true); // to manage error if city is not in our area
  const [errorCity, setErrorCity] = useState(false);


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

  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    let customerCity = value.toLowerCase();
    if (id === 'city') {
      const result = data.filter(o =>
        o.name.toLowerCase().includes(customerCity));
      console.log('result:', result);
      if (result.length >= 1) {
        setIsDeliverableCity(result)
        // if (result[0].name.toLowerCase() === customerCity) {
        //   console.log("Je passe dans le if");
        //   dispatch(addDeliveryCost(result[0].price))
        // }

      } else {
        setErrorCity(true)
        setNotInOurZone(true);
      }
    }
    dispatch(inputValue({ inputType: id, value }));
  };

  const handleSetAddress = (elem) => {
    dispatch(inputValue({ inputType: 'city', value: elem.name }))
    dispatch(inputValue({ inputType: 'postcode', value: elem.postcode }))
    dispatch(addDeliveryCost(elem.price))
    setNotInOurZone(false)
    setIsDeliverableCity([])
  }



  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Saisie de vos informations</h3>
        <ThemeProvider theme={theme}>
          <Box
            component='form'
            sx={{
              width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', /* margin: '8rem 0 2rem 0' */
              '& > :not(style)': { m: '0.8rem', width: widthElement, fontSize: '0.8rem' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField id='lastname' label='Nom' value={user.lastname} onChange={handleInputChange} variant='outlined' size='small' required />
            <TextField id='firstname' label='Prénom' value={user.firstname} onChange={handleInputChange} variant='outlined' size='small' required />
            <TextField id='phone' label='Téléphone' value={user.phone} onChange={handleInputChange} type='tel' variant='outlined' size='small' required />
            {/* <div className={styles.container_information}> */}
            <TextField id='name' className={styles.container_information_input} label='Adresse' value={user.address?.name} onChange={handleInputChange} variant='outlined' autoComplete='off' size='small' required />
            <TextField id='complement' label='Bat. étage, interphone...' value={user.address?.complement} onChange={handleInputChange} variant='outlined' size='small' />
            <TextField id='postcode' label='Code postal' value={user.address?.postcode} onChange={handleInputChange} variant='outlined' size='small' required />
            <div className={styles.container_information}>
              <TextField id='city' className={styles.container_information_input} label='Ville' value={user.address?.city} onChange={handleInputChange} variant='outlined' size='small' required />
              <div className={styles.container_information_address} >
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
              </div>
            </div>
          </Box>

        </ThemeProvider >
      </div>
      <div className={styles.checkout_button}>
        <button onClick={previousPage}>Précédent</button>
        {
          !notInOurZone || user.address.city ? <button onClick={nextPage}>Validez</button> : null
        }
      </div>
    </>
  )
}

const CheckoutPayment = ({ previousPage }) => {
  const allCart = useSelector((state) => state.cart)
  const deliveryCost = allCart.deliveryCost.toString().replace('.', ',');

  const totalIncludeDelivery = Number(getTotal(allCart.cart).totalPrice.toFixed(2)) + Number(allCart.deliveryCost)
  console.log('totalIncludeDelivery:', totalIncludeDelivery);

  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Choisissez votre mode de paiement</h3>
        <div className={styles.container_checkout_payment} >
          <div className={styles.container_checkout_payment_resume}>
            <p>Résumé :</p>
            <p>Livraison le {allCart.bookingDate}</p>
            <ul>
              {
                allCart.cart.map(item => {
                  const totalPrice = (item.quantity * item.price).toFixed(2);
                  const price = totalPrice.toString().replace('.', ',');
                  return (
                    <li key={item.name}>{item.quantity} {item.name} <span> total : {price} €</span></li>
                  )
                })
              }
            </ul>
            <p>Frais de livraison : {deliveryCost} €</p>
            <p>Montant total : {totalIncludeDelivery} €</p>
          </div>
          <div className={styles.container_checkout_payment_resume_button}>
            <StripeButton cart={allCart} />
            <PayPalButtonComponent />
          </div>
        </div>
      </div>
      <div className={styles.checkout_button}>
        <button onClick={previousPage}>Précédent</button>
      </div>
    </>
  )
}

export { CheckoutCart, CheckoutInformation, CheckoutPayment }