import { createRouter, createWebHistory } from 'vue-router'
import BasicFormBuilder from '@/views/BasicFormBuilder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form-builder',
      component: BasicFormBuilder
    }
  ]
})

export default router
