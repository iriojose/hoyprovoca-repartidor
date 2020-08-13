<template>
    <div>
        <div v-if="pedidosEncamino.length > 0" class="text-center font-weight-bold title mt-5">{{pedidosEncamino.length}} Pedidos en via</div>

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
