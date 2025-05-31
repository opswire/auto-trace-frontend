<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Список Объявлений</h1>

    <div class="flex justify-between items-center mb-6">
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
          Избранные
        </button>
      </div>

      <button
          @click="goToCreateAd"
          class="btn-create"
      >
        Создать объявление
      </button>
    </div>

    <div class="mb-6 flex flex-wrap gap-4 items-center">
      <input
          v-model="filters.title"
          placeholder="Поиск по названию"
          class="filter-input"
          @input="onSearchInput"
      >

      <input
          v-model="filters.description"
          placeholder="Поиск по описанию"
          class="filter-input"
          @input="onSearchInput"
      >

      <select v-model="sortBy" @change="updateSorting" class="filter-select">
        <option value="id_asc">ID по возрастанию</option>
        <option value="id_desc">ID по убыванию</option>
        <option value="price_asc">Цена по возрастанию</option>
        <option value="price_desc">Цена по убыванию</option>
      </select>
    </div>

    <div>
      <AdList :ads="displayedAds" />
    </div>

    <div v-if="totalPages > 1" class="mt-6 flex justify-center items-center space-x-4">
      <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="paginate-btn"
      >
        Назад
      </button>
      <span class="text-gray-700">Страница {{ currentPage }} из {{ totalPages }}</span>
      <button
          @click="nextPage"
          :disabled="currentPage >= totalPages"
          class="paginate-btn"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';
import AdList from "~/components/ads/AdList.vue";
import { useAdsStore } from "~/store/ads.js";

const adsStore = useAdsStore();
const router = useRouter();
const route = useRoute()
const activeTab = ref('all');
const currentPage = ref(1);
const itemsPerPage = 10;
const total = ref(0);
const ads = ref([]);
const sortBy = ref(route.query.sort || 'id_asc');
const filters = ref({
  title: route.query.title || '',
  description: route.query.description || ''
});

const displayedAds = computed(() => {
  if (activeTab.value === 'favorites') {
    return adsStore.ads.filter(ad => ad.is_favorite);
  }
  return adsStore.ads;
});

onMounted(async () => {
  await loadAds();
});

watch([currentPage, activeTab, sortBy, filters],
    async () => {
      await loadAds();
    },
    { deep: true }
);

const loadAds = async () => {
  const sorters = {}
  const sortParts = sortBy.value.split("_")
  sorters[sortParts[0]] = sortParts[1]

  const queryFilters = Object.fromEntries(Object.entries( {
    "title": filters.value.title,
    "description": filters.value.description,
    "is_favorite": activeTab.value === 'favorites',
  }).filter(([_, v]) => v !== ""));
  console.log("filters", queryFilters)

  await adsStore.fetchAds({
    page: currentPage.value,
    per_page: itemsPerPage,
    sorters: sorters,
    filters: queryFilters,
  });

  total.value = adsStore.total;
};

const totalPages = computed(() => Math.ceil(total.value / itemsPerPage));

const setActiveTab = async (tab) => {
  activeTab.value = tab;
  currentPage.value = 1;
  filters.value = { title: '', description: '' };
};

const nextPage = () => currentPage.value++;
const prevPage = () => currentPage.value--;

const goToCreateAd = () => router.push("/ads/create");
</script>

<style scoped>
.btn-create {
  @apply px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600;
}

.filter-input {
  @apply px-4 py-2 w-48 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.filter-select {
  @apply px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.paginate-btn {
  @apply px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300;
}

button {
  transition: background-color 0.3s, box-shadow 0.3s;
}
button:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
