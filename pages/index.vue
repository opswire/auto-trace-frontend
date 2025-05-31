<template>
  <div class="bg-gray-50 min-h-screen">

    <section class="hero-section bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white text-center py-40 relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-6xl font-extrabold leading-tight mb-6 transform transition-transform duration-500 hover:scale-105">
          Инновация в авто-торговле с NFT
        </h1>
        <p class="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Каждому автомобилю присваивается уникальный NFT, который позволяет отслеживать его историю, подтверждать подлинность и транзакции, обеспечивая прозрачность на всех этапах.
        </p>
        <NuxtLink
            :to="'/ads'"
            class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-12 rounded-full text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transition duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Смотреть объявления
        </NuxtLink>
      </div>
      <div class="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-10"></div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-semibold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Наши ключевые преимущества
        </h2>
        <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-12">
          <div
              v-for="(feature, index) in features"
              :key="index"
              class="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative feature-card"
          >
            <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <component :is="feature.icon" class="w-8 h-8 text-white"/>
            </div>
            <h3 class="text-2xl font-semibold mb-4 mt-8">{{ feature.title }}</h3>
            <p class="text-gray-700">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Что такое NFT для автомобилей?
        </h2>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <img src="/car-nft.jpeg" alt="NFT Car" class="rounded-3xl shadow-2xl w-full h-auto">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-30"></div>
          </div>
          <div class="space-y-6">
            <p class="text-xl text-gray-700 mb-4">
              NFT (Non-Fungible Token) — это цифровой сертификат, который прилагается к каждому автомобилю на нашей платформе. Он хранит всю историю автомобиля и доступен для проверки в любое время.
            </p>
            <ul class="text-lg text-gray-600 list-inside list-disc space-y-2">
              <li v-for="(item, index) in nftFeatures" :key="index" class="flex items-center space-x-3">
                <CheckCircleIcon class="w-6 h-6 text-green-500"/>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 relative overflow-hidden">
      <div class="container mx-auto px-4 text-center relative z-10">
        <h2 class="text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Присоединяйтесь к революции в авто-торговле
        </h2>
        <p class="text-xl mb-8">Используйте нашу платформу для безопасных и прозрачных сделок с автомобилями, подкрепленных уникальными NFT.</p>
        <NuxtLink
            to="/ads"
            class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-12 rounded-full text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transition duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Начать сейчас
        </NuxtLink>
      </div>
      <div class="absolute inset-0 bg-gradient-overlay opacity-10"></div>
    </section>

  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth.js";
import { CheckCircleIcon, ShieldCheckIcon, BoltIcon, DocumentTextIcon } from "@heroicons/vue/24/solid";

const authStore = useAuthStore();

const features = [
  {
    title: "NFT для автомобилей",
    description: "Каждому автомобилю присваивается уникальный NFT, который служит цифровым паспортом, гарантируя подлинность и прозрачность истории.",
    icon: DocumentTextIcon
  },
  {
    title: "Мгновенные транзакции",
    description: "Наша платформа позволяет моментально совершать безопасные сделки с полным контролем за каждой операцией.",
    icon: BoltIcon
  },
  {
    title: "Полная безопасность",
    description: "Все транзакции защищены с использованием современных технологий блокчейна и шифрования данных.",
    icon: ShieldCheckIcon
  }
];

const nftFeatures = [
  "История владельцев",
  "Все ремонты и сервисные работы",
  "Данные о происшествиях и повреждениях",
  "Подтверждения проверок и сертификаций"
];
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}

.bg-hero-pattern {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath fill='%232d3748' fill-opacity='0.4' d='M0 40V0h40v40H0zm28-28h-4v-4h4v4zm0 8h-4v-4h4v4zm-16 0H8v-4h4v4zm16 0h-4v-4h4v4zm0-16h-4v-4h4v4zm-16 0H8v-4h4v4zm16 16h-4v-4h4v4zm-16-16H8v-4h4v4zm8 8h-4v-4h4v4zm-8 8H8v-4h4v4zm8 0h-4v-4h4v4zm-8-8H8v-4h4v4zm8 8h-4v-4h4v4zm-8 0H8v-4h4v4zm8 0h-4v-4h4v4zm-8-8H8v-4h4v4zm8 0h-4v-4h4v4zm-8 8H8v-4h4v4zm8 0h-4v-4h4v4zm-8 0H8v-4h4v4zm0-16H8v-4h4v4zm0 8H8v-4h4v4zm0 8H8v-4h4v4zm8-16h-4v-4h4v4zm0 24h-4v-4h4v4zm0-16h-4v-4h4v4zm0 8h-4v-4h4v4zm-8-8H8v-4h4v4zm8 0h-4v-4h4v4zm-8 8H8v-4h4v4zm8 0h-4v-4h4v4zm-8 8H8v-4h4v4zm8 0h-4v-4h4v4zm-8 0H8v-4h4v4zm8 0h-4v-4h4v4z'/%3E%3C/svg%3E");
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  padding: 2px;
  background: linear-gradient(60deg, #3b82f6, #a855f7);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: opacity 0.3s;
}

.feature-card:hover::before {
  opacity: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

</style>