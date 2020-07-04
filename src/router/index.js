import Vue from "vue";
import Router from "vue-router";
import store from '@/store';

import Home from '@/views/home/Home.vue'

Vue.use(Router);

const router = new Router({
    mode: "history",
	base:'/repartidor',
	routes:[
		{
			path: "/",
			name: "dashboard",
			component: Home,
			meta:{
                auth:true
            },
		},
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
