<template>
    <div class="py-5">
        <div v-if="pedidosEntregados.length > 0" class="text-center font-weight-bold title mt-5">Has entregado <span class="red--text"> {{pedidosEntregados.length}} Pedidos</span></div>

        <Card />
    </div>
</template>

<script>
import Card from '@/components/cards/CardEntregados';
import {mapState} from 'vuex';

    export default {
        components:{
            Card,
        },
        computed:{
            ...mapState(['pedidosEntregados'])
        }
    }
</script>
