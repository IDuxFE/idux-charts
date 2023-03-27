import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/bar',
      name: 'bar',
      component: () => import('../views/DemoBar.vue'),
    },
    {
      path: '/pie',
      name: 'pie',
      component: () => import('../views/DemoPie.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/bar',
    },
  ],
})

export default router
