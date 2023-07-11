import { createRouter, createWebHistory } from 'vue-router';
import CosulMeu from './components/CosulMeu.vue';
import HelloWorld from './components/HelloWorld.vue';
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'

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
    {
      path: '/signup',
      component: SignUp,
    },
    {
      path: '/login',
      component: Login,
    },
    //Other routes
  ],
});

export default router;
