// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/axios.js',
  ],
  runtimeConfig: {
    public: {
      adsApiBaseUrl: process.env.ADS_PUBLIC_API_BASE_URL,
      ssoApiBaseUrl: process.env.SSO_PUBLIC_API_BASE_URL,
      nftApiBaseUrl: process.env.NFT_PUBLIC_API_BASE_URL,
    }
  },
})