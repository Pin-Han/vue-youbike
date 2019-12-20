import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

const map = {
  state: {
    choose: {},
    allstation: {},
    nowpos: {},
    planinfo: {},
    distance: 0,
    time: 0,
  },
  mutations: {
    setchoose(state, payload) {
      const year = payload.mday.substring(0, 4);
      const month = payload.mday.substring(4, 6);
      const date = payload.mday.substring(6, 8);
      const hour = payload.mday.substring(8, 10);
      const minute = payload.mday.substring(10, 12);
      const seconds = payload.mday.substring(12, 14);
      payload.mday = year.concat('/', month, '/', date, ' ', hour, ':', minute, ':', seconds);
      state.choose = payload;
    },
    savePosition(state, payload) {
      state.nowpos = payload;
    },
    savePlan(state, payload) {
      state.planinfo = payload;
    },
    planDistanse(state, payload) {
      // 計算距離
      for (let a = 0; a < payload.length; a += 1) {
        state.distance = payload[a].distance.value + state.distance;
      }
    },
    planTime(state, payload) {
      for (let a = 0; a < payload.length; a += 1) {
        state.time = payload[a].duration.value + state.time;
      }

      state.time = Math.round(state.time / 60);
    },
  },
  actions: {
    // 接取選擇到的地點
    getchoose({
      commit,
    }, data) {
      commit('setchoose', data);
    },
    // 把規劃路線資訊存起來
    saveplan({
      commit,
    }, data) {
      commit('savePlan', data);
      commit('planDistanse', data);
      commit('planTime', data);
    },
    // 把位置存起來
    savepos({
      commit,
    }, data) {
      commit('savePosition', data);
    },
  },
};
export default map;
