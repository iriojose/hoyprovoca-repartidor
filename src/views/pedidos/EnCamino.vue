<template>
    <div class="py-5">
        <div v-if="pedidosEncamino.length > 0" class="text-center font-weight-bold title mt-5">Tienes <span class="red--text">{{pedidosEncamino.length}} pedidos</span> por entregar</div>

        <Card />
    </div>
</template>

<script>
import Card from '@/components/cards/CardEncamino';
import {mapState} from 'vuex';

    export default {
        components:{
            Card,
        },
        computed:{
            ...mapState(['pedidosEncamino'])
        }
    }
</script>
