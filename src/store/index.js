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
        loadingApp:false,
        drawer:false,
        pedidosCompletados:[],
        pedidosEntregados:[],
        pedidosEncamino:[],
        pedidos:[],
	},
	mutations: {
        //metodos de los pedidos
        SET_PEDIDOS(state,val){
            for (let i = 0; i < val.length; i++) {
                if(val[i].estatus_id == 4) state.pedidos.push(val[i]);
                if(val[i].estatus_id == 5) status.pedidosEncamino.push(val[i]);
                if(val[i].estatus_id == 6) status.pedidosEntregados.push(val[i]);
            }
        },
        SET_PEDIDOS_COMPLETADOS(state,val){
            state.pedidosCompletados = val;
        },
        SET_CHANGE_PEDIDOS(state,val){
            state.pedidosCompletados.push(val);
        },
        //banderas e informacion
		SET_MODAL_BLOQUEADO(state,val){
            val ? state.bloqueado = true:state.bloqueado = false;
        },
		SET_DATA(state,val){
            state.user.data = val;
        },
        SET_DRAWER(state,val){
            val ? state.drawer = true:state.drawer = false;
        },
        SET_LOADINGAPP(state,val){
            state.loadingApp = val;
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
            localStorage.removeItem("repartidor_token");
            //window.localStorage.clear();//se elimina el cache guardado
            //window.localStorage.removeItem('admin_token');//se elimina el token del storage
        },
	},
	actions: {
        setPedidos({commit},val){
            commit("SET_PEDIDOS",val);
        },
        setPedidosCompletados({commit},val){
            commit("SET_PEDIDOS_COMPLETADOS",val);
        },
        setChangePedidos({commit},val){
            commit("SET_CHANGE_PEDIDOS");
        },
		logged({commit},val){
            commit('SET_LOGGED',val);
        },
        logout({commit}){
            commit('LOGOUT');
        },
        setLoading({commit},val){
            commit("SET_LOADINGAPP",val);
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
        setDrawer({commit},val){
            commit("SET_DRAWER",val);
        }
	}
});
