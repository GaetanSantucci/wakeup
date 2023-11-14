const localEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST
// const prodEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTION

// method to fetch all blogs from wakeup api
export const getBlogs = async () => {

  const res = await fetch(`${localEndpoint}/blogs`, {
    cache: 'force-cache'
  });
  if (!res.ok) {
    throw new Error('Récupération des données liées aux blogs impossible');
  }
  return res.json();
}