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
    {{ isFav ? 'Remove from Favorites' : 'Add to Favorites' }}
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
    type: Number,
    required: true,
  }
});

const {adId, isFavorite} = props
const isFav = toRef(isFavorite)

const toggleFavorite = () => {
  adsStore.toggleFavorite(adId)
  isFav.value = isFav.value === 0 ? 1 : 0
};
</script>
