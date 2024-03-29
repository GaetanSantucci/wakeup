'use client';
import styles from './User.module.scss';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


import { openRegisterForm, toggleLoginModale, toggleShowNavbar } from '@/src/store/reducers/Settings';
import { inputValue, setSuccessMessage, setErrorMessage, resetUser } from '@/src/store/reducers/User';

import { PasswordChecker } from '@/src/utils/passwordChecker';

import { useCurrentUser } from '@/src/hook/useCurrentUser';
import { useLogin } from '@/src/hook/useLogin';
import { useSetupUser } from '@/src/hook/useSetUser';


const UserLogin = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // Hook to log and register user
  const { setUser } = useCurrentUser();
  const { login } = useLogin();
  const { create } = useSetupUser();


  const { user, isError, isSuccess } = useSelector((state) => state.user);
  const { isRegister } = useSelector((state) => state.settings);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotEmail, setIsForgotEmail] = useState(false);
  const [isSenduserEmail, setSenduserEmail] = useState(false);
  // const [isCreateUser, setIsCreateUser] = useState(false);

  // Remove alert pop message 
  useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorMessage(''))
      dispatch(setSuccessMessage(''))
    }, 3000)
  }, [dispatch, isError, isSuccess])


  const loginUser = async (event) => {

    event.preventDefault();

    if (!user.email || !user.password) {
      dispatch(setErrorMessage('Merci de saisir votre email et votre mot de passe'))
    } else {
      try {
        const { id, errorMessage } = await login(user.email, user.password);

        if (errorMessage) return dispatch(setErrorMessage(errorMessage))

        const response = await setUser(id)

        if (response.id === id) {
          dispatch(toggleLoginModale())
          dispatch(toggleShowNavbar())

          if (response.role === 'admin') {
            router.push('/admin/dashboard')
          } else {
            router.push(`/user/profile/${response.id}`)
          }
        }

      } catch (err) {
        console.log(err)
      }
    }
  }

  const createUser = async (event) => {

    event.preventDefault();

    if (!user.email || !user.password || !user.confirmPwd) return dispatch(setErrorMessage('Merci de saisir votre email et votre mot de passe'))
    if (user.password !== user.confirmPwd) return dispatch(setErrorMessage('Les mots de passe ne correspondent pas.'));

    try {
      const newUser = await create(user.email, user.password)

      if (newUser !== 'Votre compte a bien été créé !') return dispatch(setErrorMessage(newUser))

      dispatch(setSuccessMessage("Votre compte a bien été crée !"))
      dispatch(openRegisterForm());
      // dispatch(toggleShowPassword())

    } catch (err) {
      console.log(err)
    }
  }

  // function for UX 
  const handleUserRegister = () => {
    dispatch(openRegisterForm());
    dispatch(resetUser());
    // dispatch(handleInputFocused(false))
  }
  // const handleFocusInput = () => dispatch(handleInputFocused(true));

  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputValue({ inputType: id, value }));
  };

  // Logic for display and customize the constraints for password with indicator text and color
  const pwdChecker = new PasswordChecker(user.password)
  const passwordColor = pwdChecker.getPasswordColor();
  const passwordStrengthBar = pwdChecker.getPasswordStrengthBarWidth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlePasswordResetEmail = () => {
    setIsForgotEmail(!isForgotEmail);
  }

  const sendMailResetPassword = async (event) => {

    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email
      }),
    }

    const response = await fetch(`${endpoint}/send_email_reset`, options)

    if (response.ok) {
      setSenduserEmail(true)
      setTimeout(() => {
        setSenduserEmail(false)

      }, 2500)
    }
  }

  return (
    <form className={styles.container_form} >
      <div className={styles.container_form_input} >
        <TextField id="email"
          label="Email"
          variant="standard"
          defaultValue={user.email}
          onChange={handleInputChange}
          sx={{ width: '90%', mb: 1 }}
          size='small'
          required
        />
        {
          !isForgotEmail &&
          <FormControl sx={{ width: '90%', mb: 1 }}
            variant="standard"
            size='small'
            required
          >
            <InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>
            <Input
              id="password"
              onChange={handleInputChange}
              defaultValue={user.password}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mot de passe"
            />
          </FormControl>
        }
        {
          !isRegister && !isForgotEmail &&
          <div className={styles.container_form_input_reset}
            onClick={handlePasswordResetEmail}>
            <span>Mot de passe oublié ?</span>
          </div>
        }
        {
          !isRegister && isForgotEmail &&
          <div className={styles.container_form_input_reset}
            onClick={handlePasswordResetEmail}>
            <span>Saissisez votre email afin de réinitialiser votre mot de passe</span>
          </div>
        }
        {
          isRegister && <>
            <FormControl sx={{ width: '90%', mb: 3 }}
              variant="standard"
              size='small'
              required
            >
              <InputLabel htmlFor="standard-adornment-password">Confirmation mot de passe</InputLabel>
              <Input
                id="confirmPwd"
                onChange={handleInputChange}
                defaultValue={user.confirmPwd}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmation mot de passe"
              />
            </FormControl>
            <div className={styles.container_form_input_checkbox}>
              <Checkbox
                id='newsletter_optin'
                size='small'
                onChange={handleInputChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: '#424242',
                  '&.Mui-checked': {
                    color: '#202020',
                  }

                }}
              />
              <p>Recevoir newsletter, offres promotionnelles.</p>
            </div>
          </>
        }
        {
          isError &&
          <Stack sx={{ m: 2 }} >
            <Alert severity="error">
              {isError}
            </Alert>
          </Stack>}
        {
          isSenduserEmail &&
          <Stack sx={{ m: 2 }} >
            <Alert severity="success">
              Email envoyé, vérifiez votre messagerie
            </Alert>
          </Stack>
        }
        {
          isSuccess &&
          <Stack sx={{ m: 2 }} >
            <Alert severity="success">
              {isSuccess}
            </Alert>
          </Stack>
        }
      </div>
      {
        isRegister &&
        <>
          <div className={styles.container_form_password_strength}>
            <p>Le mot de passe doit contenir :</p>
            <p className={pwdChecker.hasCapital() ? `${styles.password_check}` : null}>1 majuscule</p>
            <p className={pwdChecker.hasLowercase() ? `${styles.password_check}` : null}>1 minuscule</p>
            <p className={pwdChecker.hasNumber() ? `${styles.password_check}` : null}>1 chiffre</p>
            <p className={pwdChecker.isMinLength(1) ? `${styles.password_check}` : null}>Minimum 8 caractères</p>
          </div>
          <div style={{ width: '90%', textAlign: 'start' }}>
            <div className={styles.container_form_password_strength_indicator}
              style={{ backgroundColor: passwordColor, width: passwordStrengthBar }} >
            </div>
          </div>
        </>
      }

      <div className={styles.container_form_validate}>
        {
          isRegister ? <><p>Déjà membre, se <span onClick={handleUserRegister}>connecter</span></p>
            <button
              onClick={createUser}
              type='submit'>
              Inscription
            </button></>
            :
            <><p>Pas encore inscrit, cliquez <span onClick={handleUserRegister}>ici</span></p>
              <button
                type='submit'
                onClick={isForgotEmail ? sendMailResetPassword : loginUser}>
                {
                  isForgotEmail ? "Réinitialisation du mot de passe" : "Identifiez-vous"
                }

              </button></>
        }
      </div>
    </form>
  )
}

export default UserLogin;
