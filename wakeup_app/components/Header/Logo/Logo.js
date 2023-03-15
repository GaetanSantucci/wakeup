import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/logo/logowakeuppng.png';
import './logo.scss'


const Logo = () => {
  return (
    <div className='header_image'>
      <Link href='/'>
        <Image src={logo} className='logo__image' priority width={250} alt='Wake up clermont-ferrand Logo' />
      </Link>
    </div>
  )

}

export default Logo