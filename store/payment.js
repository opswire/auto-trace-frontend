import {defineStore} from 'pinia';
import axios from "axios";
import {useCookie, useNuxtApp} from "#app";

export const usePaymentStore = defineStore('payment', {
    state: () => ({
        loading: false,
        error: null,
        selectedTariff: null,
        tariffs: [
            {
                id: 1,
                name: 'Стандарт',
                price: 490.00,
                description: 'Продвижение в общем списке на 24 часа'
            },
            {
                id: 2,
                name: 'Премиум',
                price: 1490.00,
                description: 'Закрепление в топе на 7 дней + выделение цветом'
            }
        ]
    }),
    actions: {
        async promoteAd(adId, tariffId) {
            this.loading = true;
            this.error = null;

            const {$axiosPayment} = useNuxtApp();

            try {
                const response = await $axiosPayment.post(
                    `payments`,
                    {
                        ad_id: adId,
                        tariff_id: tariffId,
                    },
                    {
                        headers: {
                            Authorization: useCookie('token').value
                        }
                    }
                );

                console.log("response promoteAd: ", response.data)

                return response.data.data.confirmation_link;
            } catch (error) {
                this.error = error.data?.message || 'Ошибка при продвижении объявления';
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
});