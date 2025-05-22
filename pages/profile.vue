<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl">
        <img
            src="/avatar.jpg"
            alt="Avatar"
            class="avatar"
        />
      </div>

      <div class="profile-body p-8">
        <h2 class="profile-name text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {{ user?.data?.email || 'User' }}
        </h2>

        <div class="profile-details space-y-4">
          <div class="detail-item flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all">
            <UserIcon class="w-8 h-8 text-blue-600"/>
            <div>
              <p class="text-sm text-gray-500">ID</p>
              <p class="font-medium">{{ user?.data?.id || 'Loading...' }}</p>
            </div>
          </div>

          <div class="detail-item flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all">
            <EnvelopeIcon class="w-8 h-8 text-purple-600"/>
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-medium">{{ user?.data?.email || 'Loading...' }}</p>
            </div>
          </div>
        </div>

        <div class="actions mt-8 space-y-4">
          <button
              class="w-full py-4 px-6 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
              @click="handleLogout"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading-overlay">
      <svg class="animate-spin h-16 w-16 text-blue-600" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {UserIcon, EnvelopeIcon} from '@heroicons/vue/24/solid'
import {useAuthStore} from '~/store/auth'

const authStore = useAuthStore()
const router = useRouter()
const user = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    if (!authStore.token) {
      await router.push('/login')
      return
    }

    const response = await authStore.fetchProfile(authStore.token)

    if (!response.ok) throw new Error('Ошибка загрузки профиля')

    user.value = await response.json()
  } catch (error) {
    console.error('Ошибка:', error)
    await authStore.logout()
    await router.push('/login')
  } finally {
    isLoading.value = false
  }
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleEditProfile = () => {
  router.push('/profile/edit')
}
</script>

<style scoped>
.profile-container {
  @apply min-h-screen flex items-center justify-center bg-gray-50;
  font-family: 'Poppins', sans-serif;
}

.profile-card {
  @apply bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl transform transition-all hover:scale-105 hover:shadow-xl;
}

.profile-header {
  @apply h-40 relative;
}

.avatar {
  @apply absolute left-1/2 transform -translate-x-1/2 -bottom-10 w-28 h-28 rounded-full border-4 border-white shadow-lg;
}

.profile-body {
  @apply space-y-8;
}

.detail-item {
  @apply transition-all duration-300;
}

.detail-item:hover {
  @apply transform translate-x-2;
}

.loading-overlay {
  @apply fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.text-gradient {
  background: linear-gradient(90deg, #3b82f6, #a855f7);
  background-size: 400% 400%;
  animation: gradientAnimation 8s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>