<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-semibold mb-6 text-center">Вход</h2>
    <form @submit.prevent="login">
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
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition duration-200">
        Войти
      </button>
      <p class="mt-4 text-center text-sm text-gray-600">
        Нет аккаунта?
        <NuxtLink to="/register" class="text-blue-500 hover:underline">Зарегистрироваться</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useAuthStore} from "~/store/auth.js";

const email = ref('');
const password = ref('');

const login = () => {
  const authStore = useAuthStore()
  const router = useRouter();


  // Логика авторизации
  console.log("Email:", email.value, "Password:", password.value);

  authStore
      .login(email.value, password.value)
      .then((_response) => router.push("/"))
      .catch((error) => console.log("API error", error));
};
</script>
