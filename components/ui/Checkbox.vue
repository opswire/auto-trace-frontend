<template>
  <label class="checkbox-container">
    <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="native-checkbox"
    >
    <span class="custom-checkbox"></span>
    <span class="label">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox-container {
  @apply flex items-center gap-3 cursor-pointer
  p-3 rounded-lg transition-colors
  hover:bg-gray-50;
}

.native-checkbox {
  @apply sr-only;
}

.custom-checkbox {
  @apply flex-shrink-0 w-6 h-6 rounded-md
  border-2 border-gray-300 bg-white
  flex items-center justify-center
  transition-all;
}

.native-checkbox:checked + .custom-checkbox {
  @apply bg-blue-600 border-transparent;

  &::after {
    content: '✓';
    @apply text-white text-lg;
  }
}

.label {
  @apply text-gray-700 font-medium
  select-none transition-colors;
}

.checkbox-container:hover .custom-checkbox {
  @apply border-blue-300;
}

.native-checkbox:disabled + .custom-checkbox {
  @apply bg-gray-200 border-gray-300
  cursor-not-allowed;
}

.native-checkbox:disabled:checked + .custom-checkbox {
  @apply bg-gray-400;
}
</style>