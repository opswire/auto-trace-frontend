<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <!-- Блок авторизации (показывается если пользователь не авторизован как организация) -->
      <div v-if="!isAuthenticated" class="bg-white p-8 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold text-center text-gray-900 mb-6">Авторизация сервисного центра</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email организации</label>
            <input
                v-model="loginForm.email"
                id="email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Пароль</label>
            <input
                v-model="loginForm.password"
                id="password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>

          <div>
            <button
                type="submit"
                :disabled="loginLoading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <span v-if="loginLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Вход...
              </span>
              <span v-else>Войти</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Основная форма (показывается только для авторизованных организаций) -->
      <div v-else class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-8">
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center">
              <div class="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-xl font-bold text-gray-900">Добавить запись о ТО</h2>
                <p class="text-sm text-gray-500">Организация: {{ organization.name }}</p>
              </div>
            </div>
            <button
                @click="handleLogout"
                class="text-sm text-red-600 hover:text-red-800"
            >
              Выйти
            </button>
          </div>

          <form class="mt-6 space-y-6" @submit.prevent="submitForm">
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Описание работ</label>
              <textarea
                  v-model="form.description"
                  rows="3"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Какие работы были выполнены..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Сервисный центр</label>
              <input
                  :value="organization.name"
                  disabled
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>

            <div>
              <label for="signature" class="block text-sm font-medium text-gray-700">ID чека</label>
              <input
                  v-model="form.signature"
                  type="text"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Номер/ID чека обслуживания авто"
              />
            </div>

            <div>
              <button
                  type="submit"
                  :disabled="loading"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                       viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Отправка...
                </span>
                <span v-else>Добавить запись</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useNftStore} from "~/store/nft.js";
import {useAuthStore} from "~/store/auth.js";
import {useCookie} from "#app";

const route = useRoute()
const router = useRouter()

const form = ref({
  description: 'Плановое ТО',
  company: 'AutoTraceService',
  signature: Math.random().toPrecision(3) * 1000000
})

const loading = ref(false)
const error = ref('')
const nftStore = useNftStore()
const authStore = useAuthStore()

async function submitForm() {
  if (!form.value.description || !form.value.company || !form.value.signature) {
    error.value = 'Все поля обязательны для заполнения'
    return
  }

  try {
    loading.value = true
    error.value = ''

    console.log("vin: ", route.params.vin)
    const response = await nftStore.addRecord(route.params.vin, form.value.description, form.value.company, form.value.signature.toString())

    await router.push({
      path: `/ads/${route.query.adId}`,
      query: {
        "success": response
      }
    })
  } catch (err) {
    console.error('Ошибка при добавлении записи:', err)
    error.value = err.response?.data?.message || 'Произошла ошибка при добавлении записи'
  } finally {
    loading.value = false
  }
}

const isAuthenticated = ref(false)
const loginLoading = ref(false)
const organization = ref({
  id: null,
  name: '',
  email: ''
})

// Формы
const loginForm = ref({
  email: 'user3@example.com',
  password: 'pass'
})


// Проверяем авторизацию при загрузке
onMounted(() => {
  checkAuth()
})

// Проверка авторизации в localStorage
function checkAuth() {
  const orgData = localStorage.getItem('serviceCenterAuth')
  if (orgData) {
    try {
      const data = JSON.parse(orgData)
      if (data.token && data.organization) {
        isAuthenticated.value = true
        organization.value = data.organization
      }
    } catch (e) {
      localStorage.removeItem('serviceCenterAuth')
    }
  }
}

// Обработка входа
async function handleLogin() {
  try {
    loginLoading.value = true

    const token = await authStore.serviceLogin(loginForm.value.email, loginForm.value.password)

    console.log(token)

    const profile = await authStore.fetchProfile(token)

    console.log(profile)

    if (profile.role !== "service") {
      await router.push({
        path: `/ads/${route.query.adId}`,
        query: {
          "error": "У пользователя нет прав для внесения изменений"
        }
      })
      return
    }

    organization.value = {
      id: profile.id,
      name: profile.name,
      email: loginForm.value.email
    }

    // Сохраняем в localStorage
    localStorage.setItem('serviceCenterAuth', JSON.stringify({
      token: token,
      organization: organization.value
    }))

    isAuthenticated.value = true
  } catch (error) {
    console.error('Ошибка авторизации:', error)
    await router.replace({
      query: {
        ...route.query,
        error: 'Неверные учетные данные или у вас нет доступа'
      }
    })
  } finally {
    loginLoading.value = false
  }
}

// Выход из системы
function handleLogout() {
  localStorage.removeItem('serviceCenterAuth')
  isAuthenticated.value = false
  organization.value = {id: null, name: '', email: ''}
}

</script>

<style scoped>
button:disabled {
  transition: opacity 0.3s ease;
}
</style>