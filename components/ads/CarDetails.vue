<template>
  <div class="bg-gray-50 p-4 rounded-lg">
    <div class="flex items-center gap-2 mb-2">
      <span class="text-xl">{{ icon }}</span>
      <h4 class="font-semibold text-gray-800">{{ title }}</h4>
    </div>
    <p class="text-gray-600">{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    default: () => ""
  },
  content: {
    type: String,
    required: true,
    default: () => ""
  },
  icon: {
    type: String,
    required: true,
    default: () => ""
  },
});
</script>

<style scoped>

</style>