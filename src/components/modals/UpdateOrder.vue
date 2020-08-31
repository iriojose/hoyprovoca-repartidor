<template>
    <v-dialog v-model="dialog" width="400" transition="dialog-bottom-transition" persistent>
        <v-card>
            <v-card-title class="font-weight-bold">
                <v-spacer></v-spacer>
                    Actualizar pedido
                <v-spacer></v-spacer>
            </v-card-title>

            <v-card-text>
                <div class="text-center font-weight-black subtitle-1 my-5">
                    {{title}}
                </div>

                <v-row justify="space-around">
                    <slot name="salir"></slot>
                    <slot name="ir"></slot>
                </v-row>

                <v-alert class="mt-12" border="left" colored-border type="info" elevation="2">
                    El cliente sera notificado de la actualización del pedido
                </v-alert>
            </v-card-text>
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
            title:{
                type:String,
                default:""
            },

        },
    }
</script>