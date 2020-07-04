import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user:{
			token:null,
			data:{},
			loggedIn:false
		},
		bloqueado:false,
	},
	mutations: {
		SET_MODAL_BLOQUEADO(state,val){
            val ? state.bloqueado = true:state.bloqueado = false;
        },
		SET_DATA(state,val){
            state.user.data = val;
        },
        SET_FOTO_PROFILE(state,val){
            state.user.data.imagen = val;
        },
		//autenticacion
        SET_LOGGED(state,val){//logea al usuario
            window.localStorage.clear();//se elimina el cache guardado
            let data = {};
            data.loggedIn = true;
            data.token = val.token;
            data.data = val.data;
            state.user = data;
            window.localStorage.setItem('repartidor_token',val.token);
        },
        LOGOUT(state){//cierra la sesion
            state.user.token=null;
            state.user.data={};
            state.user.loggedIn=false;
            window.localStorage.clear();//se elimina el cache guardado
            //window.localStorage.removeItem('admin_token');//se elimina el token del storage
        },
	},
	actions: {
		logged({commit},val){
            commit('SET_LOGGED',val);
        },
        logout({commit}){
            commit('LOGOUT');
        },
        setData({commit},val){
            commit('SET_DATA',val);
		},
		setModalBloqueado({commit},val){
            commit('SET_MODAL_BLOQUEADO',val);
        },
		setFotoProfile({commit},val){
            commit('SET_FOTO_PROFILE',val);
        },
	},
	modules: {
	}
});
