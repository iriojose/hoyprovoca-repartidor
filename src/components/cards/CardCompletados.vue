<template>
    <v-row justify="center" class="mx-2"  v-if="pedidosCompletados.length">
        <v-col cols="12" md="3" v-for="(pedido,i) in pedidosCompletados" :key="i">
            <v-card width="100%" height="200" color="#212121">

                <v-toolbar width="100%" height="50" absolute elevation="0" color="transparent">
                    <v-spacer></v-spacer>
                    <v-menu offset-y>
                        <template v-slot:activator="{on}">
                            <v-btn fab color="transparent" small v-on="on">
                                <v-icon color="#fff">mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item,e) in items" :key="e" @click="opcion(e,pedido)">
                                <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
                                <v-list-item-icon>
                                    <v-icon color="#c9242b">{{item.icon}}</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>

                <v-row justify="center" align="center" class="fill-height">
                    <v-img contain width="100%" height="100" :src="require('@/assets/logo 4.png')"></v-img>
                </v-row>
            </v-card>
        </v-col>

        <Overlay :loading="loading" :error="error">
            <template v-slot:error>
                <v-btn @click="close" rounded color="#fff" class="text-capitalize black--text font-weight-bold">
                    Cerrar 
                    <v-icon class="mx-2" color="#c9242b">mdi-close</v-icon>
                </v-btn>
            </template>
        </Overlay>

        <ModalProducts :dialog="dialog" :conceptos="conceptos" :pedido="pedido">
            <template v-slot:close>
                <v-btn small fab color="#c9242b" @click="dialog = false" class="ma-2">
                    <v-icon color="#fff">mdi-close</v-icon>
                </v-btn>
            </template>
        </ModalProducts>
    </v-row>

    <v-row justify="center" class="mx-2" v-else>
        <Empty :class="$vuetify.breakpoint.smAndDown ?  'margen':'margen-web'" title="No se encontraron resultados" />
    </v-row>
</template>

<script>
import router from '@/router';
import Empty from '@/components/overlays/Empty';
import {mapState,mapActions} from 'vuex';
import Pedidos from '@/services/Pedidos';
import Clientes from '@/services/Clientes';
import Overlay from '@/components/overlays/Overlay';
import ModalProducts from '@/components/modals/ModalProducts';

    export default {
        components:{
            Overlay,
            ModalProducts,
            Empty
        },
        data() {
            return {
                loading:false,
                dialog:false,
                error:false,
                items:[
                    {title:"Productos",icon:"mdi-food"},
                    {title:"Chat-cliente",icon:"mdi-chat-processing"}
                ],
                conceptos:[],
                pedido:{}
            }
        },
        computed:{
            ...mapState(['pedidosCompletados'])
        },
        methods:{
            ...mapActions(['setCliente']),
            
            errorMessage(mensaje){
                this.$toasted.error(mensaje, { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 2000,
                    //icon : "error",
                });
            },
            close(){
                this.error = false;
                this.loading = false;
            },
            opcion(i,item){
                if(i == 0) this.getProductos(item);
                if(i == 1) this.getClientes(item);
            },
            getProductos(item){
                this.loading = true;
                Pedidos().get(`/${item.id}/conceptos`).then((response) => {
                    this.pedido = item;
                    this.conceptos = response.data.data;
                    this.loading = false;
                    this.dialog = true;
                }).catch(e => {
                    this.error = true;
                });
            },
            getClientes(item){
                this.loading = true;
                Clientes().get(`/${item.adm_clientes_id}`).then((response) => {
                    this.loading = false;
                    this.setCliente(response.data.data);
                    router.push("/dashboard/chats");
                }).catch(e => {
                    this.error = true;
                    this.errorMessage("Error al traer la información del cliente");
                });
            }
        }
    }
</script>

<style lang="scss">
    .margen-web{
        margin-top:15%;
    }
    .margen{
        margin-top:30%;
    }
</style>