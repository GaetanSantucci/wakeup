'use client';
import './user.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


import { openRegisterForm, toggleShowPassword, toggleShowPasswordConfirm, handleInputFocused } from '@/store/reducers/Settings';
import { inputValue, setSuccessMessage, setErrorMessage, resetUser } from '@/store/reducers/User';


import Cookies from 'js-cookie';


const UserLogin = () => {

  const dispatch = useDispatch();
  const { push } = useRouter();

  const { user, isError, isSuccess } = useSelector((state) => state.user);
  const { isRegister, showPassword, showPasswordConfirm, isPasswordInputFocused } = useSelector((state) => state.settings);
  console.log('isPasswordInputFocused: ', isPasswordInputFocused);

  const APIEndpoint = 'https://wakeupbox.fr/api/v1/customers';
  // const APIEndpoint = 'http://localhost:5555/api/v1/customers';

  // Remove alert pop message 
  useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorMessage(''))
      dispatch(setSuccessMessage(''))
    }, 4000)
  }, [dispatch, isError, isSuccess])



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
        Cookies.set('userData', JSON.stringify(user));

        // set refresh token cookie
        Cookies.set('refreshToken', refreshToken);
        push(`/user/profile/${id}`)
        console.log('push(`/user/profile`): ', push(`/user/profile`));
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
      dispatch(err.message)
      console.log('error: ', err);
    }
  }

  // function for UX 
  const handleShowPwd = () => dispatch(toggleShowPassword());
  const handleShowPwdConfirm = () => dispatch(toggleShowPasswordConfirm());
  const handleUserRegister = () => { dispatch(openRegisterForm()); dispatch(resetUser()); dispatch(handleInputFocused(false)) }
  const handleFocusInput = () => dispatch(handleInputFocused(true));

  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputValue({ inputType: id, value }));
  };



  // Logic for display and customize the constraints for password with indicator text and color

  // Check for capital letter
  const capitalRegex = /[A-Z]/;
  const hasCapital = (capitalRegex.test(user.password));

  // Check for lowercase letter
  const lowercaseRegex = /[a-z]/;
  const hasLowercase = (lowercaseRegex.test(user.password));

  // Check for number
  const numberRegex = /[0-9]/;
  const hasNumber = (numberRegex.test(user.password));

  // Check for length
  const isMinLength = (user.password.length >= 8)


  const getPasswordColor = () => {
    const constraints = [
      hasCapital,
      hasLowercase,
      hasNumber,
      isMinLength,
    ];

    const numFulfilledConstraints = constraints.filter(Boolean).length;
    console.log('numFulfilledConstraints: ', numFulfilledConstraints);

    if (password === '') {
      return '';
    } else if (numFulfilledConstraints === 4) {
      return '#48bf48';
    } else if (numFulfilledConstraints >= 2) {
      return '#ff8c1a';
    } else if (numFulfilledConstraints === 1) {
      return '#ff0000';
    } else {
      return '#353535';
    }

  };

  const getPasswordStrengthBarWidth = () => {
    const passwordColor = getPasswordColor();

    if (passwordColor === '#48bf48') {
      return '100%';
    } else if (passwordColor === '#ff8c1a') {
      return '50%';
    } else if (passwordColor === '#ff0000') {
      return '20%';
    } else {
      return '0'
    }
  };

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
          <div className={hasCapital ? 'password_check' : null}>1 majuscule</div>
          <div className={hasLowercase ? 'password_check' : null}>1 minuscule</div>
          <div className={hasNumber ? 'password_check' : null}>1 chiffre</div>
          <div className={isMinLength ? 'password_check' : null}>Minimum 8 caractères</div>
        </div>
        <div style={{ backgroundColor: getPasswordColor(), marginTop: '5px', height: '4px', width: getPasswordStrengthBarWidth(), borderRadius: '10px' }} />
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
    </form>
  )
}

export default UserLogin;