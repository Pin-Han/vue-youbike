const getters = {

  stateinfo: state => state.map.nowpos,
  choosepos: state => state.map.choose,
  planinfo: state => state.map.planinfo,
  distance: state => state.map.distance,
  time: state => state.map.time,

};
export default getters;

// ,getters:{
//     //傳送登入的狀態
//     check_login(state){
//       return state.user.check;
//     }
//   }
