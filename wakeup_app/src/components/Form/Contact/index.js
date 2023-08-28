'use client';
import styles from './Contact.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import { inputValue } from '@/src/store/reducers/User';
import { useMediaQuery } from '@/src/hook/useMediaQuery';


export default function Contact() {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  console.log('user:', user.email);

  // const [lastname, setLastname] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false)
  console.log('message:', message);
  const [sendMailSuccess, setsendMailSuccess] = useState(false);

  // const Modal = () => {
  //   return (
  //     <div className={styles.contact_form__success}>Email envoyé avec succès !</div>
  //   )
  // }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (sendMailSuccess) {
      setsendMailSuccess(false);
    }
  };

  const isInformationComplete = (data) => {
    if (!data.lastname) setErrorMessage(true);
    console.log("error message", errorMessage);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    //todo mettre conditions pour checker que c'est requis

    // Get data from the form.
    let data = {
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      phone: user.phone,
      message: message
    }

    isInformationComplete(data)
    console.log('isInformationComplete(data) :', isInformationComplete(data));
    console.log('data:', data);

    const JSONdata = JSON.stringify(data)

    // const endpoint = 'https://wakeupclf.fr/api/v1/contact'
    const endpoint = 'http://localhost:7777/api/v1/contact'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()
    // display modal  
    if (result) {
      setsendMailSuccess(true)
      // setMessage('')

      setTimeout(() => {
        setsendMailSuccess(false);
      }, 2500);
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputValue({ inputType: id, value }));
  };


  return (
    <div className={styles.container_contact}>
      <h2 className={styles.container_contact_title}>Contactez nous</h2>
      <form onSubmit={handleFormSubmit} className={styles.container_contact_form}>
        <div className={styles.container_contact_form_50}>
          <TextField id='lastname'
            label='Nom'
            value={user.lastname}
            onChange={handleInputChange}
            variant='outlined'
            size='small'
            sx={{ mb: 2, width: '49%' }}
            required />
          <TextField id='firstname'
            label='Prénom'
            value={user.firstname}
            onChange={handleInputChange}
            variant='outlined'
            size='small'
            sx={{ mb: 2, width: '49%' }}
            required />
        </div>
        <div className={styles.container_contact_form_50}>
          <TextField id='phone'
            label='Téléphone'
            value={user.phone}
            onChange={handleInputChange}
            type='tel'
            variant='outlined'
            size='small'
            sx={{ mb: 2, width: '49%' }}
            required />

          <TextField id='email'
            label='Email'
            value={user.email}
            onChange={handleInputChange}
            variant='outlined'
            size='small'
            sx={{ mb: 2, width: '49%' }}
            error={errorMessage}
            helperText={errorMessage ? "Merci de saisir votre email" : ''} required />
        </div>
        <div className={styles.container_contact_form_100}>
          <TextField
            id="message"
            multiline
            rows={6}
            value={message}
            label='Saisissez votre message'
            onChange={(e) => setMessage(e.target.value)}
            pattern='^[a-zA-Z0-9 !,.%()]+$'
            sx={{ mb: 1.4, width: '100%' }}
            required
            error={message === ""}
            helperText={message === "" ? "Merci de saisir votre message" : ''}
          />
        </div>
        <button className={sendMailSuccess ? `${styles.button} ${styles.button_success}` : `${styles.button}`} type='submit' onClick={handleFormSubmit}>{sendMailSuccess ? <CheckOutlinedIcon /> : 'Envoyer'}</button>
      </form>
    </div>
  )
}