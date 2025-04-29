// stores/ads.js
import {defineStore} from 'pinia';
import {useCookie, useNuxtApp} from '#app';
import router from "#app/plugins/router.js";

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

            const {$axios} = useNuxtApp(); // Получаем экземпляр axios

            try {
                const response = await $axios.get('/ads', {
                    headers: {
                        Authorization: useCookie('token').value || null
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
            const API_BASE = process.env.API_BASE_URL || 'http://localhost:8989';

            if (!ad?.image_url) return `/default.jpg`;

            if (ad.image_url.startsWith('storage')) {
                return `${API_BASE}/${ad.image_url}`;
            }

            return ad.image_url
        },

        getDefaultAvatar() {
            const API_BASE = process.env.API_BASE_URL || 'http://localhost:8989';

            return `${API_BASE}/storage/avatar.jpg`
        },

        async fetchAdById(id) {
            this.loading = true;
            this.error = null;

            const {$axios} = useNuxtApp(); // Получаем экземпляр axios

            try {
                const response = await $axios.get(`/ads/${id}`, {
                    headers: {
                        Authorization: useCookie('token').value || null
                    }
                }); // Запрос к API /ads
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

            const {$axios} = useNuxtApp();

            try {
                console.log('form', form)
                await $axios.patch(`/ads/${form.id}`, form, {
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

        async deleteAd(id) {
            this.loading = true;
            this.error = null;

            const {$axios} = useNuxtApp();

            try {
                await $axios.delete(`/ads/${id}`, {
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

            await $fetch(`http://localhost:8989/api/v1/ads/favorite`, {
                method: 'POST',
                body: {
                    ad_id: adId
                },
                headers: {
                    Authorization: useCookie('token').value || null
                },
            })
                .then(response => {
                    // const ad = this.ads.filter(ad => ad.id === adId)
                    // ad.is_favorite = (ad.is_favorite === false)
                })
                .catch(error => {
                    this.error = error.message
                    router.push({path: `/ads`, query: { error: error }});
                    throw error
                }).finally(() => {
                    this.loading = false
                })
        },
    }
});
