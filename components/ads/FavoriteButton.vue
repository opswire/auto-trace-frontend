<!-- components/FavoriteButton.vue -->
<template>
  <button
      @click="toggleFavorite"
      :class="{
      'text-green-500 hover:text-green-700': !isFav,
      'text-red-500 hover:text-red-700': isFav
    }"
      class="font-medium"
  >
    {{ isFav ? 'Удалить из избранного' : 'Добавить в избранное' }}
  </button>
</template>

<script setup>
import { defineProps, toRef } from 'vue';
import {useAdsStore} from "~/store/ads.js";

const adsStore = useAdsStore()

const props = defineProps({
  adId: {
    type: Number,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true,
  }
});

const {adId, isFavorite} = props
const isFav = toRef(isFavorite)

const toggleFavorite = () => {
  isFav.value = (isFav.value === false)
  adsStore.toggleFavorite(adId)
};
</script>
