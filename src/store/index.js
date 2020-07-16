import Vue from 'vue'
import Vuex from 'vuex'

import home1 from './modules/home1'
import home2 from './modules/home2'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home1,
    home2,
  }
})
