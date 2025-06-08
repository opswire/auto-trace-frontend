import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const adsApiUrl = config.public.adsApiBaseUrl;
    const nftApiUrl = config.public.nftApiBaseUrl;
    const ssoApiUrl = config.public.ssoApiBaseUrl;
    const appointmentApiUrl = config.public.appointmentApiBaseUrl;
    const paymentApiUrl = config.public.paymentApiBaseUrl;
    const chatApiUrl = config.public.chatApiBaseUrl;

    const axiosAds = axios.create({
        baseURL: `${adsApiUrl}/api/v1`,
    });
    const axiosPayment = axios.create({
        baseURL: `${paymentApiUrl}/api/v1`,
    });
    const axiosChat = axios.create({
        baseURL: `${chatApiUrl}/api/v1`,
    });
    const axiosNft = axios.create({
        baseURL: `${nftApiUrl}/api/v1`,
    });
    const axiosSso = axios.create({
        baseURL: `${ssoApiUrl}/api/v1`,
    });
    const axiosAppointment = axios.create({
        baseURL: `${appointmentApiUrl}/api/v1`,
    });

    nuxtApp.provide('axiosAds', axiosAds);
    nuxtApp.provide('axiosPayment', axiosPayment);
    nuxtApp.provide('axiosChat', axiosChat);
    nuxtApp.provide('axiosNft', axiosNft);
    nuxtApp.provide('axiosSso', axiosSso);
    nuxtApp.provide('axiosAppointment', axiosAppointment);
});
