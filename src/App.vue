<template>
	<v-app style="background-color:#fff;">
		<transition name="fade" v-if="!loadingApp">
            <router-view/>
        </transition>  
        <v-card elevation="0" width="100%" height="100%" v-else>
            <v-card-text>
                <v-row justify="center" align="center" class="fill-height">
                    <v-img contain width="100" height="100" src="@/assets/logo 6.png"></v-img>
                </v-row>
            </v-card-text>
        </v-card>
	</v-app>
</template>

<script>
import router from '@/router';
import Auth from '@/services/Auth';
import {mapActions,mapState} from 'vuex';

    export default {
        name: 'App',
        created() {
            let token = window.localStorage.getItem('repartidor_token');

            if(token != null && token != "" && token != undefined) {
                this.sesion(token);
                router.push("/dashboard");
            }
        },
        computed:{
            ...mapState(['loadingApp'])
        },
        methods:{
            ...mapActions(['logged','setModalBloqueado','setLoading']),
    
            sesion(token){//valida el token
                this.setLoading(true);
                Auth().post("/sesion",{token:token}).then((response) => {
                    if(response.data.response.data.bloqueado == 1){
                        this.setModalBloqueado(true);
                        this.setLoading(false);
                        localStorage.removeItem("repartidor_token");
                    }else if(response.data.code == 403){
                        this.setLoading(false);
                        localStorage.removeItem("repartidor_token");
                        router.push("/");
                    }else if(response.data.code == 200) {
                        response.data.response.token = token;
                        this.logged(response.data.response);
                        this.setLoading(false);
                    }else{
                        this.setLoading(false);
                        router.push("/");
                        localStorage.removeItem("repartidor_token");
                    }
                }).catch(e => {
                    console.log(e);
                    this.setLoading(false);
                    router.push("/");
                    localStorage.removeItem("repartidor_token");
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