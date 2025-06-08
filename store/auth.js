import {defineStore} from 'pinia'
import {useCookie, useNuxtApp} from '#app'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: useCookie('token').value || null,
        isAuthenticated: !!useCookie('token').value,
        profile: null,
        id: null,
    }),
    actions: {
        setToken(token) {
            this.token = token
            this.isAuthenticated = true
            useCookie('token').value = token
        },

        async register(email, password, name) {
            const {$axiosSso} = useNuxtApp();

            console.log("registerForm: ", {email: email, password: password, name: name})

            const response = await $axiosSso.post(
                '/users/register',
                {email: email, password: password, name: name}
            );

            await this.login(email, password)

            return response.data.data
        },

        async login(email, password) {
            const {$axiosSso} = useNuxtApp();

            const response = await $axiosSso.post(
                '/users/login',
                {email: email, password: password}
            );

            console.log("tok", response.data.data.access_token)
            this.setToken(response.data.data.access_token)

            await this.fetchProfile(response.data.data.access_token)
        },

        async serviceLogin(email, password) {
            const {$axiosSso} = useNuxtApp();

            const response = await $axiosSso.post(
                '/users/login',
                {email: email, password: password}
            );

            return response.data.data.access_token
        },

        async serviceFetch(token) {
            console.log(token || useCookie('token').value || null)
            const {$axiosSso} = useNuxtApp();

            const response = await $axiosSso.get(
                '/users/profile',
                {
                    headers: {
                        Authorization: token || useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                }
            );

            return response.data.data
        },

        async logout() {
            this.token = null
            this.isAuthenticated = false
            this.profile = null
            useCookie('token').value = null
            console.log('logout is successful')

            const router = useRouter();
            await router.push({name: 'login'});
        },

        async fetchProfile(token) {
            console.log(token || useCookie('token').value || null)
            const {$axiosSso} = useNuxtApp();

            const response = await $axiosSso.get(
                '/users/profile',
                {
                    headers: {
                        Authorization: token || useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                }
            );

            this.profile = response.data.data
            this.id = response.data.data.id

            return response.data
        },

        async listUsers() {
            const {$axiosSso} = useNuxtApp();

            const response = await $axiosSso.get(
                '/users',
                {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                }
            );

            return response.data.data
        },

        async handleActive(id) {
            const {$axiosSso} = useNuxtApp();

            const response = await $axiosSso.patch(
                `/users/${id}/active`,
                {},
                {
                    headers: {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json',
                    }
                }
            );

            return response.data.data
        },
    },
})
