const localEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST
// const prodEndpoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTION

const fetchAllUser = async () => {
  const res = await fetch(`${localEndpoint}/customers`)
  if (!res.ok) return undefined;
  return res.json();
}

export { fetchAllUser }