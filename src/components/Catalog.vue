<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Vinyl } from '../scripts/types'
import VinylRow from './VinylRow.vue'
import SearchBar from './SearchBar.vue'
import ExportCSV from './ExportCSV.vue'

const props = defineProps<{ vinyls: Vinyl[] }>()
const emit = defineEmits(['edit-vinyl', 'delete-vinyl', 'duplicate-vinyl'])

const isCatalogEmpty = computed(() => props.vinyls.length === 0)

const searchQuery = ref('')

// Filter vinyls based on search query
const filteredVinyls = computed(() => {
    if (!searchQuery.value) return props.vinyls
    const lowerQuery = searchQuery.value.toLowerCase()
    return props.vinyls.filter(vinyl =>
        vinyl.album.toLowerCase().startsWith(lowerQuery)
    )
})
</script>

<template>
    <div class="card shadow-lg p-4 me-3">
        <div class="d-flex flex-direction-row justify-content-between align-items-center mb-4">
            <div class="d-flex flex-direction-row align-items-end">
                <h1 class="text-primary me-3 mb-0">Liste</h1>
                <ExportCSV :vinyls="props.vinyls" />
            </div>
            <SearchBar @update-query="newQuery => searchQuery = newQuery" />
        </div>

        <p v-if="isCatalogEmpty" class="text-center text-muted">La liste est vide.</p>

        <div v-else>
            <div class="row fw-bold text-uppercase pb-2">
                <div class="col-1 ps-1"></div>
                <div class="col-3 ps-3">Album</div>
                <div class="col-3">Artiste</div>
                <div class="col-2">Prix</div>
                <div class="col-2">Stock</div>
                <div class="col-1"></div>
            </div>

            <div class="list-group">
                <VinylRow 
                    v-for="vinyl in filteredVinyls" 
                    :vinyl="vinyl" 
                    :key="vinyl.id"
                    @edit="emit('edit-vinyl', vinyl)" @delete="emit('delete-vinyl', vinyl)"
                    @duplicate="emit('duplicate-vinyl', vinyl)" />
            </div>
        </div>
    </div>
</template>