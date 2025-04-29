<!-- components/AdList.vue -->
<template>
  <div class="container mx-auto">
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <AdCard v-for="ad in ads" :key="ad.id" :ad="ad" />
    </div>
  </div>
</template>

<script setup>
import AdCard from './AdCard.vue';

const props = defineProps({
  ads: {
    type: Array, // Исправлено с Object на Array
    required: true,
    default: () => [] // Добавлено значение по умолчанию
  }
});

</script>
