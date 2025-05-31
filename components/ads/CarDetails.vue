<template>
  <div class="car-details-card group">
    <div class="icon-container">
      <span class="emoji">{{ icon }}</span>
      <h4 class="title">{{ title }}</h4>
    </div>

    <div class="content">
      <div
          v-for="(item, index) in items"
          :key="index"
          class="detail-item"
          :class="{ 'highlight': item.highlight }"
      >
        <span class="label">{{ item.label }}</span>
        <div class="value-container">
          <span class="value">
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  icon: {
    type: String,
    required: true,
  }
});
</script>

<style scoped>
.car-details-card {
  @apply bg-white rounded-3xl p-6 shadow-lg transition
  hover:shadow-xl hover:-translate-y-1;

  &::before {
    content: '';
    @apply absolute inset-0 bg-gradient-to-br from-blue-50
    to-transparent rounded-3xl opacity-70
    transition-transform duration-500
    transform scale-0 group-hover:scale-100;
  }
}

.icon-container {
  @apply flex items-center gap-4 mb-5;
}

.emoji {
  @apply text-4xl p-2 rounded-xl bg-blue-100;
}

.title {
  @apply text-xl font-semibold text-gray-800
  border-b-2 border-dashed border-blue-200 pb-2;
}

.content {
  @apply space-y-3;
}

.detail-item {
  @apply flex justify-between items-center
  text-gray-600 py-3 border-b border-gray-100;

  &:last-child {
    @apply border-b-0;
  }

  .label {
    @apply font-medium text-sm text-gray-500;
  }

  .value {
    @apply font-semibold text-right;
  }

  &.highlight .value {
    @apply text-blue-600;
  }
}
</style>