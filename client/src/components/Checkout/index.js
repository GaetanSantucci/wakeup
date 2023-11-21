'use client';
import styles from './Checkout.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { use, useState } from 'react';
import { inputValue } from '@/src/store/reducers/User';
import { addDeliveryCost } from '@/src/store/reducers/Cart';

import { AddOrDeleteItems, PayPalButtonComponent } from '../Button';
import { StripeButton } from '@/src/components/Button';
import { CustomCalendar } from '../Calendar';

import { getTotal } from '@/src/utils/getCartTotal';

import { Alert, Stack, Paper, InputBase, IconButton, Box, Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import useMediaQuery from '@mui/material/useMediaQuery';

import { getArea } from '/src/libs/getDeliveryArea.js';

const areaFetch = getArea(); // fetch to database for delivery area

const CheckoutCart = ({ nextPage }) => {
  const allCart = useSelector((state) => state.cart)

  // check that there is at least one tray in the cart
  const hasPlateauItem = allCart.cart.some(elem => elem.category === 'plateau');

  const { isDateDisable } = useSelector((state) => state.settings)

  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Résumé de votre commande</h3>
        {
          allCart.cart.map(elem => {
            return (
              <div className='cart_modale_item' style={{ width: '100%' }} key={elem.name}>
                <div className='cart_modale_item_img'>
                  <Image src={`/images/${elem.img}.webp`} alt={elem.name} width={50} height={75} />
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
          getTotal(allCart.cart).totalQuantity === 0 ? <p>Il ne se passe pas grand chose par là, commencez votre commande <Link href='/plateau' style={{ textDecoration: 'underline' }}>ici</Link></p>
            :
            <>
              <p className={styles.container_checkout_desc}>Nombre d&apos;articles dans votre panier : {getTotal(allCart.cart).totalQuantity}</p>
              <p className={styles.container_checkout_desc}>Montant du panier : {getTotal(allCart.cart).totalPrice.toFixed(2)}<span>€</span></p>
              <div className={styles.container_calendar}>
                {
                  hasPlateauItem ? <CustomCalendar /> : 
                  <Alert severity="warning" sx={{ mt: 2 }}>Votre commande doit contenir au minimum un plateau, les suppléments ne peuvent être vendus seuls, continuez vos achats <Link href='/plateau' style={{ textDecoration: 'underline' }}>
                  ici
                </Link></Alert>
                
                }
              </div>
            </>
        }
      </div>
      {isDateDisable && <Alert severity="error" sx={{ m: 2 }}>Date non valide, merci de choisir une date disponible dans le calendrier</Alert>}
      <div className={styles.checkout_button}>

        {allCart.bookingDate && !isDateDisable ? <button onClick={nextPage}>Validez</button> : null}

      </div>
    </>
  )
}



const CheckoutInformation = ({ previousPage, nextPage }) => {

  const isMobile = useMediaQuery('(max-width:768px)');

  const data = use(areaFetch);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)

  // Dynamic method for store input by type
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(inputValue({ inputType: id, value }));
  };

  // check if all my input are completed
  const isInformationComplete = () => {
    return (
      user.lastname &&
      user.firstname &&
      user.email &&
      user.phone &&
      user.address.line1 &&
      user.address.city
    );
  };

  const handleCity = (e, value) => {
    dispatch(inputValue({ inputType: 'city', value: value?.city }))
    dispatch(inputValue({ inputType: 'postcode', value: value?.postcode }))
    dispatch(addDeliveryCost(value?.price))
  }
  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Saisie de vos informations</h3>
        <form className={styles.container_checkout_form}>
          <div className={isMobile ? `${styles.container_checkout_form_50_column}` : `${styles.container_checkout_form_50}`} >
            <TextField id='lastname'
              label='Nom'
              value={user.lastname}
              onChange={handleInputChange}
              variant='standard'
              size='small'
              sx={{ mb: 2, width: isMobile ? '100%' : '45%' }}
              required />
            <TextField id='firstname'
              label='Prénom'
              value={user.firstname}
              onChange={handleInputChange}
              variant='standard'
              size='small'
              sx={{ mb: 2, width: isMobile ? '100%' : '45%' }}
              required />
          </div>
          <div className={isMobile ? `${styles.container_checkout_form_50_column}` : `${styles.container_checkout_form_50}`}>
            <TextField id='email'
              label='Email'
              value={user.email}
              onChange={handleInputChange}
              type='email'
              variant='standard'
              size='small'
              sx={{ mb: 2, width: isMobile ? '100%' : '45%' }}
              required />
            <TextField id='phone'
              label='Téléphone'
              value={user.phone}
              onChange={handleInputChange}
              type='tel'
              variant='standard'
              size='small'
              sx={{ mb: 2, width: isMobile ? '100%' : '45%' }}
              required />
          </div>
          <div className={isMobile ? `${styles.container_checkout_form_50_column}` : `${styles.container_checkout_form_50}`}>
            <TextField
              id='line1'
              className={styles.container_information_input}
              label='Adresse'
              value={user.address?.line1}
              onChange={handleInputChange}
              variant='standard'
              autoComplete='off'
              size='small'
              sx={{ mb: 2, width: isMobile ? '100%' : '45%' }}
              required />
            <TextField id='line2'
              label='Bât., étage, interphone...'
              value={user.address?.line2}
              onChange={handleInputChange}
              variant='standard'
              size='small'
              sx={{ mb: 2, width: isMobile ? '100%' : '45%' }} />
          </div>

          <div className={styles.container_checkout_form_100}>
            <Autocomplete
              id="city"
              onChange={handleCity}
              sx={{ width: isMobile ? '90%' : '45%' }}
              options={data}
              autoHighlight
              getOptionLabel={(option) => option.city}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.city}>
                  {option.city} - {option.postcode}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={user.address?.city || "Choisissez votre ville"}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                  size='small'
                  onChange={handleCity}
                  variant="standard"
                />
              )}
            />
            <div className={styles.container_information}>

            </div>
          </div>
        </form>
      </div>
      <div className={styles.checkout_button}>
        <button onClick={previousPage}>Précédent</button>
        {
          isInformationComplete() ?
            <button onClick={nextPage}>Validez</button> : null
        }

      </div>
    </>
  )
}



