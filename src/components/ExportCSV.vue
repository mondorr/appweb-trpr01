<script setup lang="ts">
import type { Vinyl } from '../scripts/types'

const props = defineProps<{ vinyls: Vinyl[] }>()

const exportCSV = () => {
    if (!props.vinyls.length) return

    const separator = ";"

    const headers = ["ID", "Artiste", "Album", "Prix", "Stock"]

    // Convert vinyls data into CSV format
    // Found with ChatGPT
    const csvRows = props.vinyls.map(vinyl => [
        vinyl.id,
        vinyl.artist,
        vinyl.album,
        vinyl.price,
        vinyl.stock
    ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(separator))

    // Merge headers and rows
    const csvContent = [headers.join(separator), ...csvRows].join("\r\n")

    // Create a Blob and generate a downloadable URL
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and trigger download
    const a = document.createElement('a')
    a.href = url
    a.download = "vinyls_export.csv"
    a.click()

    // Cleanup
    URL.revokeObjectURL(url)
}
</script>

<template>
    <button class="btn btn-primary mb-1" @click="exportCSV">
        <i class="bi bi-file-earmark-arrow-down"></i> CSV
    </button>
</template>
