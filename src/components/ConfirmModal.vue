<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps({
    showModal: Boolean,
    modalTitle: String,
    modalMessage: String
})

const emit = defineEmits(['confirm-delete', 'cancel-delete'])

let modal: Modal | null = null

watch(() => props.showModal, (newVal) => {
    if (newVal && modal) {
        modal.show()
    } else if (modal) {
        modal.hide()
    }
})

// Initialize Bootstrap modal (source: https://dev.to/patrickodacre/how-to-use-bootstrap-modals-with-vue-js-4fon)
onMounted(() => {
    const modalElement = document.getElementById('confirmModal')
    if (modalElement) {
        modal = new Modal(modalElement)
    }
})
</script>

<template>
    <div class="modal fade" id="confirmModal" tabindex="-1" v-show="props.showModal"
        @click.self="emit('cancel-delete')">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ props.modalTitle }}</h5>
                    <button type="button" class="btn-close" @click="emit('cancel-delete')" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>{{ props.modalMessage }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="emit('cancel-delete')">Cancel</button>
                    <button type="button" class="btn btn-danger" @click="emit('confirm-delete')">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
