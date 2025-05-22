<template>
  <div class="input-group">
    <label v-if="label" class="input-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="input-field"
        v-bind="$attrs"
    >
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: [String, Number, Date]
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.input-group {
  @apply flex flex-col gap-1;
}

.input-label {
  @apply text-sm font-medium text-gray-700;
}

.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md
  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  transition-all duration-200;
}

.input-field:disabled {
  @apply bg-gray-100 cursor-not-allowed;
}
</style>