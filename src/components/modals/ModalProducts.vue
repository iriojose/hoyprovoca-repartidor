<template>
    <v-dialog v-model="dialog" width="400" transition="dialog-bottom-transition" persistent>
        <v-card height="400">
            <v-card-actions>
                <v-spacer></v-spacer>
                <slot name="close"></slot>
            </v-card-actions>

            <v-bottom-navigation color="#c9242b" absolute>
                
            </v-bottom-navigation>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props:{
            dialog:{
                type:Boolean,
                default:false
            },
            conceptos:{
                type:Array,
                default:() => ([])
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>