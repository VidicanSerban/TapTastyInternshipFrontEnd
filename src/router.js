import { createRouter, createWebHistory } from 'vue-router';
import CosulMeu from './components/CosulMeu.vue';
import HelloWorld from './components/HelloWorld.vue';
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import ConfirmaComanda from './components/ConfirmaComanda.vue'
import OrderHistory from './components/OrderHistory.vue'

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
      
    },
    {
      path: '/signup',
      component: SignUp,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/confirma',
      component: ConfirmaComanda,
    },
    {
      path: '/istoric',
      name: 'OrderHistory',
      component: OrderHistory,
    },
    //Other routes
  ],
});

export default router;
