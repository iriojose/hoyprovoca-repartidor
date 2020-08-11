<template>
    <div>
        <v-app-bar color="#fff" elevation="0">
            
            <v-app-bar-nav-icon color="#000" class="mr-1" @click="change" v-if="drawer==false" />

            <v-btn fab v-else  @click="change" icon depressed class="mr-1">
                <v-icon color="#000">
                    mdi-close
                </v-icon>
            </v-btn>
            <v-spacer class="hidden-sm-and-up"></v-spacer>
            <div class="text-capitalize font-weight-black">{{$route.name}}</div>
            <v-spacer></v-spacer>
            <Perfil />
        </v-app-bar>

        <BarraLateral />
    </div>
</template>

<script>
import Perfil from './Perfil';
import BarraLateral from './BarraLateral';
import {mapState,mapActions} from 'vuex';

    export default {
        components:{
            Perfil,
            BarraLateral
        },
        data() {
            return {
                dialog:false,
            }
        },
        computed:{
            ...mapState(['drawer']),
        },
        methods:{
            ...mapActions(['setDrawer']),

            change(){
                this.drawer ? this.setDrawer(false):this.setDrawer(true);
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>