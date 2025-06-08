<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Пользователи</h1>

    <div v-if="loading" class="text-gray-500">Загрузка...</div>
    <div v-else-if="users.length === 0" class="text-gray-500">Нет пользователей.</div>

    <table v-else class="min-w-full bg-white shadow rounded-lg overflow-hidden">
      <thead class="bg-gray-100 text-gray-700">
      <tr>
        <th class="px-4 py-2 text-left">ID</th>
        <th class="px-4 py-2 text-left">Имя</th>
        <th class="px-4 py-2 text-left">Email</th>
        <th class="px-4 py-2 text-left">Роль</th>
        <th class="px-4 py-2 text-left">Статус</th>
        <th class="px-4 py-2 text-left">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="user in users"
          :key="user.id"
          class="border-t hover:bg-gray-50"
      >
        <td class="px-4 py-2">{{ user.id }}</td>
        <td class="px-4 py-2">{{ user.name }}</td>
        <td class="px-4 py-2">{{ user.email }}</td>
        <td class="px-4 py-2 capitalize">{{ user.role }}</td>
        <td class="px-4 py-2">
            <span
                :class="user.is_blocked
                ? 'text-red-600 font-semibold'
                : 'text-green-600 font-semibold'"
            >
              {{ !user.is_active ? 'Заблокирован' : 'Активен' }}
            </span>
        </td>
        <td class="px-4 py-2 space-x-2" v-if="user.role !== 'admin'">
          <button
              v-if="user.is_active"
              @click="blockUser(user.id)"
              class="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
          >
            Заблокировать
          </button>
          <button
              v-else
              @click="unblockUser(user.id)"
              class="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md"
          >
            Разблокировать
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useAuthStore} from '~/store/auth'

const users = ref([])
const loading = ref(true)
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    users.value = await authStore.listUsers()
  } catch (e) {
    console.error(e)
    await router.push({path: '/', query: {error: 'Нет доступа'}})
  } finally {
    loading.value = false
  }
})

const blockUser = async (userId) => {
  await authStore.handleActive(userId)
  const user = users.value.find(u => u.id === userId)
  if (user) user.is_active = false
}

const unblockUser = async (userId) => {
  await authStore.handleActive(userId)
  const user = users.value.find(u => u.id === userId)
  if (user) user.is_active = true
}
</script>
