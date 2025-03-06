<script setup lang="ts">
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"

import { ref, computed } from 'vue'
import type { Vinyl } from './scripts/types'
import { initialVinyls } from './scripts/vinyls'

import Header from "./components/Header.vue";
import Catalog from "./components/Catalog.vue";
import VinylForm from "./components/VinylForm.vue";
import ConfirmModal from "./components/ConfirmModal.vue";

import { v4 as uuid } from 'uuid'

// Vinyl list
const listOfVinyls = ref<Vinyl[]>(initialVinyls)

// Selected vinyl (for editing)
const selectedVinyl = ref<Vinyl | null>(null)

// Delete confirmation modal visibility
const showDeleteModal = ref(false)
const vinylToDelete = ref<Vinyl | null>(null)
const deleteModalMessage = computed(()=> {
  return `Êtes-vous sûr de vouloir supprimer ${vinylToDelete?.value?.album} de ${vinylToDelete?.value?.artist}?`
})


// Add new vinyl
const addVinyl = (vinyl: Vinyl) => {
  listOfVinyls.value.push({ ...vinyl, id: Date.now().toString() }) // Ensure unique ID
}

// Edit existing vinyl
const editVinyl = (updatedVinyl: Vinyl) => {
  const index = listOfVinyls.value.findIndex(v => v.id === updatedVinyl.id)
  if (index !== -1) {
    listOfVinyls.value[index] = updatedVinyl
  }
  selectedVinyl.value = null; // Close form after update
}

// Select a vinyl for editing
const selectVinylForEdit = (vinyl: Vinyl) => {
  selectedVinyl.value = { ...vinyl } // Clone to avoid modifying directly
}

// Clear the selected vinyl (reset form)
const clearSelection = () => {
  selectedVinyl.value = null
}

// Show the delete confirmation modal
const confirmDeleteVinyl = (vinyl: Vinyl) => {
  vinylToDelete.value = vinyl
  showDeleteModal.value = true
  console.log(vinylToDelete.value)
}

// Cancel deletion
const cancelDelete = () => {
  showDeleteModal.value = false
  vinylToDelete.value = null
}

// Delete vinyl
const deleteVinyl = () => {
  if (vinylToDelete.value) {
    const index = listOfVinyls.value.findIndex(v => v.id === vinylToDelete.value?.id)
    if (index !== -1) {
      // If the selected vinyl is deleted, clear the selection
      if(vinylToDelete.value.id === selectedVinyl.value?.id) {
        selectedVinyl.value = null
      }

      listOfVinyls.value.splice(index, 1)
    }
  }
  cancelDelete() // Close the modal after deletion
}

// Duplicate a vinyl
const duplicateVinyl = (vinyl: Vinyl) => {
  addVinyl({ ...vinyl, id: uuid() })
}

// Compute alert message for out-of-stock vinyls
const outOfStockVinyls = computed(() => {
  return listOfVinyls.value.filter(vinyl => vinyl.stock === 0)
})
</script>

<template>
  <div class="container p-0">
    <Header />
      <div v-if="outOfStockVinyls.length" class="alert alert-warning d-flex align-items-start mt-3 align-items-center" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-3 warning-icon"></i>

        <div>
          <strong>Attention!</strong> Les produits suivants sont en rupture de stock :
          <ul class="mb-0">
            <li v-for="vinyl in outOfStockVinyls" :key="vinyl.id">
              <strong>{{ vinyl.artist }}</strong> - {{ vinyl.album }}
            </li>
          </ul>
        </div>
      </div>

    <div class="row m-0 pb-5">
      <div class="col-8 p-0">
        <Catalog 
          :vinyls="listOfVinyls" 
          @edit-vinyl="selectVinylForEdit" 
          @delete-vinyl="confirmDeleteVinyl" 
          @duplicate-vinyl="duplicateVinyl"
        />
      </div>
      <div class="col-4 p-0">
        <VinylForm 
          :vinyl="selectedVinyl"
          @add-vinyl="addVinyl" 
          @update-vinyl="editVinyl"
          @cancel-edit="clearSelection"
        />
      </div>
    </div>


    <ConfirmModal 
      :showModal="showDeleteModal"
      modalTitle="Confirmer la suppression"
      :modalMessage = "deleteModalMessage"
      @confirm-delete="deleteVinyl"
      @cancel-delete="cancelDelete" 
    />
  </div>
</template>

<style>
.warning-icon {
  font-size: 2rem;
}
</style>