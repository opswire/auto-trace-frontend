<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header />
    <main class="container mx-auto p-6 flex-grow">
      <NuxtPage />
    </main>
    <footer class="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-4">
      <p>&copy; 2024 AutoTrace. Все права защищены.</p>
    </footer>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue';
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #1a1a1a, #333);
}
</style>
