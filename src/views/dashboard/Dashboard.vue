<template>
    <div>
        <AppBar />
		<div class="margen2"></div>

        <div v-if="$route.name == 'dashboard' && !loading" class="py-5">
            <div v-if="pedidos.length > 0" class="text-center font-weight-bold title">Se te asignaron <span class="red--text">{{pedidos.length}} pedidos</span> nuevos</div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="getPedidos()" small fab color="#c9242b"><v-icon color="#fff">mdi-reload</v-icon></v-btn>
            </v-card-actions>

            <Card />
        </div>

        <transition name="fade" v-if="!loading">
            <router-view/>
        </transition> 

        <v-card elevation="0" width="100%" height="100%" v-if="loading">
            <v-card-text>
                <v-row justify="center" align="center" class="fill-height margen-space">
                    <Loading v-if="loading && !error" />
                    <div v-else>
                        <div class="text-center my-2 font-weight-bold title">Algo salió mal</div>
                        <v-btn color="#c9242b" rounded @click="getPedidos()" class="white--text font-weight-bold text-capitalize">
                            Intentar de nuevo
                            <v-icon class="mx-2" color="#fff">mdi-reload</v-icon>
                        </v-btn>
                    </div>
                </v-row>
            </v-card-text>
        </v-card>

        <div class="margen"></div>

        <Footer />
	</div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Usuario from '@/services/Usuario';
import Pedidos from '@/services/Pedidos';
import Footer from '@/components/footer/FooterDashboard';
import Card from '@/components/cards/CardNuevos';
import Loading from '@/components/overlays/Loading';
import {mapState,mapActions} from 'vuex';

    export default {
        components:{
            AppBar,
            Footer,
            Card,
            Loading
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
        data() {
            return {
                loading:false,
                error:false,
            }
        },
        computed:{
            ...mapState(['user','pedidos'])
        },
        mounted() {
            this.getPedidos();
        },
        methods:{
            ...mapActions(['setPedidos']),

            getPedidos(){
                this.error = false;
                this.loading = true;
                Usuario().get(`/${this.user.data.id}/pedidos`).then((response) => {
                    this.loading = false;
                    if(response.data.data) this.setPedidos(response.data.data); 
                }).catch(e => {
                    this.error = true;
                });
            }
        }
    }
</script>

<style lang="scss">
    .margen{
        margin-bottom:70px;
    }
    .margen2{
        margin-bottom:60px;
    }
    .margen-botom{
        margin-top:80px;
    }
    .margen-space{
        margin-top:50%;
    }
</style>