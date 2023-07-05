'use client';
import styles from './User.module.scss';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


import { openRegisterForm, handleInputFocused } from '@/src/store/reducers/Settings';
import { inputValue, setSuccessMessage, setErrorMessage, resetUser } from '@/src/store/reducers/User';

import { PasswordChecker } from '@/src/utils/passwordChecker';

import { useCurrentUser } from '@/src/hook/useCurrentUser';
import { useLogin } from '@/src/hook/useLogin';
import { useSetupUser } from '@/src/hook/useSetUser';


const UserLogin = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  // Hook to log and register user
  const { setUser } = useCurrentUser();
  const { login } = useLogin();
  const { create } = useSetupUser();


  const { user, isError, isSuccess } = useSelector((state) => state.user);
  const { isRegister, isPasswordInputFocused } = useSelector((state) => state.settings);
  const [showPassword, setShowPassword] = useState(false);

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
        if (response.id === id) router.push(`/user/profile/${response.id}`)

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
      dis
      console.log(err)
    }
  }

  // function for UX 
  const handleUserRegister = () => {
    dispatch(openRegisterForm());
    dispatch(resetUser());
    dispatch(handleInputFocused(false))
  }
  const handleFocusInput = () => dispatch(handleInputFocused(true));

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
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container_form} >
      <Box
        component="form"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style)': { m: 1, width: '100%', },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#252525 !important',
          },
          '& .MuiFormLabel-root': {
            color: '#252525 !important',
            fontSize: '0.9rem',
          }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="email" label="Email" variant="outlined" defaultValue={user.email} onChange={handleInputChange} />
        <FormControl /* sx={{ m: '1rem', width: '100%' }} */ variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
          <OutlinedInput
            id="password"
            onChange={handleInputChange}
            defaultValue={user.password}
            onFocus={handleFocusInput}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mot de passe"
          />
        </FormControl>
        {
          isRegister &&
          <FormControl /* sx={{ m: 1, width: '100%', display: 'flex' }} */ variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Confirmation mot de passe</InputLabel>
            <OutlinedInput
              id="confirmPwd"
              onChange={handleInputChange}
              defaultValue={user.confirmPwd}
              onFocus={handleFocusInput}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirmation mot de passe"
            />
          </FormControl>
        }
        {isRegister && <>
          <div className={styles.container_form_password_strength}>
            <p>le mot de passe doit contenir :</p>
            <p className={pwdChecker.hasCapital() ? 'password_check' : null}>1 majuscule</p>
            <p className={pwdChecker.hasLowercase() ? 'password_check' : null}>1 minuscule</p>
            <p className={pwdChecker.hasNumber() ? 'password_check' : null}>1 chiffre</p>
            <p className={pwdChecker.isMinLength(1) ? 'password_check' : null}>Minimum 8 caractères</p>
          </div>
          <div className={styles.container_form_password_strength_indicator}
            style={{ backgroundColor: passwordColor, width: passwordStrengthBar }} >
          </div>
        </>
        }
        {isError && <p className={styles.container_form_error}>{isError}</p>}
        {isSuccess && <p className={styles.container_form_success}>{isSuccess}</p>}
      </Box>

      <div className={styles.container_form_validate}>
        {
          isRegister ? <><p>Déjà membre, se <span onClick={handleUserRegister}>connecter</span></p>
            <button
              onClick={createUser}
              type='submit'>
              inscription
            </button></>
            :
            <><p>Pas encore inscrit, cliquez <span onClick={handleUserRegister}>ici</span></p>
              <button
                type='submit'
                onClick={loginUser}>
                Identifiez-vous
              </button></>
        }
      </div>
    </div>
  )
}

export default UserLogin;

{/* 
      <form className='user_form'>
        <div className='user_form_container'>
          <div className='user_form_input'>
            <input
              id='email'
              type='email'
              placeholder='Email'
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='user_form_input visibility'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Mot de passe'
              value={user.password}
              onChange={handleInputChange}
              onFocus={handleFocusInput}
              title='Le mot de passe doit contenir au moins 8 caractères dont 1 chiffre, 1 lettre minuscule et 1 lettre majuscule.'
              required
            />
            {showPassword ? <VisibilityOffIcon onClick={handleShowPwd} /> : <VisibilityIcon onClick={handleShowPwd} />}
          </div>
          {
            isRegister && <div className='user_form_input visibility'><input
              id='confirmPwd'
              type={showPasswordConfirm ? 'text' : 'password'}
              placeholder='Confirmation du mot de passe'
              value={user.confirmPwd}
              onChange={handleInputChange}
              required
            />
              {showPasswordConfirm ? <VisibilityOffIcon onClick={handleShowPwdConfirm} /> : <VisibilityIcon onClick={handleShowPwdConfirm} />}
            </div>
          }
        </div>


        {isPasswordInputFocused && isRegister && <div className='password_strength'>
          <label>Doit contenir :</label>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '5px' }}>
            <div className={pwdChecker.hasCapital() ? 'password_check' : null}>1 majuscule</div>
            <div className={pwdChecker.hasLowercase() ? 'password_check' : null}>1 minuscule</div>
            <div className={pwdChecker.hasNumber() ? 'password_check' : null}>1 chiffre</div>
            <div className={pwdChecker.isMinLength(1) ? 'password_check' : null}>Minimum 8 caractères</div>
          </div>
          <div style={{ backgroundColor: passwordColor, marginTop: '5px', height: '4px', width: passwordStrengthBar, borderRadius: '10px' }} />
        </div>
        }
        {isError && <p className='user_form_error'>{isError}</p>}
        {isSuccess && <p className='user_form_success'>{isSuccess}</p>}

        <div className='user_form_validate'>
          {
            isRegister ? <><p>Déjà membre, se <span onClick={handleUserRegister}>connecter</span></p>
              <button
                onClick={createUser}
                type='submit'>
                S&apos;inscrire
              </button></>
              :
              <><p>Pas encore inscrit, cliquez <span onClick={handleUserRegister}>ici</span></p>
                <button
                  type='submit'
                  onClick={loginUser}>
                  Valider
                </button></>
          }
        </div>
      </form> */}