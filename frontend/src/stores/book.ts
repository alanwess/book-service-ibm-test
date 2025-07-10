import { defineStore } from 'pinia'
import axios from 'axios'
import type { Book } from '@/interfaces/Book'

const api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL })

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [] as Book[],
    selectedBook: null as Book | null,
    loadingInfo: false as Boolean,
    limitResults: 12 as number,
    totalPages: 1 as number,
    currentPage: 1 as number
  }),
  actions: {
    async listBooks(page: number | undefined){
      this.loadingInfo = true 

      try {
        const endpoint = page ? `/books?page=${page}&limit=${this.limitResults}` : '/books'
        const res = await api.get(endpoint)
      
        this.books = res.data.items
        this.totalPages = res.data.totalPages
        this.currentPage = res.data.currentPage
      } catch (e) {
        throw e
      }

      this.loadingInfo = false
    },
    async fetchBooks(query = '') {
      this.loadingInfo = true 

      try {
        const res = await api.get(`/books/search?q=${query}`)
      
        this.books = res.data
      } catch (e) {
        throw e
      }

      this.loadingInfo = false 
    },
    async getBook(sbn: string) {
      try {
        const res = await api.get(`/books/${sbn}`)

        this.selectedBook = res.data
      } catch (e) {
        throw e
      }
    },
    async addBook(book: Book) {
      try {
        console.log(book)

        await api.post('/books', book)

        await this.listBooks(1)
      } catch (e) {
        throw e
      }
    },
    async updateBook(sbn: string, book: Book) {
      try {
        await api.put(`/books/${sbn}`, book)

        console.log(book)

        await this.listBooks(1)
      } catch (e) {
        throw e
      }
    },
    async deleteBook(sbn: string) {
      try {
        await api.delete(`/books/${sbn}`)

        await this.listBooks(1)
      } catch (e) {
        throw e
      }
    },
  },
})
