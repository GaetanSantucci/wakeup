import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Oups ! Nous n&apos;avons pas compris votre demande </p>
      <p>
        Retour à <Link href='/'>l&apos;accueil</Link>
      </p>
    </div>
  );
}
