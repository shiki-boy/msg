import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginView
        },
        {
          path: '/signup',
          name: 'signup',
          component: SignupView
        },
      ]
    }
  ]
})

export default router
