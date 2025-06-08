<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Список встреч</h1>

    <div v-if="appointments.length === 0" class="text-gray-500 text-center">
      Нет назначенных встреч.
    </div>

    <div v-else class="space-y-6">
      <div
          v-for="app in appointments"
          :key="app.id"
          class="p-5 border rounded-2xl shadow bg-white hover:shadow-md transition"
      >
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="text-xl font-semibold text-gray-900">{{ app.location }}</p>
            <p class="text-sm text-gray-600 mt-1">
              {{ formatDate(app.start) }} &nbsp; · &nbsp;
              {{ app.duration }} мин
            </p>
            <p class="text-sm text-gray-500 mt-1">ID объявления: {{ app.ad_id }}</p>
            <p class="text-sm text-gray-500 mt-1">Название объявления: <a class="underline" :href="`/ads/${app.ad_id}`">{{
                app.ad_title
              }}</a></p>
          </div>

          <div class="text-right space-y-2">
            <span
                class="px-3 py-1 rounded-full font-medium inline-block"
                :class="app.is_canceled
                ? 'bg-red-100 text-red-800'
                : (app.is_confirmed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800')"
            >
              {{ app.is_canceled ? 'Отменено' : (app.is_confirmed ? 'Подтверждено' : 'Ожидает подтверждения') }}
            </span>

            <div class="space-x-2">
              <button
                  v-if="!app.is_confirmed && !app.is_canceled && authStore.profile?.id === app.seller_id"
                  @click="confirmAppointment(app.id)"
                  class="px-3 py-1 text-sm rounded-md bg-green-500 hover:bg-green-600 text-white"
              >
                Подтвердить
              </button>
              <button
                  v-if="!app.is_canceled"
                  @click="cancelAppointment(app.id)"
                  class="px-3 py-1 text-sm rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                Отменить
              </button>
            </div>
            <div class="mt-3 space-y-1 text-sm text-gray-700">
              <p><strong>Продавец:</strong> {{ app.seller_name }}</p>
              <p><strong>Покупатель:</strong> {{ app.buyer_name }}</p>
              <p>
                <strong>Вы участвуете как: </strong>
                <span class="italic text-blue-600">
        {{
                    authStore.profile?.id === app.seller_id
                        ? 'продавец'
                        : 'покупатель'
                  }}
      </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {useAppointmentStore} from "~/store/appointment";
import {useAuthStore} from "~/store/auth.js";

const appStore = useAppointmentStore()
const authStore = useAuthStore()
const router = useRouter();

await appStore.fetchAppointments()
const appointments = appStore.appointments

const confirmAppointment = async (appId) => {
  try {
    await appStore.confirmAppointment(appId)
  } catch (e) {
    await router.push({path: `/appointments`, query: {error: appStore.error}});
  }
}
const cancelAppointment = async (appId) => await appStore.cancelAppointment(appId)

function formatDate(isoString) {
  const date = new Date(isoString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
