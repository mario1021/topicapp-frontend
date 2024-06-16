import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import TopicsListView from '@/views/TopicsListView.vue'
import ArticlesView from '@/views/ArticlesView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'topics',
      component: TopicsListView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated && to.name !== 'login' && to.name !== 'signup') {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
