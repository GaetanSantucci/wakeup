'use client';
import './profile.scss'

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const UserProfile = () => {
  const { push } = useRouter();

  // Read the "userData" cookie value
  const userData = Cookies.get('currentUser');

  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
    push('/login')
    return null;
  }

  //todo implanter api data gouv check adresse auto

  // todo store state for profile active, add input for all profile card and add button to validate

  return (
    <>
      <h3>Bienvenu sur votre page membre</h3>
      <div className="container">
        <div className="profile_card">
          <p>Email : <span>{user?.email}</span></p>
          <p>Nom : <span>{user?.id}</span></p>
          <p>Prénom : <span>{user?.email}</span></p>
          <p>Adresse : <span>{user?.email}</span></p>
          <p>Complément d&apos;adress: <span>{user?.email}</span></p>
          <p>Code postal <span>{user?.email}</span></p>
          <p>Ville : <span>{user?.email}</span></p>
          <div><ManageAccountsIcon /></div>
        </div>
        <div className="last_booking">
          <h3 className='card_subtitle'>Prochaine réservation :</h3>
          <p>30 avril 2023, plateau réservé Dolce Vita </p>
        </div>
        <div className="orders">
          <h3 className='card_subtitle'>Dernières commandes :</h3>
          <ul>
            <li>Plateau Sunshine - 02/02/2023 - total: 33,40e</li>
            <li>Plateau Sunshine - 02/02/2023 - total: 33,40e</li>
            <li>Plateau Sunshine - 02/02/2023 - total: 33,40e</li>
            <li>Plateau Sunshine - 02/02/2023 - total: 33,40e</li>
            <li>Plateau Sunshine - 02/02/2023 - total: 33,40e</li>
          </ul>
          <p></p>
        </div>
      </div>
    </>
  )
}

export default UserProfile;