const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST

const fetchAllOrder = async () => {
  const res = await fetch(`${endpoint}/orders`)
  if (!res.ok) return undefined;
  return res.json();
}

const fetchOrderByUser = async (userId) => {

  const response = await fetch(`${endpoint}/orders/${userId}`, { method: 'POST' });

  if (!response.ok) {
    throw new Error('Récupération des données liées à vos commandes');
  }
  return response.json();
};

const fetchClosedDays = async () => {
  const response = await fetch(`${endpoint}/orders/closed`);

  if (!response.ok) {
    throw new Error('Récupération des données liées aux jours fermés impossible');
  }

  return response.json();
};

const fetchAvailability = async () => {
  const response = await fetch(`${endpoint}/orders/availability`);

  if (!response.ok) {
    throw new Error('Récupération des données liées aux disponibilités');
  }

  return response.json();
};

export { fetchAllOrder, fetchOrderByUser, fetchClosedDays, fetchAvailability }