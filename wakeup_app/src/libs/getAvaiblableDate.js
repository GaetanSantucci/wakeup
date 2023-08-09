const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST

const fetchAvailableDate = async () => {
  const res = await fetch(`${endpoint}/orders`)
  if (!res.ok) {
    throw new Error('Récupération des données liées aux disponibilités impossible');
  }
  return res.json();
}

const fetchClosedDays = async () => {
  const response = await fetch(`${endpoint}/closed`);

  if (!response.ok) {
    throw new Error('Récupération des données liées aux jours fermés impossible');
  }

  return response.json();
};

export { fetchAvailableDate, fetchClosedDays }