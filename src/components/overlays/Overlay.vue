<template>
    <v-overlay :value="loading">
        <v-progress-circular
            :width="5" color="#c9242b" indeterminate
        ></v-progress-circular>
    </v-overlay>
</template>

<script>
    export default {
        props:{
            loading:{
                type:Boolean,
                default:false
            },
        }
    }
</script>
