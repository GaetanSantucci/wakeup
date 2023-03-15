'use client';
import './modale.scss';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { useSelector, useDispatch } from 'react-redux';
import { toggleModale } from '@/store/reducers/settings';

import Image from 'next/image';
import Link from 'next/link';
import easter from '/public/images/modale.jpg';

const EventModale = () => {

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.settings.isOpen)
  console.log('isOpen: ', isOpen);
  const closeModale = () => {
    dispatch(toggleModale());
  }

  return (
    <>
      {isOpen && (
        <div className='backdrop__container'>
          <div className='modale__container'>
            <div className='modale__container__close' onClick={closeModale}>
              <CancelSharpIcon />
            </div>
            <div className='modale__container__item'>
              <Image src={easter} width={550} height={750} alt='Plateau de Pâques' />
              <div className='modale__container__item__details' >
                <h2>Remportez une pépite en or d&apos;une valeur de 425€</h2>
                <p>Jeu concours :</p>
                <h2>&laquo; GOLDEN EGG &raquo;</h2>
                <p>Pour toute commande effectuée sur notre nouveau plateau de Pâques</p>
                <p>Description bla bla bla et rebla</p>
                <span onClick={closeModale}><Link href='/plateau'>En savoir plus</Link></span>
                <Link href='/images/JEU_CONCOURS_PAQUES_2023.pdf' target='blank' onClick={closeModale}><code>voir les conditions générales du jeu concours</code></Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export { EventModale }