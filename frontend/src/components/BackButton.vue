<template>
    <v-btn class="mb-4" @click="$emit('goBackEmit')">
        <v-icon class="mr-2">mdi-chevron-left</v-icon> {{ btnText }}
    </v-btn>
</template>

<script setup lang="ts">
const props = defineProps(['btnText'])
</script>