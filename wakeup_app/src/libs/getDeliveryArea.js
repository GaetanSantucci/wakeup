// method to fetch all delivery area from wakeup api
export const getArea = async () => {

  const endpoint = 'http://localhost:7777/api/v1'
  // const endpoint = 'https://wakeupclf.fr/api/v1'

  const res = await fetch(`${endpoint}/delivery`);

  if (!res.ok) {
    throw new Error('Récupération des données liées aux zones de livraison impossible');
  }

  return res.json();
}