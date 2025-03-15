// stores/ads.js
import { defineStore } from 'pinia';
import {useCookie, useNuxtApp} from '#app';

export const useAdsStore = defineStore('ads', {
    state: () => ({
        currentAd: null,
        ads: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchAds() {
            this.loading = true;
            this.error = null;

            const { $axios } = useNuxtApp(); // Получаем экземпляр axios

            try {
                const response = await $axios.get('/ads'); // Запрос к API /ads
                this.ads = response.data;
            } catch (err) {
                console.error('Error loading ads:', err);
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchAdById(id) {
            this.loading = true;
            this.error = null;

            const { $axios } = useNuxtApp(); // Получаем экземпляр axios

            try {
                const response = await $axios.get(`/ads/${id}`); // Запрос к API /ads
                this.currentAd = response.data;
            } catch (err) {
                console.error('Error loading ads:', err);
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        async toggleFavorite(adId) {
            this.loading = true;
            this.error = null;

            await $fetch(`http://localhost:8989/v1/ads/favorite`, {
                method: 'POST',
                body: {
                    ad_id: adId
                },
                headers: {
                    Authorization: useCookie('token').value || null
                },
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    this.error = error.message
                    throw error
                }).finally(() => {
                    this.loading = false
                })
        },
    }
});
