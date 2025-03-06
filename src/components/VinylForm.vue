<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Vinyl } from '../scripts/types'
import { v4 as uuid } from 'uuid'

const props = defineProps<{ vinyl: Vinyl | null }>()
const emit = defineEmits(['add-vinyl', 'update-vinyl', 'cancel-edit'])

// Form fields
const artist = ref('')
const album = ref('')
const releaseYear = ref('')
const coverURL = ref('')
const price = ref('')
const stock = ref('')
const description = ref('')

// Watch for selected vinyl (edit mode)
watch(() => props.vinyl, (newVinyl) => {
    if (newVinyl) {
        artist.value = newVinyl.artist
        album.value = newVinyl.album
        releaseYear.value = newVinyl.releaseYear.toString()
        coverURL.value = newVinyl.coverURL
        price.value = newVinyl.price.toString()
        stock.value = newVinyl.stock.toString()
        description.value = newVinyl.description
    } else {
        resetForm()
    }
})

// Reset form for new vinyls
const resetForm = () => {
    artist.value = ''
    album.value = ''
    releaseYear.value = ''
    coverURL.value = ''
    price.value = ''
    stock.value = ''
    description.value = ''

    // Remove Bootstrap validation class
    const form = document.querySelector("form");
    if (form) {
        form.classList.remove("was-validated");
    }
}

const submitForm = (event: Event): void => {

    const form = event.target as HTMLFormElement
    if (!form.checkValidity()) {
        form.classList.add("was-validated")
        return
    }

    const vinylData: Vinyl = {
        id: props.vinyl?.id || uuid(),
        artist: artist.value,
        album: album.value,
        releaseYear: parseInt(releaseYear.value) || 0,
        coverURL: coverURL.value,
        price: parseFloat(price.value) || 0,
        stock: parseInt(stock.value) || 0,
        description: description.value
    }

    if (props.vinyl) {
        emit('update-vinyl', { ...props.vinyl, ...vinylData }) // <-- Conserve l'ID de l'objet original
        console.log('update-vinyl', { ...props.vinyl, ...vinylData })
    } else {
        emit('add-vinyl', vinylData)
        resetForm()
        console.log('add-vinyl', vinylData)
    }
}

const cancelEdit = () => {
    resetForm();
    emit('cancel-edit')
}
</script>

<template>
    <form class="card shadow-lg p-4 needs-validation" novalidate @submit.prevent="submitForm">
        <h4 class="card-title text-center mb-4">
            {{ vinyl ? "Modifier l'album" : "Ajouter un nouvel album" }}
        </h4>

        <div class="mb-3">
            <label for="title" class="form-label">Titre</label>
            <input type="text" class="form-control" id="title" v-model="album" placeholder="Titre de l'album" required>
            <div class="invalid-feedback">Veuillez entrer un titre d'album.</div>
        </div>

        <div class="mb-3">
            <label for="artist" class="form-label">Artiste</label>
            <input type="text" class="form-control" id="artist" v-model="artist" placeholder="Nom de l'artiste"
                required>
            <div class="invalid-feedback">Veuillez entrer un artiste.</div>
        </div>

        <div class="mb-3">
            <label for="year" class="form-label">Année</label>
            <input type="number" class="form-control" id="year" v-model="releaseYear" placeholder="Année de sortie"
                min="0" required>
            <div class="invalid-feedback">Veuillez entrer une année valide.</div>
        </div>

        <div class="mb-3">
            <label for="cover" class="form-label">Image de couverture (URL)</label>
            <input type="text" class="form-control" id="cover" v-model="coverURL"
                placeholder="URL de l'image de couverture" required>
            <div class="invalid-feedback">Veuillez entrer une URL valide.</div>
        </div>

        <div class="mb-3 w-100 p-0 m-0 d-flex flex-row">
            <div class="col-6 pe-2">
                <label for="price" class="form-label">Prix ($)</label>
                <input type="number" class="form-control" id="price" v-model="price" placeholder="Prix" min="0"
                    required>
                <div class="invalid-feedback">Le prix doit être 0 ou plus.</div>
            </div>

            <div class="col-6 ps-2">
                <label for="stock" class="form-label">Stock</label>
                <input type="number" class="form-control" id="stock" v-model="stock" placeholder="Unités restantes  "
                    min="0" required>
                <div class="invalid-feedback">Le stock doit être 0 ou plus.</div>
            </div>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" v-model="description" rows="3"
                placeholder="Brève description de l'album" required></textarea>
            <div class="invalid-feedback">Veuillez entrer une description.</div>
        </div>

        <button type="submit" class="btn btn-primary w-100">
            {{ vinyl ? "Mettre à jour" : "Soumettre" }}
        </button>

        <button v-if="vinyl" type="button" class="btn btn-secondary w-100 mt-2" @click="cancelEdit">
            Annuler
        </button>
    </form>
</template>
