/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    newNextLinkBehavior: false,
  },
  images: {
    domains: ['153.92.223.190'],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_BASE_URL: process.env.API_BASE_URL,
  }
}

module.exports = nextConfig
