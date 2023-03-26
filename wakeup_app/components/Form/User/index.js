'use client';
import './user.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { openRegisterForm, toggleShowPassword, toggleShowPasswordConfirm } from '@/store/reducers/Settings';
import { inputValue, setSuccessMessage, setErrorMessage, resetUser } from '@/store/reducers/User';

import Cookies from 'js-cookie';


const UserLogin = () => {
  const dispatch = useDispatch();

  const { user, isError, isSuccess } = useSelector((state) => state.user);
  const { isRegister, showPassword, showPasswordConfirm } = useSelector((state) => state.settings);
  console.log('isRegister: ', isRegister);

  const APIEndpoint = 'https://wakeupbox.fr/api/v1/customers';

  useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorMessage(''))
      dispatch(setSuccessMessage(''))
    }, 4000)
  }, [isError, isSuccess])

  const handleUserRegister = () => {
    dispatch(openRegisterForm())
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputValue({ inputType: id, value }));
  };

  const loginUser = async (event) => {
    event.preventDefault();


    const inputs = [
      { name: 'email', value: user.email, errorMessage: 'Merci de saisir un email' },
      { name: 'password', value: user.password, errorMessage: 'Merci de saisir un mot de passe' }
    ];

    console.log('inputs: ', inputs);
    for (const input of inputs) {
      if (!input.value) {
        return dispatch(setErrorMessage(input.errorMessage));
      }
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      }),
    }

    try {
      const response = await fetch(`${APIEndpoint}/signin`, requestOptions)
      console.log('response: ', response);

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la création du compte, veuillez ressayer';
        return dispatch(setErrorMessage(errorMessage));
      }



      const data = await response.json();
      const { accessToken, refreshToken, id } = data;

      if (response.ok) {
        const requestUserProfile = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
        const userResponse = await fetch(`${APIEndpoint}/profile/${id}`, requestUserProfile);
        const user = await userResponse.json();

        // set user cookie
        Cookies.set('user', JSON.stringify(user));

        // set refresh token cookie
        Cookies.set('refreshToken', refreshToken);

      }
    } catch (err) {
      console.log('error: ', err);
    }
  }

  const createUser = async (event) => {
    event.preventDefault();

    const inputs = [
      { name: 'email', value: user.email, errorMessage: 'Merci de saisir un email' },
      { name: 'password', value: user.password, errorMessage: 'Merci de saisir un mot de passe' },
      { name: 'confirmPwd', value: user.confirmPwd, errorMessage: 'Merci de saisir la confirmation du mot de passe' }];
    console.log('inputs: ', inputs);

    for (const input of inputs) {
      if (!input.value) {
        return dispatch(setErrorMessage(input.errorMessage));
      }
    }

    if (user.password !== user.confirmPwd) return dispatch(setErrorMessage('Les mots de passe ne correspondent pas.'))

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      }),
    }

    try {
      const response = await fetch(`${APIEndpoint}/signup`, requestOptions)
      console.log('response: ', response);

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la création du compte, veuillez ressayer';
        return dispatch(setErrorMessage(errorMessage));
      }

      if (isError) dispatch(setErrorMessage(''))
      dispatch(openRegisterForm());

      const data = await response.json();
      dispatch(setSuccessMessage(data))
      dispatch(resetUser());
    } catch (err) {
      console.log('error: ', err);
    }
  }

  const handleShowPwd = () => dispatch(toggleShowPassword());
  const handleShowPwdConfirm = () => dispatch(toggleShowPasswordConfirm());

  return (
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


      {isError != '' ? <p className='user_form_error'>{isError}</p> : null}
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
    </form>
  )
}

export { UserLogin };