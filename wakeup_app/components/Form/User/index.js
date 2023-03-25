'use client';
import './user.scss';
import Input from '@/components/Input';

import { useSelector, useDispatch } from 'react-redux';
import { openRegisterForm } from '@/store/reducers/Settings';
import { inputValue } from '@/store/reducers/User';


const UserLogin = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user)
  console.log('user: ', user);
  const isRegister = useSelector((state) => state.settings.userRegister)
  const APIEndpoint = 'https://wakeupbox.fr/api/v1/customers'

  const handleUserRegister = () => {
    dispatch(openRegisterForm())
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputValue({ inputType: id, value }));
  };

  // const loginUser = () => {

  // }

  const createUser = async (event) => {
    event.preventDefault();

    const { password, confirmPassword } = user.user
    console.log('confirmPassword: ', confirmPassword);
    console.log('password: ', password);

    if (password !== confirmPassword) {
      dispatch(setErrorMessage('Les mots de passe ne correspondent pas.'))
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password: user.password })
    }
    try {
      const response = await fetch(`${APIEndpoint}/signup`, requestOptions);
      if (!response.ok) dispatch(setErrorMessage('Une erreur est survenue lors de la création du compte, veuillez ressayer'))
      dispatch(setSuccessMessage('Votre compte a bien été créé !'))
      const data = await response.json();
      console.log('data: ', data);
    } catch (err) {
      dispatch(setErrorMessage('Une erreur est survenue lors de la création du compte, veuillez ressayer'))
      console.log('error: ', err);
    }
  }


  const userFields = isRegister ? [
    {
      id: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      id: 'password',
      type: 'password',
      label: 'Mot de passe',
    },
    {
      id: 'confirmPassword',
      type: 'password',
      label: 'Confirmation du mot de passe',
    }
  ] : [
    {
      id: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      id: 'password',
      type: 'password',
      label: 'Mot de passe',
    }
  ]

  return (
    <form className='user_form'>
      <UserFields
        userFields={userFields}
        user={user}
        handleInputChange={handleInputChange}
      />
      <div className='user_form_validate'>
        {
          isRegister ? <><p>Déjà membre, se <span onClick={handleUserRegister}>connecter</span></p>
            <button
              // onClick={loginUser}
              type='submit'>
              S&apos;inscrire
            </button></>
            :
            <><p>Pas encore inscrit, cliquez <span onClick={handleUserRegister}>ici</span></p>
              <button
                type='submit'
                onClick={createUser}>
                Valider
              </button></>
        }
      </div>
    </form>
  )
}

const UserFields = ({ userFields, user, handleInputChange }) => (

  <div className='user_form_input'>
    {userFields.map((u) =>
    (
      <Input
        key={u.label}
        type={u.type}
        id={u.id}
        label={u.label}
        value={user.user[u.type]}
        onChangeValue={handleInputChange}
      />
    )
    )}
  </div>
);

export { UserLogin };