import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const AppHome = () => import('@/views/AppHome.vue');
const AppManage = () => import(/* webpackChunkName: "groupedChunk" */'@/views/AppManage.vue');
const AppAbout = () => import('@/views/AppAbout.vue');
const AppSong = () => import(/* webpackChunkName: "groupedChunk" */'@/views/AppSong.vue');

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
    meta: {
      requiresAuth: true,
    },
    alias: '/manage',
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: AppSong,
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

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.auth.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
