<template>
    <div>
        <AppBar class="margen" />
		
        <div v-if="$route.name == 'dashboard'">
            <div class="text-center font-weight-bold title my-5">Nuevos pedidos</div>

            <v-row justify="center" class="mx-2">
                <v-col cols="12" md="3" v-for="(n,i) in 5" :key="i">
                    <v-card width="100%" height="200" color="#212121">
                        <v-toolbar width="100%" height="50" absolute elevation="0" color="transparent">
                            <v-spacer></v-spacer>
                            <v-icon color="#fff">mdi-dots-vertical</v-icon>
                        </v-toolbar>
                        <v-row justify="center" align="center" class="fill-height">
                            <v-img contain width="100%" height="100" :src="require('@/assets/logo 4.png')"></v-img>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <transition name="fade">
            <router-view/>
        </transition> 

        <div class="margen"></div>

        <Footer />
	</div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Usuario from '@/services/Usuario';
import Pedidos from '@/services/Pedidos';
import Footer from '@/components/footer/FooterDashboard';
import {mapState,mapActions} from 'vuex';

    export default {
        components:{
            AppBar,
            Footer
        },
		head:{
            title(){
                return {
                    inner:'Dashboard',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        computed:{
            ...mapState(['user'])
        },
        mounted() {
            this.getPedidos();
        },
        methods:{
            getPedidos(){
                Usuario().get(`/${this.user.data.id}/pedidos`).then((response) => {
                    console.log(response);
                }).catch(e => {
                    console.log(e);
                });
            }
        }
    }
</script>

<style lang="scss">
    .margen{
        margin-bottom:70px;
    }
    .margen-botom{
        margin-top:80px;
    }
</style>