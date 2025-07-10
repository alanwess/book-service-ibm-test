<template>
  <v-container>
    <v-text-field v-model="query" prepend-icon="mdi-magnify" label="Search Book"
      @input="(event: any) => searchInput(event.target.value)" />
    <v-row>
      <v-card class="ml-3 mt-5">
        <v-btn @click="addBook">
          <v-icon class="mr-2">mdi-plus</v-icon> Create Book
        </v-btn>
      </v-card>
    </v-row>
    <v-row v-if="books.length > 0">
      <v-col v-for="(book, idx) in books" :key="idx" cols="12" md="4">
        <v-card @click="goToDetail(book.sbn, book)" class="cursor-pointer" outlined :prepend-avatar="BookIcon"
          :title="book.name" :subtitle="book.sbn">
          <v-card-subtitle>By {{ book.author }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else class="d-flex justify-md-center align-items-center h-100">
      <div v-if="isLoadingInfo">
        Searching in the API...
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </div>
      <div v-else>
        No book found.
      </div>
    </v-row>
    <div v-if="query === ''" class="w-full d-flex justify-center">
      <v-btn v-if="currentPage > 1 && currentPage <= totalPages" class="mt-4 mr-2"
        @click="getPreviousPage(currentPage)">
        <v-icon class="mr-2">mdi-chevron-left</v-icon>
        Page {{ currentPage - 1 }}
      </v-btn>
      <v-btn class="mt-4 mr-2" disabled v-else>
        Previous Page
      </v-btn>
      <v-btn v-if="currentPage < totalPages" class="mt-4" @click="getNextPage(currentPage)">
        Page {{ currentPage + 1 }}
        <v-icon class="ml-2">mdi-chevron-right</v-icon>
      </v-btn>
      <v-btn class="mt-4 mr-2" disabled v-else>
        Next Page
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useBookStore } from '@/stores/book'
import { useRouter, useRoute } from 'vue-router'
import type { Book } from '@/interfaces/Book'
import BookIcon from '@/assets/book.png'

const store = useBookStore()
const router = useRouter()
const route = useRoute()

const searchInput = ((input_text: string) => {
  if (query.value === '') isSearching.value = false
  else isSearching.value = true

  store.fetchBooks(input_text)
})

const goToDetail = ((sbn: string, book: Book) => {
  store.selectedBook = book

  router.push(`/book/${sbn}`)
})

const isSearching = ref(false)
const query = ref('')
const totalPages = computed(() => store.totalPages)
const currentPage = computed(() => store.currentPage)
const books = computed(() => store.books)
const isLoadingInfo = computed(() => store.loadingInfo)

const addBook = () => router.push('/book/add')

onMounted((page: number) => store.listBooks(1))

const getPreviousPage = (page: number) => store.listBooks(page - 1)
const getNextPage = (page: number) => store.listBooks(page + 1)
</script>
