export const getArticlesData = async () => {

  const res = await fetch('https://wakeupbox.fr/api/v1/blogs');
  if (!res.ok) {
    throw new Error('Récupération des données liées aux blogs impossible');
  }
  return res.json();
}