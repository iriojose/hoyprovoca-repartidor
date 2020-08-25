<template>
    <v-card elevation="0">
        <div v-if="pedidosCompletados.length > 0" class="text-center font-weight-bold title mt-5">{{pedidosCompletados.length}} Pedidos Completados</div>
        <Card />
    </v-card>
</template>

<script>
import Card from '@/components/cards/CardCompletados';
import {mapState} from 'vuex';

    export default {
        components:{
            Card,
        },
        computed:{
            ...mapState(['pedidosCompletados'])
        }
    }
</script>
