import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/index.vue';
import Layout from '@/views/Layout/index.vue';

Vue.use(Router);

export default new Router({
  routes: [

    {
      path: '/',
      component: Layout,
      // 使所有頁面上下不變，只改動中間畫面(children)
      children: [{
        path: '/',
        component: Home,
        name: 'Home',

      }],
    },
  ],
});
