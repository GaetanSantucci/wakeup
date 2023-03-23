const UserForm = () => {
  return (
    <form className='user_form'>
      <input type='email' placeholder='Saisissez votre email' />
      <input type='password' placeholder='Saisissez votre mot de passe' />
      <button type='submit'>Validez</button>
    </form>
  )
}

export default UserForm;