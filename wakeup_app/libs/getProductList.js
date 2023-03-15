
export const getProductsData = async () => {

  const res = await fetch('https://wakeupbox.fr/api/v1/plates');

  if (!res.ok) {
    throw new Error('Récupération des données plateaux impossible');
  }
  return res.json();
}

export const getProductById = async (plateId) => {

  const res = await fetch(`https://wakeupbox.fr/api/v1/plates/${plateId}`);

  if (!res.ok) {
    throw new Error('Récupération des données liées à ce plateau impossible');
  }
  return res.json();
}