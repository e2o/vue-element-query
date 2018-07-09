import Vue from "vue";
import VueElementQuery from "./../src/index";
import App from "./App.vue";

Vue.use(VueElementQuery);

export default new Vue({
  el: "#app",
  render: h => h(App)
});
