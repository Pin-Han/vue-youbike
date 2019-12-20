<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="map" id="map"></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      center: { lat: 25.0473771, lng: 121.5136014 },
      place: {},
      pos: {}, // 當前位置
      choose: {},
      initmap: '',
      destination: {}, // 選取的目的地,
      isLoading: false,
    };
  },
  methods: {
    mapbuild() {
      this.initmap = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: this.center,
      });
    },
    getStation() {
      const vm = this;
      vm.isLoading = true;
      const url = process.env.VUE_APP_API;
      this.$http.get(url).then((response) => {
        const data = Object.values(response.data.retVal);
        for (let i = 0; i < data.length; i += 1) {
          this.place[i] = {
            position: {
              lat: parseFloat(data[i].lat),
              lng: parseFloat(data[i].lng),
            },
            title: data[i].sna,
          };
          const marker = {};
          marker[i] = new google.maps.Marker({
            position: {
              lat: this.place[i].position.lat,
              lng: this.place[i].position.lng,
            },
            map: this.initmap,
            animation: google.maps.Animation.DROP,
          });
          const stateinfo = {};
          stateinfo[i] = new google.maps.InfoWindow({
            content: this.place[i].title,
          });
          // 點擊標記的地點
          marker[i].addListener('click', function () {
            stateinfo[i].open(this.initmap, marker[i]);
            vm.choose = data[i];
            vm.$store.dispatch('getchoose', vm.choose);
            //  vm.sendchoose();
            vm.planroad(vm.choose);
          });
        }
        vm.isLoading = false;
      });
    },
    // 路線規劃
    planroad(data) {
      const vm = this;
      // 載入路線服務與路線顯示圖層
      const directionsService = new google.maps.DirectionsService();
      const directionsDisplay = new google.maps.DirectionsRenderer();

      // 放置路線圖層
      directionsDisplay.setMap(this.initmap);
      // 路線設定 起點與終點
      const request = {
        origin: { lat: vm.pos.lat, lng: vm.pos.lng },
        destination: { lat: parseFloat(data.lat), lng: parseFloat(data.lng) },
        travelMode: 'WALKING',
      };
      vm.destination = request.destination;

      // 繪製路線
      directionsService.route(request, (result, status) => {
        if (status == 'OK') {
          // 回傳路線上每個步驟的細節
          vm.$store.dispatch('saveplan', result.routes[0].legs[0].steps);
          // directionsDisplay.setDirections(result);
        }
      });
    },

    getlocation() {
      // 得到當前位置，取得經緯度
      // this.mapbuild()
      const vm = this;
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // 初始化地圖
        vm.initmap = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: { lat, lng },
        });
        vm.pos = { lat, lng };
        this.$store.dispatch('savepos', vm.pos);
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: this.initmap,
          animation: google.maps.Animation.BOUNCE,
        });

        marker.setIcon({
          path:
            'M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z',
          scale: 0.1,
          strokeWeight: 0,
          fillColor: '#09c',
          fillOpacity: 1,
        });
        const info = new google.maps.InfoWindow({
          content: '目前所在地',
        });
        // var service = new google.maps.places.PlacesService(this.initmap);
        info.open(this.initmap, marker);
        this.getStation();
        // marker.addListener('click', () => {
        //   console.log('定位', marker);
        // });
      });
    },
  },
  mounted() {
    this.mapbuild();

    this.getlocation();
  },
  computed: {
    // ...mapGetters(['stateinfo']),
  },
};
</script>
