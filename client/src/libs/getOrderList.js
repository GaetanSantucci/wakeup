const localEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST
// const prodEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTION

const fetchAllOrder = async () => {
  const res = await fetch(`${localEndpoint}/orders`)
  if (!res.ok) return undefined;
  return res.json();
}

const fetchOrderByUser = async (userId) => {

  const response = await fetch(`${localEndpoint}/orders/${userId}`, { method: 'POST' });

  if (!response.ok) {
    throw new Error('Récupération des données liées à vos commandes');
  }
  return response.json();
};

const fetchClosedDays = async () => {
  const response = await fetch(`${localEndpoint}/orders/closed`);

  if (!response.ok) {
    throw new Error('Récupération des données liées aux jours fermés impossible');
  }

  return response.json();
};

const fetchAvailability = async () => {
  const response = await fetch(`${localEndpoint}/orders/availability`);

  if (!response.ok) {
    throw new Error('Récupération des données liées aux disponibilités');
  }

  return response.json();
};

const createSpecialDay = async (inputData) => {
  console.log('inputData:', inputData);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: inputData.date,
      plate_quantity: inputData.plateQuantity,
      closing_day: inputData.closingDay
    }),
  }

  const res = await fetch(`${localEndpoint}/orders/closed/create`, options)

  if (!res.ok) return undefined;

  return res.json();
}

export { fetchAllOrder, fetchOrderByUser, fetchClosedDays, fetchAvailability, createSpecialDay }