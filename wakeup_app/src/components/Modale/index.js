'use client';
import './modale.scss';

import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { toggleCartModale, toggleProfileModale } from '@/src/store/reducers/Settings';
import { setAddress, inputValue, updateComplement, toggleCheckbox } from '@/src/store/reducers/User';

import { useSetupUser } from '@/src/hook/useSetUser';
import { selectTotalAmount, addItems, deleteItems } from '@/src/store/reducers/Cart';

const CartModale = () => {

  const cartItems = useSelector((state) => Object.values(state.cart.cartItems))

  const { newTotal } = useSelector(selectTotalAmount)
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.settings.cartIsOpen)
  const closeModale = () => {
    dispatch(toggleCartModale());
  }

  const handleChangeIncreaseQty = (qty) => {
    // console.log("+ 1", qty + 1);
    dispatch(addItems)
  }

  const handleChangeDecreaseQty = (qty) => {
    // console.log("- 1", qty - 1);
    dispatch(deleteItems)
  }

  return (
    <div className={cartOpen ? 'cart_modale open_cart_modale' : 'cart_modale'}>
      <div className='modale_close' onClick={closeModale}>
        <CancelSharpIcon />
      </div>
      <h3 className='cart_modale_title'>Votre panier </h3>
      {
        cartItems.map(elem => {
          return (
            <div className='cart_modale_item' key={elem.name}>
              <p>{elem.name}</p>
              <div className='cart_modale_item_quantity'>
                <span onClick={() => { handleChangeDecreaseQty(elem.quantity) }}>-</span>
                {elem.quantity}
                <span onClick={() => { handleChangeIncreaseQty(elem.quantity) }}>+</span>
              </div>
            </div>
          )
        })
      }
      <p>{newTotal}</p>
      <button>Validez</button>
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


  const handleSearchInput = async (event) => {
    if (event.target.value < 3) setResults([])
    setSearchTerm(event.target.value)
    console.log('searchTerm: ', searchTerm.length);

    if (searchTerm.length > 3) {
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${event.target.value}&type=housenumber&autocomplete=1`)
        if (response.ok) {
          const data = await response.json();
          setResults(data.features)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

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
    console.log('dans le handle setAddress voici le user profile', user);
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
          <input id='search' type='search' placeholder='Saisissez votre adresse' aria-autocomplete='list' onChange={handleSearchInput} value={searchTerm} />
        </div>
        {
          results && (
            results.map(elem => {
              return (
                <div className='profile_modale_form_input_results' onClick={() => handleSetAddress(elem.properties)} key={elem.properties.id}>{elem.properties.label}</div>
              )
            })
          )
        }
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