import { createRouter, createWebHistory } from 'vue-router';
import CosulMeu from './components/CosulMeu.vue';
import HelloWorld from './components/HelloWorld.vue';
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import ConfirmaComanda from './components/ConfirmaComanda.vue'
import OrderHistory from './components/OrderHistory.vue'
import ProductManagement from './components/admin/ProductManagement.vue'; // Import the ProductManagement component
import CategoryManagement from './components/admin/CategoryManagement.vue'; // Import the CategoryManagement component
import UserManagement from './components/admin/UserManagement.vue'; // Import the UserManagement component

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
