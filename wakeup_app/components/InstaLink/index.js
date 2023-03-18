import './instalink.scss';
import Link from 'next/link';

export default function InstaLink() {
  return (
    <div className='instagram'>
      <Link href='https://www.instagram.com/wakeup.clf/?hl=en' target='blank'>
        Instagram
      </Link>
    </div>
  )
}