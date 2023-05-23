// Method to get address-related data from the API data.gouv by making a request with the provided address
export const getAddress = async ({ address }) => {

  const endpoint = `https://api-adresse.data.gouv.fr/search/?q=${address}&autocomplete=1`

  const res = await fetch(`${endpoint}`);
  if (!res.ok) {
    throw new Error('Récupération des données liées aux blogs impossible');
  }
  return res.json();
}