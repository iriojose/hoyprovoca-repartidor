<template>
    <div>
        <AppBar class="margen2" />
		
        <div v-if="$route.name == 'dashboard' && !loading">
            <div v-if="pedidos.length > 0" class="text-center font-weight-bold title">{{pedidos.length}} Nuevos pedidos</div>
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
                    <v-progress-circular
                        :width="5" color="#c9242b"
                        indeterminate v-if="loading && !error"
                    ></v-progress-circular>
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
import {mapState,mapActions} from 'vuex';

    export default {
        components:{
            AppBar,
            Footer,
            Card,
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
                    console.log(e);
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