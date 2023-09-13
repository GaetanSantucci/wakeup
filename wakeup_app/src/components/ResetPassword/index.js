'use client'
import styles from './ResetPassword.module.scss'
import { useState } from 'react';
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


import { PasswordChecker } from '@/src/utils/passwordChecker';

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST


export const ResetPassword = () => {

  const searchParams = useSearchParams();
  const router = useRouter();


  // Extract the 'token' query parameter from the URL
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  console.log('email:', email);


  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isError, setIsError] = useState(false);

  // Logic for display and customize the constraints for password with indicator text and color
  const pwdChecker = new PasswordChecker(newPassword)
  const passwordColor = pwdChecker.getPasswordColor();
  const passwordStrengthBar = pwdChecker.getPasswordStrengthBarWidth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleResetPassword = async () => {

    if (!newPassword) return setIsWarning(true)
    if (token) {
      // Make an API request to reset the password using the token and newPassword
      try {
        const response = await fetch(`${endpoint}/reset_password`, {
          method: 'POST',
          body: JSON.stringify({ newPassword, token, email }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Password reset was successful, show a success message
          setIsSuccess(true)
          setTimeout(() => {
            router.push('/')
          }, 2500)
          console.log('Password reset successful.');
        } else {
          // Password reset failed, handle the error
          setIsError(true)
          console.error('Password reset failed.');
        }
      } catch (error) {
        console.error('Error resetting password:', error);
      }
    };
  }

  return (
    <div className={styles.container}>
      <p className={styles.container_subtitle}>Veuillez saisir votre nouveau mot de passe</p>
      <FormControl sx={{ width: '40%', mb: 2 }}
        variant="standard"
        size='small'
        required
      >
        <InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>
        <Input
          id="password"
          onChange={(e) => setNewPassword(e.target.value)}
          defaultValue={newPassword}
          // onFocus={handleFocusInput}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Nouveau mot de passe"
        />
      </FormControl>
      <div className={styles.container_password_strength}>
        <p>Le mot de passe doit contenir :</p>
        <p className={pwdChecker.hasCapital() ? `${styles.password_check}` : null}>1 majuscule</p>
        <p className={pwdChecker.hasLowercase() ? `${styles.password_check}` : null}>1 minuscule</p>
        <p className={pwdChecker.hasNumber() ? `${styles.password_check}` : null}>1 chiffre</p>
        <p className={pwdChecker.isMinLength(1) ? `${styles.password_check}` : null}>Minimum 8 caractères</p>
      </div>
      <div style={{ width: '200px', textAlign: 'start' }}>
        <div className={styles.container_password_strength_indicator}
          style={{ backgroundColor: passwordColor, width: passwordStrengthBar }} >
        </div>
      </div>
      <button className={styles.container_button} onClick={handleResetPassword}>Réinitialisation du mot de passe</button>
      {
        isSuccess &&
        <Stack sx={{ m: 2 }}>
          <Alert severity="success">
            <AlertTitle>Succès</AlertTitle>
            Votre mot de passe a été réinitialisé !
          </Alert>
        </Stack>
      }
      {
        isWarning &&
        <Stack sx={{ m: 2 }}>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Merci de saisir votre nouveau mot de passe
          </Alert>
        </Stack>
      }
      {
        isError &&
        <Stack sx={{ m: 2 }} >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Une erreur est survenue !
          </Alert>
        </Stack>
      }

    </div>
  )
}