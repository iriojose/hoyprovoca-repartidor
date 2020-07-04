import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Auth from '@/services/Auth';
import "@mdi/font/css/materialdesignicons.css";
import head from "./plugins/head";

Vue.config.productionTip = false
let token = null;
token = window.localStorage.getItem('repartidor_token');

if(token){
	Auth().post("/sesion",{token:token}).then((response) => {
		if(response.data.response.data.bloqueado == 1){
			store.state.bloqueado = true;
		}else{
			store.state.user.data = response.data.response.data;
			store.state.user.loggedIn = true;
			store.state.user.token = token;
		}
  
		new Vue({
			store,
			router,
			vuetify,
			toasted,
			head,
			render: h => h(App)
		}).$mount("#app");
  
	}).catch(() => {
		new Vue({
			store,
			router,
			vuetify,
			toasted,
			head,
			render: h => h(App)
		}).$mount("#app");
	});
}else{
	new Vue({
		store,
		router,
		vuetify,
		toasted,
		head,
		render: h => h(App)
	}).$mount("#app");
}