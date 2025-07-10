<template>
  <v-container v-if="book">
    <BackButton btnText="Back to Home" @goBackEmit="goBack" />
    <BookViewer :book="book" />
    <div>
      <v-btn class="mt-4 mr-2" @click="editBook(book.sbn)">
        <v-icon class="mr-2">mdi-pencil</v-icon> Edit
      </v-btn>
      <v-dialog v-model="dialog" max-width="400" persistent>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn class="mt-4 mr-2" v-bind="activatorProps">
            <v-icon class="mr-2">mdi-trash-can</v-icon> Delete
          </v-btn>
        </template>

        <v-card text="Do you really want to delete this book? This action cannot be undone!">
          <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn @click="dialog = false">
              <v-icon class="mr-2">mdi-block-helper</v-icon> Cancel
            </v-btn>

            <v-btn @click="deleteBook(book.sbn)">
              <v-icon class="mr-2">mdi-trash-can</v-icon> Delete
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
    <ErrorDialog :showDialog="showErrorDialog" :closeDialog="showErrorDialog = false" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookStore } from '@/stores/book'
import BackButton from '@/components/BackButton.vue'
import BookViewer from '@/components/BookViewer.vue'
import ErrorDialog from '@/components/ErrorDialog.vue'

const dialog = ref(false)
const showErrorDialog = ref(false)
const store = useBookStore()
const route = useRoute()
const router = useRouter()
const sbn = route.params.sbn as string

const goBack = () => router.push('/')

const editBook = (sbn: string) => router.push(`/book/edit/${sbn}`)

const deleteBook = async (sbn: string) => {
  dialog.value = false

  try {
    await store.deleteBook(sbn)
  } catch (e) {
    console.log(e)

    showErrorDialog.value = true
  }
  router.push('/')
}

onMounted(() => {
  if (sbn) {
    store.getBook(sbn)

    if (!store.selectedBook) {
      store.selectedBook = store.books.filter((book) => book.sbn === sbn)[0]
    }
  }
})

const book = computed(() => store.selectedBook)
</script>
