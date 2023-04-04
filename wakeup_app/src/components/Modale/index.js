'use client';
import './modale.scss';

import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import SearchIcon from '@mui/icons-material/Search';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { toggleModale, toggleCartModale, toggleProfileModale } from '@/src/store/reducers/Settings';
import { setAddress, inputValue } from '@/src/store/reducers/User';

import Image from 'next/image';
import Link from 'next/link';
import easter from '/public/images/modale-paques.webp';

const EventModale = () => {

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.settings.modaleIsOpen)
  const closeModale = () => {
    dispatch(toggleModale());
  }

  return (
    <>
      {isOpen && (
        <div className='backdrop__container'>
          <div className='modale__container'>
            <div className='modale__container__item'>
              <Image src={easter} width={550} height={750} alt='Plateau de Pâques' />
              <div className='modale__container__item__details' >
                <div className='modale_close' onClick={closeModale}>
                  <CancelSharpIcon />
                </div>
                <h2>Tentez de remporter une pépite d&apos;or d&apos;une valeur de 425€</h2>
                <p>Participez à notre jeu concours</p>
                <h3>&laquo; GOLDEN EGG &raquo;</h3>
                <p>Tout plateau de Pâques livré entre le 1er et le 30 avril 2023</p>
                <p className='modale__container__item__details__equal'>=</p>
                <p>Une chance d&apos;être tiré au sort pour remporter une pépite d&apos;or de 3,17gr</p>
                <span onClick={closeModale}><Link href='/plateau/paques/10'>En savoir plus</Link></span>
                <Link href='/images/jeuconcourspaques.pdf' target='blank' onClick={closeModale}><code>Voir les conditions générales du jeu concours</code></Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const CartModale = () => {
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.settings.cartIsOpen)
  const closeModale = () => {
    dispatch(toggleCartModale());
  }
  return (
    <div className={cartOpen ? 'cart_modale open_cart_modale' : 'cart_modale'}>
      <div className='modale_close' onClick={closeModale}>
        <CancelSharpIcon />
      </div>
      <h3>Votre panier </h3>

      <p>Détail</p>
      <div className='cart_modale_item'>
        <p>plateau sunshine</p>
        <span>29.90e</span>
        <div className='cart_modale_quantity'>
          <span>-</span>
          <span>1</span>
          <span>+</span>
        </div>
      </div>
      <div className='cart_modale_item'>
        <p>plateau dolce vita</p>
        <span>49.90e</span>
        <div className='cart_modale_quantity'>
          <span>-</span>
          <span>1</span>
          <span>+</span>
        </div>
      </div>
      <p>total : 78.90</p>
      <button>Validez</button>
    </div>
  )
}

const ProfileModale = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const profileOpen = useSelector((state) => state.settings.profileIsOpen);

  // state of address research
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  console.log('results: ', results);


  const handleSearchInput = async (event) => {
    if (event.target.value < 3) setResults([])
    setSearchTerm(event.target.value)

    if (searchTerm.length >= 3) {
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${event.target.value}&type=housenumber&autocomplete=1`)
        console.log('response: ', response);
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

  const handleAddressChange = (e, elem) => {
    // console.log('elem: ', elem);
    const selectedValue = e.target.value;
    // console.log('e.target.value: ', e.target.value);
    setSearchTerm(selectedValue);
    console.log('searchTerm after change :', searchTerm)
    // dispatch(setAddress({
    //   label: selectedValue,
    //   complement: '',
    //   city: '',
    //   zipcode: '',
    // }));
  };

  const submitUserProfile = (event) => {
    event.preventDefault();
    console.log('je mets a jour le profile')
  }

  const handleSetAddress = (elem) => {
    console.log('elem for one option: ', elem.label);
    setAddress({ label: elem.label, city: elem.city, zipcode: elem.postcode })
    setResults([])
    console.log('user address: ', user.address)
  }


  // Dynamic method for store input by type
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    dispatch(inputValue({ inputType: id, value }));
  };

  return (
    <div className={profileOpen ? 'profile_modale open_profile_modale' : 'profile_modale'}>
      <div className='modale_close' onClick={handleCloseProfileModale}>
        <CancelSharpIcon />
      </div>
      {/* <div className='profile_modale_form_input'> */}
      <form className='profile_modale_form' >
        <div className='profile_modale_form_input'>
          <input type='email' id='email' placeholder='Modifier votre email' value={user.email} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input type='text' id='lastname' placeholder='Ajouter ou modifier le nom' value={user.lastname} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          <input type='text' id='firstname' placeholder='Ajouter ou modifier le prénom' value={user.firstname} onChange={handleInputChange} />
        </div>
        <div className='profile_modale_form_input'>
          {/* <span><SearchIcon /></span> */}
          <input id='search' type='search' placeholder='Saisissez votre adresse' aria-autocomplete='list' onChange={handleSearchInput} value={searchTerm} />
        </div>

        {results && (
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
        <button type='submit' onSubmit={submitUserProfile}>Valider</button>
      </form>
    </div>
  )
}

export { EventModale, CartModale, ProfileModale }