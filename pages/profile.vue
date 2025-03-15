<template>
  <div class="profile-page">
    <h1>Мой профиль</h1>
    <div v-if="user">
      <p><strong>ID:</strong> {{ user.data.id }}</p>
      <p><strong>Email:</strong> {{ user.data.email }}</p>
      <!-- Добавьте другие поля, если необходимо -->
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '~/store/auth'
import { useRouter } from 'vue-router'

const user = ref(null)
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    // Если токена нет, перенаправляем на страницу входа
    if (!authStore.token) {
      return router.push('/login')
    }

    // Запрос к API для получения данных профиля пользователя
    console.log('token: ', authStore.token)
    const response = await axios.get('http://localhost:8787/api/v1/users/profile', {
      headers: {
        Authorization: authStore.token
      },
    })
    user.value = response.data
  } catch (error) {
    console.error("Error loading profile:", error)
    authStore.logout() // Выйти из системы в случае ошибки
    router.push('/login') // Перенаправить на страницу входа
  }
})
</script>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
