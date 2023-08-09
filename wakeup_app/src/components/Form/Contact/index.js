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

  const handleSubmit = async (e) => {
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
      setMessage('')

      setTimeout(() => {
        setsendMailSuccess(false);
      }, 2500);
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputValue({ inputType: id, value }));
  };

  const isBreakpoint = useMediaQuery(768) // Custom hook to check screen size, return boolean
  let widthElement = '45%'
  if (isBreakpoint) {
    widthElement = '100%' // To display calendar in middle of the page
  }

  return (
    <div className={styles.container_contact}>
      <h2 className={styles.container_contact_title}>N&apos;hésitez pas à nous contacter</h2>
      <div className={styles.container_contact_form}>
        <Box
          component='form'
          sx={{
            width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', /* margin: '8rem 0 2rem 0' */
            '& > :not(style)': { m: '0.8rem', width: widthElement, fontSize: '0.8rem' },
            '& > :nth-child(5)': { width: '93%' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#252525 !important',
            },
            '& .MuiFormLabel-root': {
              color: '#252525 !important',
              fontSize: '0.9rem',
            }
          }}
          noValidate
          autoComplete='off'
        >
          <TextField id='lastname' label='Nom' value={user.lastname} onChange={handleInputChange} variant='outlined' size='small' required />
          <TextField id='firstname' label='Prénom' value={user.firstname} onChange={handleInputChange} variant='outlined' size='small' required />

          <TextField id='phone' label='Téléphone' value={user.phone} onChange={handleInputChange} type='tel' variant='outlined' size='small' required />

          <TextField id='email' label='Email' value={user.email} onChange={handleInputChange} variant='outlined' size='small' required />
          <TextField
            id="message"
            multiline
            rows={6}
            value={message}
            label='Saisissez votre message'
            onChange={(e) => setMessage(e.target.value)}
            pattern='^[a-zA-Z0-9 !,.%()]+$'
          />
        </Box>
        <button className={sendMailSuccess ? `${styles.button} ${styles.button_success}` : `${styles.button}`} type='submit' onClick={handleSubmit}>{sendMailSuccess ? <CheckOutlinedIcon /> : 'Envoyer'}</button>
      </div>
      {/* {modal && <Modal />} */}
    </div>
  )
}
{/* <form className={`${styles.contact_form} ${styles.row}`} onSubmit={handleSubmit}>
<div className={`${styles.form_field} ${styles.col} ${styles.x_50}`}>
  <input id='lastname' className={lastname.length > 0 ? `${styles.not_empty} ${styles.input_text} ${styles.js_input}` : `${styles.input_text} ${styles.js_input}`}
    type='text'
    value={lastname}
    onChange={(e) => setLastname(e.target.value)}
    required />
  <label className={styles.label} htmlFor='lastname'>Nom</label>
</div>
<div className={`${styles.form_field} ${styles.col} ${styles.x_50}`}>
  <input id='firstname' className={firstname.length > 0 ? `${styles.not_empty} ${styles.input_text} ${styles.js_input}` : `${styles.input_text} ${styles.js_input}`}
    type='text'
    value={firstname}
    onChange={(e) => setFirstname(e.target.value)}
    required />
  <label className={styles.label} htmlFor='firstname'>Prénom</label>
</div>
<div className={`${styles.form_field} ${styles.col} ${styles.x_50}`}>
  <input id='email' className={email.length > 0 ? `${styles.not_empty} ${styles.input_text} ${styles.js_input}` : `${styles.input_text} ${styles.js_input}`}
    type='email'
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required />
  <label className={styles.label} htmlFor='email'>Email</label>
</div>
<div className={`${styles.form_field} ${styles.col} ${styles.x_50}`}>
  <input id='phone' className={phone.length > 0 ? `${styles.not_empty} ${styles.input_text} ${styles.js_input}` : `${styles.input_text} ${styles.js_input}`}
    type='tel'
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    required />
  <label className={styles.label} htmlFor='phone'>Téléphone</label>
</div>

<div className={`${styles.form_field} ${styles.col} ${styles.x_100} ${styles.align_center}`}>
  <textarea id='message' className={message.length > 0 ? `${styles.not_empty} ${styles.input_text} ${styles.js_input}` : `${styles.input_text} ${styles.js_input}`}
    value={message}
    placeholder='Saisissez votre message'
    onChange={(e) => setMessage(e.target.value)}
    pattern='^[a-zA-Z0-9 !,.%()]+$'
    required />
</div>
<div className={`${styles.form_field} ${styles.col} ${styles.x_100}`}>
  <button className={styles.button} type='submit'>Envoyer</button>
</div>
// </form> */}