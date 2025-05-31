import {defineStore} from 'pinia';
import {useCookie, useNuxtApp} from '#app';
import router from "#app/plugins/router.js";

export const useChatStore = defineStore('chat', {
    state: () => ({
        chats: [],
        messages: [],
        loading: false,
        error: null
    }),

    actions: {
        async storeChat(sellerId, adId) {
            try {
                this.loading = true;
                const {$axiosChat} = useNuxtApp();

                const response = await $axiosChat.post(`/chats`, {
                    "seller_id": sellerId,
                    "ad_id": adId,
                }, {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    },
                });

                console.log("data: ", response.data.data)

                this.chats.push(response.data.data);
                return response
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка загрузки диалогов';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchChats() {
            this.loading = true;
            const {$axiosChat} = useNuxtApp();

            try {
                const response = await $axiosChat.get('/chats', {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                });
                this.chats = response.data.data.chats;
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка загрузки диалогов';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchMessages(chatId) {
            this.loading = true;
            const {$axiosChat} = useNuxtApp();

            try {
                const response = await $axiosChat.get(`/chats/${chatId}/messages`, {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                });
                this.messages = response.data.data.messages;
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка загрузки сообщений';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async sendMessage(chatId, payload) {
            const {$axiosChat} = useNuxtApp();

            try {
                const response = await $axiosChat.post(`/chats/${chatId}/messages`, payload, {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                });
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка отправки сообщения';
                throw error;
            }
        }
    }
});