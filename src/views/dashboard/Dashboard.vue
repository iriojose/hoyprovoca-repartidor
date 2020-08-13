<template>
    <div>
        <AppBar class="margen" />
		
        <div v-if="$route.name == 'dashboard'">
            <div class="text-center font-weight-bold title mt-5">Nuevos pedidos</div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small fab color="#c9242b"><v-icon color="#fff">mdi-reload</v-icon></v-btn>
            </v-card-actions>

            <Card />
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
import Card from '@/components/cards/CardNuevos';
import {mapState,mapActions} from 'vuex';

    export default {
        components:{
            AppBar,
            Footer,
            Card
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
            ...mapState(['user'])
        },
        mounted() {
            this.getPedidos();
        },
        methods:{
            ...mapActions(['setPedidos']),

            getPedidos(){
                this.loading = true;
                this.error = false;
                Usuario().get(`/${this.user.data.id}/pedidos`).then((response) => {
                    console.log(response);
                    this.loading = false;
                    this.setPedidos(response.data.data);
                }).catch(e => {
                    console.log(e);
                    this.loading = false;
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
    .margen-botom{
        margin-top:80px;
    }
</style>