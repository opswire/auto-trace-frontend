<template>
  <AdDetails :ad="ad"/>
</template>

<style scoped>
</style>

<script setup lang="ts">

import { ref } from 'vue';
import {useAdsStore} from "~/store/ads";
import AdDetails from "~/components/ads/AdDetails.vue";

const ad = ref('')
const route = useRoute()
const adStore = useAdsStore()

await adStore.fetchAdById(route.params.id)
ad.value = adStore.currentAd
</script>

