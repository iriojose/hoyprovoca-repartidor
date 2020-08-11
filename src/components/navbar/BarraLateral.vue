<template>
    <v-navigation-drawer 
        app v-model="drawers" temporary hide-overlay width="220" color="#c9242b"
        style="margin-top:60px"
    >
        <v-list color="transparent">
            <v-subheader class="white--text text-center">Hoyprovoca</v-subheader>
            <v-list-item-group>
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.path">
                    <v-list-item-icon>
                        <v-icon color="#fff" v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text font-weight-bold" v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import variables from '@/services/variables_globales';

    export default {
        data() {
            return {
                ...variables,
                items:[
                    {text:"Nuevos",icon:"mdi-clipboard-arrow-down",path:"/dashboard"},
                    {text:"En camino",icon:"mdi-bike-fast",path:"/dashboard/vias"},
                    {text:"Entregados",icon:"mdi-clipboard-edit",path:"/dashboard/entregados"},
                    {text:"Completados",icon:"mdi-check-bold",path:"/dashboard/completados"},
                    {text:"Chats",icon:"mdi-chat-processing",path:"/dashboard/chats"},
                ]
            }
        },
        computed:{
            ...mapState(['user','drawer']),

            drawers:{
                get(){
                    return this.drawer;
                },
                set(val){
                    this.setDrawer(val);
                }
            }
        },
         methods: {
            ...mapActions(['setDrawer']),
        },
    }
</script>