'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Une erreur s'est produite lors de chargement de la page d'accueil</h2>
      <p>Veuillez nous excuser pour ce problème technique</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Recharger la page
      </button>
    </div>
  )
}