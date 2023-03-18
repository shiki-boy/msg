import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import AppLayout from "@/layouts/AppLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
      ],
    },
    {
      path: "/",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: LoginView,
          meta: { transitionName: "rotate" },
        },
        {
          path: "/signup",
          name: "signup",
          component: SignupView,
          meta: { transitionName: "rotate" },
        },
      ],
    },
  ],
});

export default router;
