const localEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST
// const prodEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTION

//method to get all plates products from wakeup api
export const getProductsData = async () => {
  const res = await fetch(`${localEndpoint}/plates`);
  if (!res.ok) {
    throw new Error('Récupération des données plateaux impossible');
  }
  return res.json();
}

export const getProductById = async (plateId) => {

  const res = await fetch(`${localEndpoint}/plates/${plateId}`);

  if (!res.ok) return undefined
  // throw new Error('Récupération des données liées à ce plateau impossible');
  return res.json();
}