<template>
    <v-container>
        <BackButton btnText="Back to Book" @goBackEmit="goBack" />
        <div class="p-4">
            <h2>Edit book</h2>
            <v-form v-if="form">
                <v-text-field v-model="form.sbn" placeholder="SBN" disabled></v-text-field>
                <v-text-field v-model="form.name" placeholder="Name"></v-text-field>
                <v-text-field v-model="form.author" placeholder="Author"></v-text-field>
                <v-text-field v-model="form.description" placeholder="Description"></v-text-field>
                <v-text-field v-model.number="form.stock" type="number" placeholder="Estoque"></v-text-field>
                <div class="mt-4 mb-4">
                    <h2>Preview of the edited book:</h2>
                    <BookViewer :book="form" :hideFavorite="true" />
                </div>
                <v-dialog v-model="dialog" max-width="400" persistent>
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps" :disabled="hasEmptyFields">
                            <v-icon class="mr-2">mdi-content-save</v-icon> Save changes
                        </v-btn>
                    </template>

                    <v-card text="Want to confirm the changes in this book? This action cannot be undone!">
                        <template v-slot:actions>
                            <v-spacer></v-spacer>

                            <v-btn @click="dialog = false">
                                <v-icon class="mr-2">mdi-block-helper</v-icon> Cancel
                            </v-btn>

                            <v-btn label="Atualizar" type="submit" text="Editar Livro" @click="submit">
                                <v-icon class="mr-2">mdi-content-save</v-icon> Save
                            </v-btn>
                        </template>
                    </v-card>
                </v-dialog>
            </v-form>
        </div>
        <ErrorDialog :showDialog="showErrorDialog" :closeDialog="showErrorDialog = false" />
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookStore } from '@/stores/book'
import type { Book } from '@/interfaces/Book';
import BackButton from '@/components/BackButton.vue'
import BookViewer from '@/components/BookViewer.vue';
import ErrorDialog from '@/components/ErrorDialog.vue';

const store = useBookStore();
const route = useRoute();
const router = useRouter();
const sbn: string = route.params.sbn as string;
const form = reactive<Book>(store.selectedBook as Book);
const dialog = ref(false);
const showErrorDialog = ref(false)

onMounted(async () => {
    await store.getBook(sbn);
});

const submit = async () => {
    dialog.value = false

    let updateObject: Object = {}

    // ts-ignore: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Book'.
    for (const key in form) {
        if (form[key] !== store.selectedBook[key]) {
            updateObject[key] = form[key]
        }
    }

    try {
        await store.updateBook(sbn, updateObject);
    } catch (e) {
        console.log(e)

        showErrorDialog.value = true
    }

    router.push(`/`);
};

const goBack = () => router.push(`/book/${sbn}`);

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