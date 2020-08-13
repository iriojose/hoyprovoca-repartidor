<template>
    <v-overlay :value="loading">
        <v-progress-circular
            :width="5" color="#c9242b" indeterminate v-if="!error"
        ></v-progress-circular>

        <div v-else>
            <div class="my-2 text-capitalize font-weight-bold white--text text-center">Algo salió mal</div>
            <slot name="error"></slot>
        </div>
    </v-overlay>
</template>

<script>
    export default {
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
