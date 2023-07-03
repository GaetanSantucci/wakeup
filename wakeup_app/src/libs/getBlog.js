// method to fetch all blogs from wakeup api
export const getBlogs = async () => {

  const endpoint = 'http://localhost:7777/api/v1'
  // const endpoint = 'https://wakeupclf.fr/api/v1'

  const res = await fetch(`${endpoint}/blogs`);
  if (!res.ok) {
    throw new Error('Récupération des données liées aux blogs impossible');
  }
  return res.json();
}