const CheckoutPayment = ({ previousPage }) => {

  const isMobile = useMediaQuery('(max-width:768px)');

  const allCart = useSelector((state) => state.cart);
  const [voucherInput, setVoucherInput] = useState('');
  const [voucherAmount, setVoucherAmount] = useState('');
  const [voucherMessage, setVoucherMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [cartAmount, setCartAmount] = useState('')

  // Dynamic method for store input by type
  const handleInputChange = (e) => {
    setVoucherInput(formatInput(e.target.value))
    const newValue = formatInput(e.target.value)
  };

  const submitVoucherResearch = async () => {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT

    setVoucherMessage('')
    setErrorMessage('')
    setVoucherAmount('')

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ voucherId: voucherInput })
    }
    try {
      const res = await fetch(`${endpoint}vouchers`, options)
      const result = await res.json()

      if (result.id) {
        setVoucherAmount(result.initial_amount - result.amount_used);

        if (voucherAmount <= 0) {
          setVoucherMessage(`Fonds insuffisants, bon utilisé le ${result.date_use.split('T')[0]}`)
        }
        const price = (totalIncludeDelivery - voucherAmount).toFixed(2)
        setCartAmount(price);


      } else {
        setErrorMessage(result.message)
        setTimeout(() => {
          setErrorMessage('')

        }, 2500)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Function to format the input value
  const formatInput = (value) => {
    // Remove any non-alphanumeric characters
    const alphanumericValue = value.replace(/[^A-Za-z0-9]/g, '');

    // Use regular expressions to format the value
    const formattedValue = alphanumericValue.replace(/(\w{3})(\w{3})(\w{3})/, '$1-$2-$3');

    return formattedValue;
  };

  const openVoucherInput = () => {
    setIsInputVisible(!isInputVisible)
  }

  const totalIncludeDelivery = Number(getTotal(allCart.cart).totalPrice.toFixed(2)) + Number(allCart.deliveryCost)
  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Choisissez votre mode de paiement</h3>
        <div className={styles.container_checkout_payment} >
          <div className={styles.container_checkout_payment_resume}>
            <p>Résumé :</p>
            <p>Livraison de votre petit déjeune le : {allCart.bookingDate}</p>
            <ul>
              {
                allCart.cart.map(item => {
                  const totalPrice = (item.quantity * item.price).toFixed(2);
                  // const price = totalPrice.toString().replace('.', ',');
                  return (
                    <li key={item.name}><BakeryDiningIcon /> {item.quantity} {item.name} : <span> {totalPrice} €</span></li>
                  )
                })
              }
            </ul>
            <p>Frais de livraison : {allCart.deliveryCost} €</p>

            <p>Montant {cartAmount ? 'restant après déduction du bon' : 'total'}: {cartAmount ? cartAmount : totalIncludeDelivery} €</p>
            <div className={styles.container_checkout_payment_resume_100}>
              <p className={styles.container_checkout_payment_resume_voucher}>Carte cadeau à déduire ? cliquez <span onClick={openVoucherInput}>ici</span></p>
              <div className={isInputVisible ? `${styles.container_checkout_payment_resume_voucher_input} ${styles.input_active}` : `${styles.container_checkout_payment_resume_voucher_input}`}>
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', mb: 2, display: 'flex', alignItems: 'center', width: '100%', m: isMobile ? '0 !important' : 2 }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Numéro du bon cadeau"
                    value={voucherInput}
                    onChange={handleInputChange}
                    inputProps={{ 'aria-label': 'bon cadeau' }}
                  />
                  <IconButton onClick={submitVoucherResearch} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </div>
              {
                voucherAmount > 0 &&
                <Stack  >
                  <Alert severity="success">
                    Le montant du bon est de {voucherAmount} !
                  </Alert>
                </Stack>
              }
              {
                voucherAmount <= 0 && voucherMessage &&
                <Stack  >
                  <Alert severity="warning">
                    {voucherMessage}
                  </Alert>
                </Stack>
              }
              {
                errorMessage &&
                <Stack  >
                  <Alert severity="error">
                    {errorMessage}
                  </Alert>
                </Stack>
              }
            </div>
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