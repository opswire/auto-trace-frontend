<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header />
    <main class="container mx-auto p-6 flex-grow">
      <Transition name="slide-fade">
        <div
            v-if="errorMessage"
            class="error-notification"
        >
          <span class="error-icon">⚠</span>
          {{ errorMessage }}
        </div>
      </Transition>

      <Transition name="slide-fade">
        <div
            v-if="successMessage"
            class="success-notification"
        >
          <span class="check-icon">✓</span>
          {{ successMessage }}
        </div>
      </Transition>

      <NuxtPage />
    </main>
    <footer class="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-4">
      <p>&copy; 2025 AutoTrace. Все права защищены.</p>
    </footer>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue';
import { ref, onMounted } from 'vue';
import {useAuthStore} from "~/store/auth.js";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore()

const successMessage = ref('');
const errorMessage = ref('');

onMounted(async () => {
  await checkNotifications();
  await authStore.fetchProfile()
});

const checkNotifications = () => {
  // Обработка успешного сообщения
  if (route.query.success) {
    successMessage.value = decodeURIComponent(route.query.success);
    clearNotificationAfterDelay(successMessage);
  }

  // Обработка ошибки
  if (route.query.error) {
    errorMessage.value = decodeURIComponent(route.query.error);
    clearNotificationAfterDelay(errorMessage);
  }
};

const clearNotificationAfterDelay = (messageRef) => {
  setTimeout(() => {
    messageRef.value = '';
    router.replace({ query: {} }); // Очищаем параметры
  }, 3000);
};

// Отслеживаем изменения маршрута
watch(() => route.fullPath, checkNotifications);

const checkSuccessMessage = () => {
  console.log(route.query.saved)
  if (route.query.saved) {
    successMessage.value = 'Изменения успешно сохранены!';
    setTimeout(() => {
      successMessage.value = '';
      router.replace({ query: {} });
    }, 3000);
  }
};

watch(() => route.fullPath, () => {
  checkSuccessMessage();
});
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #1a1a1a, #333);
}
/* Общие стили для уведомлений */
.notification-base {
  @apply fixed top-6 right-6 flex items-center
  px-6 py-4 rounded-lg shadow-xl;
  backdrop-filter: blur(2px);
  min-width: 300px;
}

/* Стили для успешного уведомления */
.success-notification {
  @apply notification-base bg-green-50 border-l-4 border-green-500 text-green-700;
}

/* Стили для ошибки */
.error-notification {
  @apply notification-base bg-red-50 border-l-4 border-red-500 text-red-700;
}

.error-icon {
  @apply text-2xl mr-3 animate-pulse;
}

.check-icon {
  @apply text-2xl mr-3 animate-bounce;
}

/* Анимация */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>
