<script setup lang="ts">
import { ref } from 'vue'
import type { Vinyl } from '../scripts/types'
import VinylRowDetails from './VinylRowDetails.vue'
import StockBadge from './StockBadge.vue'

defineProps<{ vinyl: Vinyl }>()
const emit = defineEmits(['edit', 'delete', 'duplicate'])

// Track expanded state
const isExpanded = ref(false)

// Toggle row expansion (ignores dropdown clicks)
const toggleExpand = (event: Event) => {
  const target = event.target as HTMLElement
  if (target.closest('.dropdown, button')) return
  isExpanded.value = !isExpanded.value
}
</script>

<template>
    <!-- Transition (HTML & CSS) found with ChatGPT -->
    <div 
      :key="vinyl.id" 
      class="list-group-item mp-0 p-0 row py-3 d-flex align-items-center vinyl-row"
      :class="{ 'expanded': isExpanded }"
      @click="toggleExpand"
    >
      <div class="col-1 ps-1">
        <img :src="vinyl.coverURL" :alt="vinyl.album" class="img-fluid rounded vinyl-row-icon">
      </div>
      <div class="col-3 ps-3">{{ vinyl.album }}</div>
      <div class="col-3">{{ vinyl.artist }}</div>
      <div class="col-2">{{ vinyl.price }}$</div>
      <div class="col-2"><StockBadge :stock="vinyl.stock" /></div>
      <div class="col-1 text-center">
        <div class="dropdown">
          <button class="btn btn-light btn-lg rounded-circle" type="button" data-bs-toggle="dropdown">
            ...
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><button class="dropdown-item text-success" @click.stop="emit('duplicate', vinyl)"><i class="bi bi-copy"></i> Dupliquer</button></li>
            <li><button class="dropdown-item text-warning" @click.stop="emit('edit', vinyl)"><i class="bi bi-pencil"></i> Modifier</button></li>
            <li><button class="dropdown-item text-danger" @click.stop="emit('delete', vinyl)"><i class="bi bi-trash"></i> Supprimer</button></li>
          </ul>
        </div>
      </div>
    </div>


    <Transition name="slide">
      <div v-if="isExpanded">
        <VinylRowDetails 
          :description="vinyl.description" 
          :releaseYear="vinyl.releaseYear" 
        />
      </div>
    </Transition>
</template>

<style scoped>
.vinyl-row {
  cursor: pointer;
  transition: background 0.2s;
}

.vinyl-row.expanded {
  background: #f8f9fa;
}

.slide-enter-active, .slide-leave-active {
  transition: max-height 0.3s ease-in-out, opacity 0.2s ease-in-out;
  overflow: hidden;
}

.slide-enter-from, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to, .slide-leave-from {
  max-height: 500px;
  opacity: 1;
}

.vinyl-row.expanded {
  padding-bottom: 20px;
}
</style>
