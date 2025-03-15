// stores/auth.js
import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: useCookie('token').value || null, // Инициализация токена из cookie
        isAuthenticated: !!useCookie('token').value,
    }),
    actions: {
        setToken(token) {
            this.token = token
            this.isAuthenticated = true
            useCookie('token').value = token // Сохранение токена в cookies
        },
        async login(email, password) {
            await $fetch(`http://localhost:8787/api/v1/users/login`, {
                method: 'POST',
                body: {
                    email: email,
                    password: password
                }
            })
                .then(response => {
                    this.setToken(response.data.access_token)
                })
                .catch(error => {
                    throw error
                })
        },
        logout() {
            this.token = null
            this.isAuthenticated = false
            useCookie('token').value = null // Удаление токена из cookies
            console.log('logout is successful')

            const router = useRouter();
            router.push({ name: 'login' });
        },
    },
})
