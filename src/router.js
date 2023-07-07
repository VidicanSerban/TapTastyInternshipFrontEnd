import Vue from 'vue';
import Router from 'vue-router';
import CosulMeu from './components/CosulMeu.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/cosul-meu',
      name: 'CosulMeu',
      component: CosulMeu
    }
  ]
});
