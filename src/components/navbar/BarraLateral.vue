<template>
    <v-navigation-drawer 
        app v-model="drawers" temporary hide-overlay width="270" color="#232323"
        style="margin-top:63px"
    >
        
    </v-navigation-drawer>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import variables from '@/services/variables_globales';

    export default {
        data() {
            return {
                ...variables,
                
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