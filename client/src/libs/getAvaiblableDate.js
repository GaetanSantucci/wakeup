const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
// const prodEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTION


const fetchAvailableDate = async () => {
  const res = await fetch(`${endpoint}/orders`, { next: { revalidate: 60}})
  if (!res.ok) {
    throw new Error('Récupération des données liées aux disponibilités impossible');
  }
  return res.json();
}

const fetchClosedDays = async () => {
  const response = await fetch(`${endpoint}/orders/closed`, { next: { revalidate: 60}});

  if (!response.ok) return undefined;

  return response.json();
};

export { fetchAvailableDate, fetchClosedDays }