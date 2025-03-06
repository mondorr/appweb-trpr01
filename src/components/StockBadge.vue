<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
  stock: number
}>()

const stockBadgeClass = computed(() => {
  if (props.stock === 0) return 'bg-danger';
  if (props.stock <= 50) return 'bg-warning';
  return 'bg-success';
});
</script>

<template>
  <span :class="['badge', stockBadgeClass]">
    {{ stock }}
  </span>
</template>