<template>
	<v-app style="background-color:#fff;">
		<transition name="fade" v-if="loadingApp == false">
            <router-view/>
        </transition>  
        
        <v-card elevation="0" width="100%" height="100%" v-if="loadingApp">
            <v-card-text>
                <v-row justify="center" :class="$vuetify.breakpoint.smAndDown ? 'margen':'margen-web'">
                    <div>
                        <v-row justify="center">
                            <v-img contain width="100" height="100" :src="require('@/assets/logo 3.png')"></v-img>
                        </v-row>
                        <v-btn v-show="error" color="#c9242b" @click="sesion()" rounded class=" my-4 text-capitalize subtitle-2 font-weight-bold white--text">
                            Recargar
                            <v-icon class="mx-2" color="#fff">mdi-reload</v-icon>
                        </v-btn>
                    </div>
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
        data() {
            return {
                error:false,
                token:null
            }
        },
        created() {
            this.token = window.localStorage.getItem('repartidor_token');

            if(this.token != null && this.token != "" && this.token != undefined) {
                this.sesion();
                router.push("/dashboard");
            }else this.setLoading(false);
        },
        computed:{
            ...mapState(['loadingApp'])
        },
        methods:{
            ...mapActions(['logged','setModalBloqueado','setLoading']),
    
            sesion(){//valida el token
                this.error = false;
                this.setLoading(true);
                Auth().post("/sesion",{token:this.token}).then((response) => {
                    if(response.data.code == 440){
                        this.setLoading(false);
                        this.error = false;
                        router.push("/");
                        localStorage.removeItem("repartidor_token");
                    }
                    if(response.data.response.data.bloqueado == 1){
                        this.setModalBloqueado(true);
                        this.setLoading(false);
                        this.error = false;
                        localStorage.removeItem("repartidor_token");
                    } 
                    if(response.data.code == 200) {
                        response.data.response.token = this.token;
                        this.logged(response.data.response);
                        this.setLoading(false);
                        this.error = false;
                    }
                }).catch(e => {
                    this.error = true;
                    //localStorage.removeItem("repartidor_token");
                });
            },
        }, 
    };
</script>

<style lang="scss" scoped>
    .margen{
        margin-top:50%;
    }
    .margen-web{
        margin-top:20%;
    }
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