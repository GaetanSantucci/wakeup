import Link from 'next/link';

const styleInsta = {
  position: 'fixed',
  top: '43%',
  left: '0',
  transformTranslate: 'translate(-50%, -50%)',
  padding: '0.4rem',
  userSelect: 'none',
  backgroundColor: 'black',
  writingMode: 'vertical-rl',
  textOrientation: 'upright',
  fontFamily: 'playfair',
  textTransform: 'uppercase',
  color: 'white'
}

export default function InstaLink() {
  return (
    <div style={styleInsta}>
      <Link href='https://www.instagram.com/wakeup.clf/?hl=en' target='blank'>
        Instagram
      </Link>
    </div>
  )
}