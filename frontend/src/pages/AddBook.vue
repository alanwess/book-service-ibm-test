<template>
    <v-container>
        <BackButton btnText="Back to Home" @goBackEmit="goBack" />
        <div class="p-4">
            <h2 class="mb-2">Create Book</h2>
            <v-form v-if="form" @submit.prevent="submit">
                <v-text-field v-model="form.sbn" placeholder="SBN"></v-text-field>
                <v-text-field v-model="form.name" placeholder="Name"></v-text-field>
                <v-text-field v-model="form.author" placeholder="Author"></v-text-field>
                <v-text-field v-model="form.description" placeholder="Description"></v-text-field>
                <v-text-field v-model.number="form.stock" type="number" placeholder="Stock"></v-text-field>
                <div class="mt-4 mb-4">
                    <h2>Preview of the book to be created:</h2>
                    <BookViewer :book="form" :hideFavorite="true" />
                </div>
                <v-btn label="Create" type="submit" :disabled="hasEmptyFields">
                    <v-icon class="mr-2">mdi-content-save</v-icon> Create Book
                </v-btn>
            </v-form>
        </div>
        <ErrorDialog :showDialog="showErrorDialog" :closeDialog="showErrorDialog = false" />
    </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { useBookStore } from '@/stores/book'
import { useRouter } from 'vue-router';
import type { Book } from '@/interfaces/Book';
import BackButton from '@/components/BackButton.vue'
import BookViewer from '@/components/BookViewer.vue';

const form = reactive<Book>({ name: '', author: '', description: '', sbn: '', stock: 0 });
const store = useBookStore();
const router = useRouter();
const showErrorDialog = ref(false)

const submit = async () => {
    console.log(form)
    try {
        await store.addBook(form);
    } catch (e) {
        console.log(e)

        showErrorDialog.value = true
    }

    router.push('/');
};

const goBack = () => router.push('/')

const hasEmptyFields = computed(() => {
    return (
        !form.sbn.trim() ||
        !form.name.trim() ||
        !form.description.trim() ||
        !form.author.trim() ||
        form.stock <= 0
    );
});
</script>