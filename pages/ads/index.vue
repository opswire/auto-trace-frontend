<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Список Объявлений</h1>

    <!-- Верхняя панель с переключателем вкладок и кнопкой -->
    <div class="flex justify-between items-center mb-6">
      <!-- Переключатель вкладок -->
      <div class="flex space-x-2">
        <button
            @click="setActiveTab('all')"
            :class="[
            'px-6 py-2 font-semibold rounded-l-lg',
            activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700',
          ]"
        >
          Доступные объявления
        </button>
        <button
            @click="setActiveTab('favorites')"
            :class="[
            'px-6 py-2 font-semibold rounded-r-lg',
            activeTab === 'favorites' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700',
          ]"
        >
          Мои объявления
        </button>
      </div>

      <!-- Кнопка для создания объявления -->
      <button
          @click="goToCreateAd"
          class="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600"
      >
        Создать объявление
      </button>
    </div>

    <!-- Список объявлений -->
    <div>
      <AdList :ads="ads" />
    </div>
  </div>
</template>

<script setup>
import AdList from "~/components/ads/AdList.vue";
import { useAdsStore } from "~/store/ads.js";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const adsStore = useAdsStore();
const router = useRouter();
const activeTab = ref("all"); // Управляет активной вкладкой

// Загружаем объявления
await adsStore.fetchAds();
const ads = ref(adsStore.ads);
console.log(ads.value)

// Текущий пользователь
const currentUserId = "123"; // Пример, заменить на реальный ID пользователя

// Вычисляемый список объявлений в зависимости от вкладки
const filteredAds = computed(() => {
  if (activeTab.value === "all") {
    ads.value = adsStore.ads
    return adsStore.ads; // Все объявления
  } else if (activeTab.value === "favorites") {
    return adsStore.ads.filter((ad) => ad.is_favorite == 1); // Используем == вместо ===
  }
  return [];
});

// Методы
const setActiveTab = async tab => {
  activeTab.value = tab;
  if (tab === 'all') {
    ads.value = adsStore.ads
  } else {
    ads.value = adsStore.ads.filter((ad) => ad.is_favorite === 1)
  }
};
const goToCreateAd = () => router.push("/ads/create");
</script>

<style scoped>
button {
  transition: background-color 0.3s, box-shadow 0.3s;
}
button:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
