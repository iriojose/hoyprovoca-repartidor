import Vue from "vue";
import Router from "vue-router";
import store from '@/store';

//home page
import Home from '@/views/home/Home.vue';
import Dashboard from '@/views/dashboard/Dashboard';

//auth views
import Login from '@/views/auth/Login';
import Forgot from '@/views/auth/Forgot';


Vue.use(Router);

const router = new Router({
    mode: "history",
	base:'/repartidor',
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
			path: "/",
			name: "dashboard",
			component:Dashboard,
			meta:{
                auth:true
            },
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
    let user = store.state.user.loggedIn;

    if(to.meta.auth){
        if(user){
            next();
        }else{
            next({name:'login'});
        }
    }else{
        if(to.name == 'login' && user){
            next({name:'home'});
        }else if(to.name == 'forgot' && user){
            next({name:'forgot'});
        }else{
            next();
        }
    }
});
export default router;
