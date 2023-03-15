export const getReviewData = async () => {

  const res = await fetch('https://wakeupbox.fr/api/v1/reviews');
  if (!res.ok) {
    throw new Error('Récupération des données liées aux commentaires impossible');
  }
  return res.json();
}