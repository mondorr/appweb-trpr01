<script setup lang="ts">
defineProps<{ description: string, releaseYear: number }>()
</script>

<template>
  <div class="details-container p-4 mb-3">
    <p><strong>Année de sortie:</strong> {{ releaseYear }}</p>
    <p><strong>Description:</strong> {{ description }}</p>
  </div>
</template>

<style scoped>
.details-container {
  background-color: #C5DBFC;
  border-radius: 0 0 5px 5px;
}
</style>