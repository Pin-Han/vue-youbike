import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import map from './modules/map';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // 引入 user
    map,
  },
  getters,
});

export default store;
// store -> index.js為彙整所有vuex行為的地方
// export default store ，要再去main.js import
