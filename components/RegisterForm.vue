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
import axios from 'axios';
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8787/api/v1/users/register', { email: email.value, password: password.value });
    console.log('Регистрация успешна:', response.data);

    await router.push("/");
  } catch (error) {
    console.log(error)
    errorMessage.value = error.response?.data?.message || 'Ошибка регистрации';
  }
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.25rem;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #3730a3;
}
</style>
