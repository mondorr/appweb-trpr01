<script setup lang="ts">
const emit = defineEmits(['update-query'])
</script>

<template>
    <div class="input-group">
        <div class="form-outline" data-mdb-input-init>
            <input type="search" class="form-control" placeholder="Recherche"
                @input="(event) => emit('update-query', (event.target as HTMLInputElement).value)" />
        </div>
        <button type="button" class="btn btn-primary" data-mdb-ripple-init>
            <i class="bi bi-search rounded-circle"></i>
        </button>
    </div>
</template>

<style>
.input-group {
    max-width: max-content;
}
</style>