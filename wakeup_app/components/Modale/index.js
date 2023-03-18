'use client';
import './modale.scss';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { useSelector, useDispatch } from 'react-redux';
import { toggleModale } from '@/store/reducers/settings';

import Image from 'next/image';
import Link from 'next/link';
import easter from '/public/images/surprise.webp';

const EventModale = () => {

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.settings.isOpen)
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
                <div className='modale__container__close' onClick={closeModale}>
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

export { EventModale }