// const endpoint = 'http://localhost:5555/api/v1'
const endpoint = 'https://wakeupbox.fr/api/v1'

export const getProductsData = async () => {


  const res = await fetch(`${endpoint}/plates`);

  if (!res.ok) {
    throw new Error('Récupération des données plateaux impossible');
  }
  return res.json();
}

export const getProductById = async (plateId) => {

  const res = await fetch(`${endpoint}/plates/${plateId}`);

  if (!res.ok) {
    throw new Error('Récupération des données liées à ce plateau impossible');
  }
  return res.json();
}