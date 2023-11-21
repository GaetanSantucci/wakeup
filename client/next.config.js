/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['153.92.223.190', 'wakeupclf.fr', 'localhost'],
  },
  modularizeImports: {
    "@mui/material/?(((\\w*)?/?)*)": {
      transform: "@mui/material/{{ matches.[1] }}/{{member}}",
    },
    "@mui/icons-material/?(((\\w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
  env: {
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    NEXT_PUBLIC_ENDPOINT: process.env.NODE_ENV === 'production' ? 
    process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTION 
    : process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST
  }
}

module.exports = nextConfig
