<template>
    <div>
        <v-app-bar color="#fff" elevation="0">
            <div class="pl-12 text-capitalize font-weight-black"> {{$route.name}} </div>
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
    }
</script>

<style lang="scss" scoped>

</style>