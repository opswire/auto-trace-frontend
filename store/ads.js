import {defineStore} from 'pinia';
import {useCookie, useNuxtApp} from '#app';
import router from "#app/plugins/router.js";
import axios from "axios";

export const useAdsStore = defineStore('ads', {
    state: () => ({
        currentAd: null,
        ads: [],
        total: 0,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchAds(params = {}) {
            this.loading = true;
            this.error = null;

            const {$axiosAds} = useNuxtApp();

            try {
                const response = await $axiosAds.get(`ads`, {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json'
                    },
                    params: {
                        page: params.page || 1,
                        per_page: params.per_page || 10,
                        filter: params.filters,
                        sort: params.sorters
                    }
                });

                this.ads = response.data.data.ads;
                this.total = response.data.data.range.count;
            } catch (err) {
                console.error('Error loading ads:', err);
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        getImagePhoto(ad) {
            const config = useRuntimeConfig()
            const adsApiUrl = config.public.adsApiBaseUrl;

            if (!ad?.image_url) return `/default.jpg`;

            if (ad.image_url.startsWith('storage')) {
                return `${adsApiUrl}/${ad.image_url}`;
            }

            return ad.image_url
        },

        getDefaultAvatar() {
            const config = useRuntimeConfig()
            const adsApiUrl = config.public.adsApiBaseUrl;

            return `${adsApiUrl}/storage/avatar.jpg`
        },

        async fetchAdById(id) {
            this.loading = true;
            this.error = null;

            const {$axiosAds} = useNuxtApp();

            try {
                const response = await $axiosAds.get(`/ads/${id}`, {
                    headers: {
                        Authorization: useCookie('token').value || null
                    }
                });

                this.currentAd = response.data.data;
            } catch (err) {
                console.error('Error loading ads:', err);
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        async updateAd(form) {
            this.loading = true;
            this.error = null;

            const {$axiosAds} = useNuxtApp();

            try {
                console.log('form', form)
                await $axiosAds.patch(`/ads/${form.id}`, form, {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (err) {
                console.error('Error update ad:', err);
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        async createAd(form) {
            console.log('form', form)

            this.loading = true;
            this.error = null;

            const {$axiosAds} = useNuxtApp();

            try {
                await $axiosAds.post('/ads', form.value, {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (err) {
                console.error('Error update ad:', err);
                this.error = err.message;
                throw err
            } finally {
                this.loading = false;
            }
        },

        async deleteAd(id) {
            this.loading = true;
            this.error = null;

            const {$axiosAds} = useNuxtApp();

            try {
                await $axiosAds.delete(`/ads/${id}`, {
                    headers: {
                        Authorization: useCookie('token').value || null
                    },
                });
            } catch (err) {
                console.error('Error update ad:', err);
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        async toggleFavorite(adId) {
            this.loading = true;
            this.error = null;

            const {$axiosAds} = useNuxtApp();

            await $axiosAds.post(`/ads/favorite`, {
                ad_id: adId
            }, {
                headers: {
                    Authorization: useCookie('token').value || null,
                },
            })
            .then(response => {
                // const ad = this.ads.filter(ad => ad.id === adId)
                // ad.is_favorite = (ad.is_favorite === false)
            })
            .catch(error => {
                this.error = error.message
                router.push({path: `/ads`, query: {error: error}});
                throw error
            }).finally(() => {
                this.loading = false
            })
        },
    }
});
