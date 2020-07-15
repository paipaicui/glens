import Vue from 'vue'
import Vuex from 'vuex'

import home1 from './modules/home1'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home1,
  }
})
