// plugins/axios.js
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
        baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8989/api/v1',
    });

    // Добавляем api в контекст Nuxt
    nuxtApp.provide('axios', api);
});
