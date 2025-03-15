<template>
  <AdDetails :ad="ad"/>
</template>

<style scoped>
</style>

<script setup lang="ts">

import AdCard from "~/components/ads/AdCard.vue";
import {useAdsStore} from "~/store/ads";
import AdDetails from "~/components/ads/AdDetails.vue";

const route = useRoute()
const adStore = useAdsStore()

await adStore.fetchAdById(route.params.id)
const ad = adStore.currentAd.data
</script>

