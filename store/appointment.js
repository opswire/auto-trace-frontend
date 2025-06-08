import {defineStore} from 'pinia';
import {useCookie, useNuxtApp} from '#app';
import router from "#app/plugins/router.js";

export const useAppointmentStore = defineStore('appointment', {
    state: () => ({
        appointments: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchAppointments() {
            this.loading = true;
            const {$axiosAppointment} = useNuxtApp();

            try {
                const response = await $axiosAppointment.get('/appointments', {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                });
                this.appointments = response.data.data.appointments;
                console.log(this.appointments)
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка загрузки встреч';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async confirmAppointment(appId) {
            this.loading = true;
            const {$axiosAppointment} = useNuxtApp();

            try {
                await $axiosAppointment.patch(`/appointments/${appId}/confirm`, {}, {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                });

                this.appointments.map(item => {
                    if (item.id === appId) {
                        item.is_confirmed = true
                    }
                })
            } catch (error) {
                this.error = error.response?.data?.error || 'Ошибка продтверждения встречи';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async cancelAppointment(appId) {
            this.loading = true;
            const {$axiosAppointment} = useNuxtApp();

            try {
                await $axiosAppointment.patch(`/appointments/${appId}/cancel`, {}, {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                });

                this.appointments.map(item => {
                    if (item.id === appId) {
                        item.is_canceled = true
                    }
                })
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка отмены встречи';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async storeAppointment(payload) {
            this.loading = true;
            const {$axiosAppointment} = useNuxtApp();

            try {
                await $axiosAppointment.post(`/appointments`, payload, {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                });

            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка создания встречи';
                throw error;
            } finally {
                this.loading = false;
            }
        },
    }
});