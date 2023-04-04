'use client';
import './user.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


import { openRegisterForm, toggleShowPassword, toggleShowPasswordConfirm, handleInputFocused } from '@/src/store/reducers/Settings';
import { inputValue, setSuccessMessage, setErrorMessage, resetUser } from '@/src/store/reducers/User';

import { PasswordChecker } from '@/src/utils/passwordChecker';
import { useLogin } from '@/src/hook/useLogin';
import { useCreate } from '@/src/hook/useCreate';

const UserLogin = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  // Hook to log and register user
  const { login } = useLogin();
  const { create } = useCreate();


  const { user, isError, isSuccess } = useSelector((state) => state.user);
  const { isRegister, showPassword, showPasswordConfirm, isPasswordInputFocused } = useSelector((state) => state.settings);

  // Remove alert pop message 
  useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorMessage(''))
      dispatch(setSuccessMessage(''))
    }, 4000)
  }, [dispatch, isError, isSuccess])


  const loginUser = async (event) => {

    event.preventDefault();

    if (!user.email || !user.password) {
      dispatch(setErrorMessage('Merci de saisir votre email et votre mot de passe'))
    } else {
      try {
        const { id } = await login(user.email, user.password);
        console.log('id: ', id);
        router.push(`/user/profile/${id}`)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const createUser = async (event) => {

    event.preventDefault();

    console.log('user.email: ', user.email);
    if (!user.email || !user.password || !user.confirmPwd) return dispatch(setErrorMessage('Merci de saisir votre email et votre mot de passe'))
    if (user.password !== user.confirmPwd) return dispatch(setErrorMessage('Les mots de passe ne correspondent pas.'));

    try {
      const newUser = await create(user.email, user.password)

      if (newUser !== 'User has signed up !') return dispatch(setErrorMessage(newUser))

      dispatch(setSuccessMessage("Votre compte a bien été crée !"))
      dispatch(openRegisterForm());
      dispatch(toggleShowPassword())

    } catch (err) {
      dis
      console.log(err)
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
  const pwdChecker = new PasswordChecker(user.password)
  const passwordColor = pwdChecker.getPasswordColor();
  const passwordStrengthBar = pwdChecker.getPasswordStrengthBarWidth();

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
    </form>
  )
}

export default UserLogin;