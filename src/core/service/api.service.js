import Vue from 'vue';
import axios from "axios";
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

const ApiService = {

   setBaseUrl(baseUrl) {
      Vue.axios.defaults.baseURL = baseUrl;
   },

   getApi(resources, params = '') {
      return new Promise((resolve, reject) => {
         Vue.axios.get(resources, {params}).then((res) => {
            resolve(res.data);
         }).catch((error) => {
            reject(error);
         });
      });
   }

};

export default ApiService;