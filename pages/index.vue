<template>
  <div class="bg-gray-50 min-h-screen">

    <section class="hero-section bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white text-center py-40 relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-6xl font-extrabold leading-tight mb-6 transform transition-transform duration-500 hover:scale-105">
          Продавайте автомобили быстрее и выгоднее
        </h1>
        <p class="text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Продвигайте объявления, общайтесь с покупателями в мессенджере и оформляйте сделки
          с автоматическим договором купли-продажи
        </p>
        <NuxtLink
            :to="'/ads'"
            class="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-12 rounded-full text-lg font-semibold hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transition duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Смотреть объявления
        </NuxtLink>
      </div>
      <div class="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-10"></div>
    </section>

    <!-- Promotion Section -->
    <section class="bg-white py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-10">
          <div class="md:w-1/2">
            <h2 class="text-3xl md:text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              Выделите свое объявление
            </h2>
            <p class="text-lg text-gray-700 mb-6">
              Получите в <span class="font-semibold">3 раза больше просмотров</span> с помощью наших инструментов продвижения
            </p>
            <NuxtLink
                to="/ads"
                class="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition shadow-md">
              <ArrowTrendingUpIcon class="w-5 h-5 mr-2"/>
              Продвигать объявления
            </NuxtLink>
          </div>
          <div class="md:w-1/2">
            <div class="relative bg-white p-6 rounded-2xl shadow-xl border border-blue-200">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mb-2">
                    <StarIcon class="w-6 h-6 text-yellow-300"/>
                  </div>
                  <h3 class="text-xl font-bold text-gray-800">Премиум пакет</h3>
                </div>
                <span class="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-semibold">TOP 3 в поиске</span>
              </div>

              <ul class="space-y-3 mb-6">
                <li class="flex items-center">
                  <CheckCircleIcon class="w-5 h-5 text-green-500 mr-2"/>
                  <span>Приоритет в поиске и категориях</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="w-5 h-5 text-green-500 mr-2"/>
                  <span>Выделение цветом и значком "Топ"</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="w-5 h-5 text-green-500 mr-2"/>
                  <span>В 3 раза больше просмотров</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="w-5 h-5 text-green-500 mr-2"/>
                  <span>Продвижение в соцсетях</span>
                </li>
              </ul>

              <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <span class="text-2xl font-bold text-gray-900">990 ₽</span>
                <button class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg font-medium transition">
                  Выбрать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Создайте NFT вашего автомобиля
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

import {
  ArrowTrendingUpIcon,
  StarIcon,
} from "@heroicons/vue/24/solid";
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