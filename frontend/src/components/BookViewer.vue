<template>
    <v-card :prepend-avatar="BookIcon" :title="book.name">
        <v-card-subtitle>By {{ book.author }}</v-card-subtitle>
        <v-card-text>
            <p><strong>SBN:</strong> {{ book.sbn }}</p>
            <p><strong>Description:</strong> {{ book.description }}</p>
            <p><strong>Stock:</strong> {{ book.stock }}</p>
        </v-card-text>
        <template v-slot:append v-if="!hideFavorite">
            <v-btn icon @click="toggleFavorite" :color="isFavorite ? 'yellow darken-2' : 'white'">
                <v-icon>{{ isFavorite ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
            </v-btn>
        </template>
    </v-card>
</template>

<script setup lang="ts">
import BookIcon from '@/assets/book.png'
import { ref, onMounted } from 'vue';

const props = defineProps(['book', 'hideFavorite'])

const isFavorite = ref(false)

onMounted(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    isFavorite.value = favorites.includes(props.book.sbn) as boolean;
})

const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite.value) {
        const updated = favorites.filter((fsbn: string) => fsbn !== props.book.sbn);
        localStorage.setItem('favorites', JSON.stringify(updated));
        isFavorite.value = false;
    } else {
        favorites.push(props.book.sbn);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        isFavorite.value = true;
    }
}
</script>