<!-- components/FavoriteButton.vue -->
<template>
  <button
      @click="toggleFavorite"
      :class="{
      'text-green-500 hover:text-green-700': !isFavorite,
      'text-red-500 hover:text-red-700': isFavorite
    }"
      class="font-medium"
  >
    {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
  </button>
</template>

<script setup>
// import { useFavoritesStore } from '~/store/favorites';
import { defineProps, computed } from 'vue';
import {useAdsStore} from "~/store/ads.js";

const adsStore = useAdsStore()

const props = defineProps({
  adId: {
    type: Number,
    required: true
  }
});

const {adId} = props

let isFavorite = false

// const favoritesStore = useFavoritesStore();

// const isFavorite = computed(() => favoritesStore.favorites.includes(props.adId));

const toggleFavorite = () => {
  adsStore.toggleFavorite(adId)
  // if (isFavorite.value) {
  //   favoritesStore.removeFavorite(props.adId);
  // } else {
  //   favoritesStore.addFavorite(props.adId);
  // }
};
</script>
