<template>
  <div class="bg-gray-50 min-h-screen">

    <!-- Hero Section -->
    <section class="hero-section bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-40">
      <div class="container mx-auto px-4 relative">
        <h1 class="text-5xl font-extrabold leading-tight mb-6 fade-in-hero">
          Инновация в авто-торговле с NFT
        </h1>
        <p class="text-2xl mb-8 max-w-3xl mx-auto fade-in-hero">
          Каждому автомобилю присваивается уникальный NFT, который позволяет отслеживать его историю, подтверждать подлинность и транзакции, обеспечивая прозрачность на всех этапах.
        </p>
        <NuxtLink
            :to="isAuthenticated ? '/profile' : '/register'"
            class="inline-block bg-white text-gray-900 py-3 px-10 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-500">
          {{ isAuthenticated ? 'Мой профиль' : 'Присоединиться сейчас' }}
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-semibold mb-10 fade-in-hero">Наши ключевые преимущества</h2>
        <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-12">
          <div class="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 fade-in-hero">
            <h3 class="text-xl font-semibold mb-4">NFT для автомобилей</h3>
            <p class="text-gray-700">Каждому автомобилю присваивается уникальный NFT, который служит цифровым паспортом, гарантируя подлинность и прозрачность истории.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 fade-in-hero">
            <h3 class="text-xl font-semibold mb-4">Мгновенные транзакции</h3>
            <p class="text-gray-700">Наша платформа позволяет моментально совершать безопасные сделки с полным контролем за каждой операцией.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 fade-in-hero">
            <h3 class="text-xl font-semibold mb-4">Полная безопасность</h3>
            <p class="text-gray-700">Все транзакции защищены с использованием современных технологий блокчейна и шифрования данных.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- NFT Section -->
    <section class="bg-gray-100 py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-semibold mb-8 fade-in-hero">Что такое NFT для автомобилей?</h2>
        <p class="text-xl text-gray-700 mb-8">
          NFT (Non-Fungible Token) — это цифровой сертификат, который прилагается к каждому автомобилю на нашей платформе. Он хранит всю историю автомобиля и доступен для проверки в любое время.
        </p>
        <ul class="text-lg text-gray-600 list-inside list-disc mb-8">
          <li>История владельцев</li>
          <li>Все ремонты и сервисные работы</li>
          <li>Данные о происшествиях и повреждениях</li>
          <li>Подтверждения проверок и сертификаций</li>
        </ul>
        <p class="text-lg text-gray-600 mb-8">
          Благодаря технологии блокчейн, вся информация доступна для прозрачной проверки и не может быть изменена или удалена.
        </p>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 relative">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-semibold mb-6 fade-in-hero">Присоединяйтесь к революции в авто-торговле</h2>
        <p class="text-xl">Используйте нашу платформу для безопасных и прозрачных сделок с автомобилями, подкрепленных уникальными NFT.</p>
      </div>
    </section>

  </div>
</template>

<script setup>
// Проверка авторизации
import {useAuthStore} from "~/store/auth.js";

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>

<style scoped>
/* Плавные анимации */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-in-hero {
  animation: fadeIn 2s ease-out forwards;
}

.fade-in-hero:nth-child(1) {
  animation-delay: 0s;
}

.fade-in-hero:nth-child(2) {
  animation-delay: 0.5s;
}

.fade-in-hero:nth-child(3) {
  animation-delay: 1s;
}

.fade-in-hero:nth-child(4) {
  animation-delay: 1.5s;
}

/* Плавные анимации на блоки */
.grid div {
  animation: fadeIn 2s ease-out forwards;
}

.grid div:hover {
  transform: scale(1.05);
}

/* Стиль для кнопок */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  background-color: #e4e4e4;
}

/* Изменение фона */
.bg-gray-900 {
  background-color: #1a1a1a !important;
}

.bg-gray-800 {
  background-color: #2c2c2c !important;
}

.bg-gray-700 {
  background-color: #4b4b4b !important;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #1a1a1a, #333);
}

/* Тени и плавные переходы */
.shadow-xl {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.shadow-2xl {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.rounded-lg {
  border-radius: 10px;
}
</style>
