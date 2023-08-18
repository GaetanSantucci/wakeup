'use client';
import './modale.scss';

import Link from 'next/link';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { toggleCartModale, toggleLoginModale, toggleProfileModale, toggleShowNavbar } from '@/src/store/reducers/Settings';
import { /* setAddress, */ inputValue, updateComplement, toggleCheckbox } from '@/src/store/reducers/User';

import { getTotal } from '@/src/libs/getCartTotal';
import { useSetupUser } from '@/src/hook/useSetUser';
import { resetAllCartItems } from '@/src/store/reducers/Cart';
import { AddOrDeleteItems } from '../Button';


const CartModale = () => {

  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.settings.cartIsOpen)
  const { cart } = useSelector((state) => state.cart)
  console.log('cart:', cart);
  const { loginModale } = useSelector((state) => state.settings)

  const closeModale = () => {
    dispatch(toggleCartModale())
    dispatch(toggleShowNavbar())
    if (loginModale) dispatch(toggleLoginModale())
  };
  const handleRemoveItem = () => {
    dispatch(resetAllCartItems());
    setTimeout(() => {
      closeModale();
    }, 400)

  }

  return (
    <div className={cartOpen ? 'cart_modale open_cart_modale' : 'cart_modale'}>
      <div className='modale_close' onClick={closeModale}>
        <CancelSharpIcon />
      </div>
      <h3 className='cart_modale_title'>Votre panier </h3>
      {
        cart.map(elem => {
          return (
            <div className='cart_modale_item' key={elem.name}>
              <p>{elem.name}</p>
              <AddOrDeleteItems cart={elem} />
            </div>
          )
        })
      }
      <p className='cart_modale_price'>Montant du panier : {getTotal(cart).totalPrice.toFixed(2)}<span> €</span></p>
      <div className='cart_modale_controler'>
        <Link href='/checkout'>
          <button onClick={closeModale}>Validez</button>
        </Link>
        <p onClick={() => handleRemoveItem()}>Videz le panier</p>
      </div>
    </div>
  )
}

const ProfileModale = () => {

  const dispatch = useDispatch();
  const { update } = useSetupUser();

  const { user } = useSelector((state) => state.user);
  const profileOpen = useSelector((state) => state.settings.profileIsOpen);

  // state of address research
  const [searchTerm, setSearchTerm] = useState(user?.address?.label || '');
  const [results, setResults] = useState([]);


  // const handleSearchInput = async (event) => {
  //   if (event.target.value < 3) setResults([])
  //   setSearchTerm(event.target.value)

  //   if (searchTerm.length > 3) {
  //     try {
  //       const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${event.target.value}&type=housenumber&autocomplete=1`)
  //       if (response.ok) {
  //         const data = await response.json();
  //         setResults(data.features)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }

  const handleCloseProfileModale = () => {
    dispatch(toggleProfileModale())
  }


  const submitUserProfile = async (event) => {
    event.preventDefault();
    await update(user)
    // console.log('updateUser dans la modale au submit: ', updateUser);
    console.log('je mets a jour le profile')
    // dispatch(toggleProfileModale())
  }

  const handleSetAddress = (elem) => {
    const { label, name, city, postcode } = elem
    dispatch(setAddress({ label, name, city, postcode }))
    // Results to undefined to close div research
    setSearchTerm(label)
    setResults([])
  }

  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value, checked } = event.target;
    if (id === 'complement') {
      dispatch(updateComplement(value));
    } else if (id === 'newsletter_optin') {
      dispatch(toggleCheckbox(checked));
    } else {
      dispatch(inputValue({ inputType: id, value }));
    }
  };

  return (
    <div className={profileOpen ? 'profile_modale open_profile_modale' : 'profile_modale'}>
      <div className='modale_close' onClick={handleCloseProfileModale}>
        <CancelSharpIcon />
      </div>
      <form className='profile_modale_form' onSubmit={submitUserProfile}>
        <div className='profile_modale_form_input'>
          <input type='email' id='email' placeholder='Modifier votre email' value={user.email} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input type='tel' id='phone' placeholder='Modifier votre numéro de téléphone' value={user.phone} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input type='text' id='lastname' placeholder='Ajouter ou modifier le nom' value={user.lastname} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input type='text' id='firstname' placeholder='Ajouter ou modifier le prénom' value={user.firstname} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input id='search' type='search' placeholder='Saisissez votre adresse' aria-autocomplete='list' onChange={handleInputChange} value={user.address.name} />
        </div>
        {/* {
          results && (
            results.map(elem => {
              return (
                <div className='profile_modale_form_input_results' onClick={() => handleSetAddress(elem.properties)} key={elem.properties.id}>{elem.properties.label}</div>
              )
            })
          )
        } */}
        <div className='profile_modale_form_input'>
          <input type='text' id='complement' placeholder='Étage, bâtiment, interphone' onChange={handleInputChange} value={user.address.complement} />
        </div>
        <div className='profile_modale_form_input_checkbox'>
          {user.newsletter_optin ? (
            <input type='checkbox' id='newsletter_optin' onChange={handleInputChange} checked={user.newsletter_optin} />
          ) : (
            <input type='checkbox' id='newsletter_optin' onChange={handleInputChange} />
          )}
          <p>J&apos;accepte de recevoir des emails de la part de WAKE UP, newsletter, offre promotionnelle</p>
        </div>
        <button type='submit' onClick={handleCloseProfileModale} >Valider</button>
      </form>
    </div>
  )
}

export { CartModale, ProfileModale }