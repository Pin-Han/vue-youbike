<template>
  <div class="section-carinfo">
    <!-- <div class="carinfo"> -->
      <!-- <div class="carinfo__search">
        <input type="text" name id class="carinfo__search-input" placeholder="輸入想要找尋的地方...." />
        <i class="fas fa-search carinfo__search-search"></i>
      </div> -->
<!-- 尚未完成 -->
      <!-- <i class="fas fa-map-marked-alt carinfo__map"></i> -->
    <!-- </div> -->
    <div class="statinfo" v-if="choosepos.sna !=undefined">
      <div class="statinfo__name">{{choosepos.sna}}</div>

      <div class="statinfo__num">
        <div class="statinfo__num-bike">
          <i class="fas fa-bicycle statinfo__num-icon"></i>
          <p>可借 : {{choosepos.sbi}}</p>
        </div>
        <div class="statinfo__num-park">
          <i class="fas fa-parking statinfo__num-icon"></i>
          <p>可還 : {{choosepos.bemp}}</p>
        </div>
      </div>
      <div class="statinfo__script">
        <p>{{choosepos.ar}}</p>
      </div>
      <div class="statinfo__distance">
        <i class="fas fa-walking statinfo__distance-icon"></i>
        <p>{{distance}} 公尺</p>
        <i class="far fa-clock statinfo__distance-icon"></i>
        <p>{{time}} 分</p>
      </div>
      <!-- <div class="statinfo__road" @click.prevent="goplan(choosepos)">
          <i class="fas fa-arrow-circle-right "></i>
          <p>{{theroad}}</p>
      </div> -->
      <div class="statinfo__time">
        <p>更新時間{{choosepos.mday}}</p>

      </div>
    </div>
    <div class="direct" v-for="(plan,index) in planinfo" :key="index">
      <p class="direct__num">{{index +1}}.</p>
      <p class="direct__script" v-html="plan.instructions"></p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { mapGetters } from 'vuex';
// import index from '../Map/index';

export default {
  data() {
    return {
      newValue: '',
      theroad: '展開路線',
    };
  },
  methods: {
    // goplan(data) {
    //   $('.direct').toggleClass('hide');
    // },
  },

  computed: {
    ...mapGetters(['choosepos', 'stateinfo', 'planinfo', 'distance', 'time']),
  },
  mounted() {
    $('.statinfo__road').click(() => {});
  },
};
</script>
<style lang="scss" scoped>

</style>x
