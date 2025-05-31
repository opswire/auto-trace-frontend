<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold text-center mb-4">Регистрация</h1>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
            v-model="email"
            type="email"
            id="email"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Введите ваш email"
            required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Пароль</label>
        <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Введите ваш пароль"
            required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Имя</label>
        <input
            v-model="name"
            type="text"
            id="name"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Введите ваше имя"
            required
        />
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition duration-200">
        Зарегистрироваться
      </button>
      <p class="mt-4 text-center text-sm text-gray-600">
        Уже зарегистрированы?
        <NuxtLink to="/login" class="text-blue-500 hover:underline">Войти</NuxtLink>
      </p>
      <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useAuthStore} from "~/store/auth.js";

const authStore = useAuthStore()
const router = useRouter();

const email = ref('');
const password = ref('');
const name = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  try {
    const response = await authStore.register(email.value, password.value)

    console.log('Регистрация успешна:', response);

    await router.push({path: '/', query: {success: 'Регистрация успешна!'}});
  } catch (error) {
    console.log(error)
    errorMessage.value = 'Ошибка регистрации';
  }
};
</script>

<style scoped>
</style>
