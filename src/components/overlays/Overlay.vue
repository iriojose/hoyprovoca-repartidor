<template>
    <v-overlay :value="loading">
        <Loading v-if="!error" />
        <div v-else>
            <div class="my-2 text-capitalize font-weight-bold white--text text-center">Algo salió mal</div>
            <slot name="error"></slot>
        </div>
    </v-overlay>
</template>

<script>
    export default {
        components:{
            Loading: () => import("@/components/overlays/Loading"),
        },
        props:{
            loading:{
                type:Boolean,
                default:false
            },
            error:{
                type:Boolean,
                default:false
            }
        }
    }
</script>
