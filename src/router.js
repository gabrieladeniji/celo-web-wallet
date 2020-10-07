import Vue from 'vue';
import Router from 'vue-router';
import Index from './view/pages/index.vue';
import GoldToken from './view/pages/GoldToken';
import StableToken from './view/pages/StableToken';
// import Wallets from './view/pages/wallets.vue';

import store from './core/store/store';


Vue.use(Router);

function requireAuth(to, from, next) {
   if(!store.getters.wallet) {
      next({ name: 'index' });
   } else {
      next();
   }
}

const routes = [
   {
      path: '/',
      name: 'index',
      component: Index
   },
   {
      path: '/gold-token',
      name: 'goldToken',
      component: GoldToken,
      beforeEnter: requireAuth
   },
   {
      path: '/stable-token',
      name: 'stableToken',
      component: StableToken,
      beforeEnter: requireAuth
   }
];

export default new Router({
   routes,
   mode: 'history',
   base: process.env.BASE_URL,
});
