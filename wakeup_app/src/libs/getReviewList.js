// method to fetch all reviews from wakeup api
export const getReviewData = async () => {

  const endpoint = 'http://localhost:7777/api/v1'
  // const endpoint = 'https://wakeupclf.fr/api/v1'

  const res = await fetch(`${endpoint}/reviews`);
  if (!res.ok) {
    throw new Error('Récupération des données liées aux commentaires impossible');
  }
  return res.json();
}