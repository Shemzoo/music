import { createRouter, createWebHistory } from 'vue-router';
import AppHome from '@/views/AppHome.vue';
import AppAbout from '@/views/AppAbout.vue';
import AppManage from '@/views/AppManage.vue';

const routes = [
  {
    path: '/',
    component: AppHome,
    name: 'home',
  },
  {
    path: '/about',
    component: AppAbout,
    name: 'about',
  },
  {
    path: '/manage-music',
    component: AppManage,
    name: 'manage',
    // alias: '/manage',
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

export default router;
