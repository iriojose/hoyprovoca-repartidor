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
                            <v-list-item v-for="(item,i) in items" :key="i">
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>

                <v-row justify="center" align="center" class="fill-height">
                    <v-img contain width="100%" height="100" :src="require('@/assets/logo 4.png')"></v-img>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {mapState,mapActions} from 'vuex';

    export default {
        data() {
            return {
                items:[
                    {title:"Recibido",icon:""},
                    {title:"Productos",icon:""},
                    {title:"Chat-cliente",icon:""}
                ]
            }
        },
        computed:{
            ...mapState(['pedidos'])
        },
    }
</script>

<style lang="scss" scoped>

</style>