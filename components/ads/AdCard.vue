<!-- components/AdCard.vue -->
<template>
  <div class="bg-white shadow-md border border-gray-200 p-6 rounded-lg transform transition hover:scale-105">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ ad.car.vin }}</h2>
    <p class="text-gray-600 mb-4">{{ ad.description }}</p>
    <div class="flex justify-between items-center">
      <NuxtLink :to="`/ads/${ad.id}`" class="text-blue-500 hover:text-blue-700">View Details</NuxtLink>
      <FavoriteButton v-if="isAuthenticated" :adId="ad.id" :isFavorite="ad.is_favorite" />
    </div>
  </div>
</template>

<script setup>
import FavoriteButton from './FavoriteButton.vue';
import { defineProps } from 'vue';
import {useAuthStore} from "~/store/auth.js";

const props = defineProps({
  ad: {
    type: Object,
    required: true
  }
});
const { ad } = props;

const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>
