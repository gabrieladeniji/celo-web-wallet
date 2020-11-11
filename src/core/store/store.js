import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import locale from './modules/locale';
import exchange from './modules/exhange';

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      auth,
      locale,
      exchange
   }
});