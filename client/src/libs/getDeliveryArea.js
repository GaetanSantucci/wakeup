const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
// const prodEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTION

// method to fetch all delivery area from wakeup api
export const getArea = async () => {

  const res = await fetch(`${endpoint}/delivery`);
  if (!res.ok) {
    throw new Error('Récupération des données liées aux zones de livraison impossible');
  }

  return res.json();
}