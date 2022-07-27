<template>
  <div>
  <!-- Header -->
  <app-header />

  <router-view></router-view>

  <!-- Player -->
  <app-player />

  <app-auth />
  </div>
</template>

<script>
import AppPlayer from '@/components/AppPlayer.vue';
import AppHeader from './components/AppHeader.vue';
import AppAuth from './components/AppAuth.vue';

export default {
  name: 'App',
  components: { AppHeader, AppAuth, AppPlayer },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>
