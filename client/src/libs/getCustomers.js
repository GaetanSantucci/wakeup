const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
// const prodEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTION

const fetchAllUser = async () => {
  const res = await fetch(`${endpoint}/customers`)
  if (!res.ok) return undefined;
  return res.json();
}

export { fetchAllUser }