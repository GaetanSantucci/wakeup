export const getArea = async () => {

  // const endpoint = 'http://localhost:5555/api/v1'
  const endpoint = 'https://wakeupbox.fr/api/v1'

  const res = await fetch(`${endpoint}/delivery`);

  if (!res.ok) {
    throw new Error('Récupération des données liées aux zones de livraison impossible');
  }

  return res.json();
}