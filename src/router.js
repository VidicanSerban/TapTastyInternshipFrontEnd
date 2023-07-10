import { createRouter, createWebHistory } from 'vue-router';
import CosulMeu from './components/CosulMeu.vue';
import HelloWorld from './components/HelloWorld.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HelloWorld,
    },
    {
      path: '/cosul-meu',
      component: CosulMeu,
      beforeEnter: (to, from, next) => {
        if (from.path !== '/') {
          next('/');
        } else {
          next();
        }
      },
    },
    // Other routes
  ],
});

export default router;
