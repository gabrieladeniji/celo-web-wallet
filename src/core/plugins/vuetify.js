import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#009688',
    info: '#2196f3',
    Network_color_active: '#4caf50',
    Network_color_inactive: '#ff5252',
  }
});
