<template>
  <div class="home">
    <Map class="home__left"></Map>
    <carinfo  class="home__right"></carinfo>
  </div>
</template>
<script>
import carinfo from '@/components/Carinfo/index.vue';
import Map from '@/components/Map/index.vue';

export default {
  components: { carinfo, Map },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
</style>
