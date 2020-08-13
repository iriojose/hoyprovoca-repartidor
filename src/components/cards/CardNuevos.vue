<template>
    <v-row justify="center" class="mx-2">
        <v-col cols="12" md="3" v-for="(pedido,i) in pedidos" :key="i">
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

        <Overlay :loading="loading" />
    </v-row>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Pedidos from '@/services/Pedidos';
import Overlay from '@/components/overlays/Overlay';

    export default {
        components:{
            Overlay
        },
        data() {
            return {
                loading:false,
                items:[
                    {title:"Recibido",icon:"mdi-arrow-down-bold-box"},
                    {title:"Productos",icon:"mdi-food"},
                    {title:"Chat-cliente",icon:"mdi-chat-processing"}
                ]
            }
        },
        computed:{
            ...mapState(['pedidos'])
        },
        methods:{
            opcion(i,item){
                if(i == 0) this.changeStatus(item);
                if(i == 1) this.getProductos(item);
            },
            changeStatus(item){
                this.loading = true;
                Pedidos().post(`/${item.id}`,{data:{rest_estatus_id:5}}).then((response) => {
                    console.log(response);
                    this.loading = false;
                }).catch(e => {
                    console.log(e);
                });
            },
            getProductos(item){
                this.loading = true;
                Pedidos().get(`/${item.id}/conceptos`).then((response) => {
                    console.log(response);
                    this.loading = false;
                }).catch(e => {
                    console.log(e);
                })
            }
        }
    }
</script>