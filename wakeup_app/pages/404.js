import Link from 'next/link'

export default function Custom404() {
  return <>
    <h1>Page non trouvée</h1>
    <Link href="/">
      <a>
        Retour a l&apos;accueil
      </a>
    </Link>
  </>
}