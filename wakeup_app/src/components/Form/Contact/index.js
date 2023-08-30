'use client';
import styles from './Contact.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';

import { inputValue } from '@/src/store/reducers/User';


export default function Contact() {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  console.log('user:', user.email);

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false)
  const [message, setMessage] = useState("");
  const [sendMailSuccess, setsendMailSuccess] = useState(false);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (sendMailSuccess) {
      setsendMailSuccess(false);
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault()
    //todo mettre conditions pour checker que c'est requis
    setErrorName(false)
    setErrorEmail(false)
    setErrorMessage(false)

    // Get data from the form.
    let data = {
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      phone: user.phone,
      message: message
    }
    console.log('data.email:', data.email);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(data.email);
    console.log('isValidEmail:', isValidEmail);

    if (user.email === '' || isValidEmail === false) return setErrorEmail(true)
    // Check if the email matches the pattern using a regular expression
    if (user.lastname === '') return setErrorName(true)
    if (message === '') return setErrorMessage(true)

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
      setMessage('');

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
            variant='standard'
            size='small'
            sx={{ mb: 2, width: '47%' }}
            error={errorName}
            helperText={errorName ? 'Merci de saisir votre nom' : ''}
            required />
          <TextField id='firstname'
            label='Prénom'
            value={user.firstname}
            onChange={handleInputChange}
            variant='standard'
            size='small'
            sx={{ mb: 2, width: '47%' }}
            required />
        </div>
        <div className={styles.container_contact_form_50}>
          <TextField id='email'
            label='Email'
            type='email'
            value={user.email}
            onChange={handleInputChange}
            variant='standard'
            size='small'
            sx={{ mb: 2, width: '47%' }}
            error={errorEmail}
            helperText={errorEmail ? 'Email manquant ou invalide' : ''} required />
          <TextField id='phone'
            label='Téléphone'
            value={user.phone}
            onChange={handleInputChange}
            type='tel'
            variant='standard'
            size='small'
            sx={{ mb: 2, width: '47%' }}
            required
          />
        </div>
        <div className={styles.container_contact_form_100}>
          <TextField
            id="message"
            multiline
            variant="standard"
            rows={6}
            value={message}
            label='Saisissez votre message'
            onChange={(e) => setMessage(e.target.value)}
            pattern='^[a-zA-Z0-9 !,.%()]+$'
            sx={{ mb: 1.4, width: '100%' }}
            required
            error={errorMessage}
            helperText={errorMessage ? 'Merci de saisir votre message' : ''}
          />
        </div>
        <button className={sendMailSuccess ? `${styles.button} ${styles.button_success}` : `${styles.button}`} type='submit' onClick={handleFormSubmit}>{sendMailSuccess ? <CheckIcon /> : 'Envoyer'}</button>
      </form>
    </div>
  )
}