import Vue from "vue";
import Router from "vue-router";

//home page
import Home from '@/views/home/Home.vue';
import Dashboard from '@/views/dashboard/Dashboard';

//auth views
import Login from '@/views/auth/Login';
import Forgot from '@/views/auth/Forgot';

//dashboard view
import EnCamino from '@/views/pedidos/EnCamino';
import Completados from '@/views/pedidos/Completados';
import Entregados from '@/views/pedidos/Entregados';
import Chat from '@/views/chat/Chat';

//view profile
import Account from '@/views/account/Account';
import Profile from '@/views/account/Profile';

Vue.use(Router);

const router = new Router({
    mode: "history",
	base:'/repartidores',
	routes:[
		{
			path: "/",
			name: "home",
			component: Home,
			meta:{
                auth:false
            },
        },
        {
			path: "/dashboard",
			name: "dashboard",
			component:Dashboard,
			meta:{
                auth:true
            },
            children:[
                {
                    path: "vias",
                    name: "En camino",
                    component:EnCamino,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "chats",
                    name: "Chat",
                    component:Chat,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "completados",
                    name: "Completados",
                    component:Completados,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: "entregados",
                    name: "Entregados",
                    component:Entregados,
                    meta: {
                        auth: true
                    }
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta:{
                auth:false
            }
        },
        {
			path: "/forgot",
			name: "forgot",
			component:Forgot,
			meta:{
                auth:false
            }
        },
        {
            path: "/account",
			name: "account",
			component:Account,
			meta:{
                auth:true
            },
            children:[
                {
                    path: "profile",
                    name: "perfil",
                    component:Profile,
                    meta:{
                        auth:true
                    },
                }
            ]
        }
    ],
    
	linkActiveClass: 'router-link-active', 
    linkExactActiveClass: 'router-link-exact-active', 
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    parseQuery: q => q,
    fallback: true,
});

router.beforeEach((to,from,next) => {
    let user = window.localStorage.getItem('repartidor_token'); //store.state.user.loggedIn;

    if(to.meta.auth){
        if(user){
            next();
        }else{
            next({name:'home'});
        }
    }else{
        if(to.name == 'login' && user){
            next({name:'dashboard'});
        }else if(to.name == 'forgot' && user){
            next({name:'dashboard'});
        }else{
            next();
        }
    }
});

export default router;
