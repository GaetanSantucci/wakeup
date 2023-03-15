export const getArea = async () => {
  const res = await fetch('https://wakeupbox.fr/api/v1/delivery');

  if (!res.ok) {
    throw new Error('Récupération des données liées aux zones de livraison impossible');
  }

  return res.json();
}