import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import BookDetail from '../pages/BookDetail.vue'
import AddBook from '@/pages/AddBook.vue';
import EditBook from '@/pages/EditBook.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/book/:sbn', component: BookDetail, props: true },
  { path: '/book/add', component: AddBook },
  { path: '/book/edit/:sbn', component: EditBook },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router