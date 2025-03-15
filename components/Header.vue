<template>
  <header class="bg-gradient-to-r from-gray-900 to-gray-700 text-white mb-8 shadow-md">
    <nav class="container mx-auto flex justify-between items-center py-4 px-6">
      <h1 class="text-3xl font-bold tracking-wide">
        <NuxtLink to="/" class="hover:text-yellow-400 transition-colors duration-300">AutoTrace</NuxtLink>
      </h1>
      <ul class="flex space-x-8 text-lg">
        <li>
          <NuxtLink
              :to="{ name: 'ads' }"
              class="hover:text-yellow-400 transition-colors duration-300"
              :class="{ 'text-yellow-400': route.path === '/ads' }"
          >
            Объявления
          </NuxtLink>
        </li>
<!--        <li>-->
<!--          <NuxtLink-->
<!--              :to="{ name: 'favorites' }"-->
<!--              class="hover:text-yellow-400 transition-colors duration-300"-->
<!--              :class="{ 'text-yellow-400': route.path === '/favorites' }"-->
<!--          >-->
<!--            Избранное-->
<!--          </NuxtLink>-->
<!--        </li>-->
<!--        <li>-->
<!--          <NuxtLink-->
<!--              :to="{ name: 'my-ads' }"-->
<!--              class="hover:text-yellow-400 transition-colors duration-300"-->
<!--              :class="{ 'text-yellow-400': route.path === '/my-ads' }"-->
<!--          >-->
<!--            Мои объявления-->
<!--          </NuxtLink>-->
<!--        </li>-->
<!--        <li>-->
<!--          <NuxtLink-->
<!--              :to="{ name: 'messages' }"-->
<!--              class="hover:text-yellow-400 transition-colors duration-300"-->
<!--              :class="{ 'text-yellow-400': route.path === '/messages' }"-->
<!--          >-->
<!--            Сообщения-->
<!--          </NuxtLink>-->
<!--        </li>-->
      </ul>
      <!-- Регистрация и Вход -->
      <div class="space-x-10">
        <NuxtLink v-if="!isAuthenticated" to="/register" class="btn-secondary hover:text-yellow-500">Регистрация</NuxtLink>
        <NuxtLink v-if="!isAuthenticated" to="/login" class="btn-primary hover:text-yellow-500">Вход</NuxtLink>
        <NuxtLink v-if="isAuthenticated" to="/profile" class="btn-primary hover:text-yellow-500">Мой профиль</NuxtLink>
        <button v-if="isAuthenticated" type="button" @click="logout" class="hover:text-yellow-500">Выйти</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router';
import {useAuthStore} from "~/store/auth.js";

const route = useRoute();
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = () => authStore.logout()
</script>

<style scoped>
.header {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #1a1a1a, #333);
}
</style>
