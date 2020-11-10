import Vue from 'vue';
import Router from 'vue-router';

// components
import Index from './view/pages/Wallet.vue';
import GoldToken from './view/pages/GoldToken';
import StableToken from './view/pages/StableToken';

// store
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
      path: '/', component:() => import('./view/layout/Layout'), children: [
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
      ]
   }
];

export default new Router({
   routes,
   mode: 'history',
   base: process.env.BASE_URL,
});
