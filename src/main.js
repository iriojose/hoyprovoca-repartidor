import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import "@mdi/font/css/materialdesignicons.css";
import head from "./plugins/head";
import toasted from "./plugins/toasted";

Vue.config.productionTip = true;

new Vue({
	store,
	router,
	vuetify,
	toasted,
	head,
	render: h => h(App)
}).$mount("#app");
  
	