<template>
  <div>
    <Navigation/>
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
    <Footer/>
  </div>
</template>
<script>
import Navigation from '@/components/Navigation/index.vue';
import Footer from '@/components/Footer/index.vue';

export default {
  components: { Navigation, Footer },
  data() {
    return {};
  },
};
</script>
