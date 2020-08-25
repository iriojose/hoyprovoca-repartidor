<template>  
    <div>
        <v-card elevation="0" v-if="!loading">
            <div v-if="pedidosCompletados.length > 0" class="text-center font-weight-bold title mt-5">{{pedidosCompletados.length}} Pedidos Completados</div>
            <Card />

            <div class="margen"></div>

            <Footer />
        </v-card>

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
    </div>
</template>

<script>
import Card from '@/components/cards/CardCompletados';
import Usuario from '@/services/Usuario';
import {mapState,mapActions} from 'vuex';
import Footer from '@/components/footer/FooterDashboard';

    export default {
        components:{
            Card,
            Footer
        },
        data() {
            return {
                loading:false,
                error:false,
            }
        },
        mounted() {
            this.getPedidos();
        },
        computed:{
            ...mapState(['pedidosCompletados','user'])
        },
        methods:{
            ...mapActions(['setPedidos']),

            getPedidos(){
                this.error = false;
                this.loading = true;
                Usuario().get(`/${this.user.data.id}/pedidos/`).then((response) => {
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
</style>