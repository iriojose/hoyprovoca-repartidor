<template>
	<v-app style="background-color:#fff;">
		<transition name="fade">
            <router-view/>
        </transition>  
	</v-app>
</template>

<script>
import router from '@/router';
import Auth from '@/services/Auth';
import {mapActions} from 'vuex';

    export default {
        name: 'App',
        created() {
            let token = window.localStorage.getItem('repartidor_token');

            if(token != null && token != "" && token != undefined) {
                this.sesion(token);
                router.push("/dashboard");
            }
        },
        methods:{
            ...mapActions(['logged','setModalBloqueado']),
    
            sesion(token){//valida el token
                Auth().post("/sesion",{token:token}).then((response) => {
                    if(response.data.response.data.bloqueado == 1){
                        this.setModalBloqueado(true);
                    }else {
                        response.data.response.token = token;
                        this.logged(response.data.response);
                    }
                }).catch(e => {
                    console.log(e);
                });
            },
        }, 
    };
</script>

<style lang="scss" scoped>
	.fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    ::-webkit-scrollbar {
        width: 8px;     
        height: 8px;   
    }
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: #999999;
    }
    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-track:hover,
    ::-webkit-scrollbar-track:active {
        background: #fff;
    }
</style>