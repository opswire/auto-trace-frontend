<template>
  <div
      class="shadow-xl border border-gray-100 p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl group relative"
      :class="{
      'bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-amber-200': ad.promotion.enabled && ad.promotion.tariff_id === 2,
      'bg-white': !ad.promotion.enabled
    }"
  >
    <div
        v-if="ad.promotion.enabled"
        class="mb-4 top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center"
    >
      <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      Продвижение
    </div>

    <!-- Блок изображения -->
    <div class="relative aspect-video mb-6 rounded-xl overflow-hidden bg-gray-50">
      <img
          :src="imageUrl"
          :alt="`${ad.brand} ${ad.model} - ${ad.year_of_release}`"
          class="w-full h-full object-cover transition-opacity duration-300"
          :class="{ 'opacity-0': imageLoading }"
          @load="handleImageLoad"
          @error="handleImageError"
      >
      <div
          v-if="imageLoading || showFallback"
          class="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse"
      >
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
    </div>

    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-1">{{ ad.title }}</h2>
        <p class="text-gray-500 text-sm mb-2">
          <span class="mr-2">🆔 {{ ad.id }}</span>
          <span>📅 {{ formattedDate }}</span>
        </p>
      </div>
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
        <span class="font-bold text-lg">{{ formattedPrice }}</span>
      </div>
    </div>

    <p class="text-gray-600 mb-6 leading-relaxed">{{ ad.description }}</p>

    <div class="border-t border-gray-100 pt-4 flex justify-between items-center">
      <NuxtLink
          :to="`/ads/${ad.id}`"
          class="text-blue-600 hover:text-blue-800 font-medium flex items-center"
      >
        Подробнее
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </NuxtLink>

      <FavoriteButton
          v-if="isAuthenticated"
          :adId="ad.id"
          :isFavorite="ad.is_favorite"
          class="hover:scale-110 transform transition"
      />
    </div>
  </div>
</template>

<script setup>
import {defineProps, computed} from 'vue';
import FavoriteButton from './FavoriteButton.vue';
import {useAuthStore} from "~/store/auth.js";

const props = defineProps({
  ad: {
    type: Object,
    required: true
  }
});

const {ad} = props;
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(ad.price);
});

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(ad.created_at));
});

const config = useRuntimeConfig()
const adsApi = config.public.adsApiBaseUrl;
const imageLoading = ref(true);
const showFallback = ref(false);

const imageUrl = computed(() => {
  if (!props.ad?.image_url) return `/default.jpg`;

  if (props.ad.image_url.startsWith('storage')) {
    return `${adsApi}/${props.ad.image_url}`;
  }

  return props.ad.image_url
});

const handleImageLoad = () => {
  imageLoading.value = false;
  showFallback.value = false;
};

const handleImageError = () => {
  imageLoading.value = false;
  showFallback.value = true;
};

</script>

<style scoped>
.promotion-badge {
  animation: pulse 2s infinite;
}

.shadow-promoted {
  box-shadow: 0 10px 15px -3px rgba(245, 158, 11, 0.1), 0 4px 6px -4px rgba(245, 158, 11, 0.1);
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>