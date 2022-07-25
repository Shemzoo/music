import { createRouter, createWebHistory } from 'vue-router';
import AppHome from '@/views/AppHome.vue';
import AppAbout from '@/views/AppAbout.vue';
import AppManage from '@/views/AppManage.vue';
import AppSong from '@/views/AppSong.vue';
import store from '@/store';

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
    // beforeEnter: (to, from, next) => {
    //   console.log('Manage Route Guard');
    //   next();
    // },
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

  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
