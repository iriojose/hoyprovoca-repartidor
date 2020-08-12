<template>
    <div>
        <AppBar />
		
        <div v-if="$route.name == 'dashboard'">
            <div class="text-center font-weight-bold title my-5">Nuevos pedidos</div>

            <v-row justify="center" class="mx-2">
                <v-col cols="12" md="3">
                    <v-card width="100%" height="250">
                        <!--v-overlay absolute-->
                            <v-row justify="center" align="center" class="fill-height">
                                <v-img contain width="100%" height="100" :src="require('@/assets/logo 3.png')"></v-img>
                            </v-row>
                        <!--/v-overlay-->
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <transition name="fade">
            <router-view/>
        </transition> 
        
        <Footer />
	</div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Usuario from '@/services/Usuario';
import Pedidos from '@/services/Pedidos';
import Footer from '@/components/footer/FooterDashboard';
import {mapState} from 'vuex';

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
            console.log(this.$route);
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