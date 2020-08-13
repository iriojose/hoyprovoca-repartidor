<template>
    <div>
        <v-row justify="center">
            <v-img contain width="200" height="200" :src="require('@/assets/empty.svg')"></v-img>
        </v-row>
        <div class="text-center text-capitalize title font-weight-bold my-2">{{title}}</div>
    </div>  
</template>

<script>
    export default {
        props:{
            title:{
                type:String,
                default:""
            }
        }
    }
</script>
