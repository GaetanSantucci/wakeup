export const getArticlesData = async () => {

  const endpoint = 'http://localhost:5555/api/v1'
  // const endpoint = 'https://wakeupbox.fr/api/v1'

  const res = await fetch(`${endpoint}/blogs`);
  if (!res.ok) {
    throw new Error('Récupération des données liées aux blogs impossible');
  }
  return res.json();
}