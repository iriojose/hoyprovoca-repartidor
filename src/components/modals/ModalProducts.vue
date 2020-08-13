<template>
    <v-dialog v-model="dialog" width="400" transition="dialog-bottom-transition" persistent>
        <v-card>
            <v-card-actions>
                <div class="pl-5 title text-capitalize text-center font-weight-bold">{{items}} Productos</div>
                <v-spacer></v-spacer>
                <slot name="close"></slot>
            </v-card-actions>

            <v-virtual-scroll :items="conceptos" height="300" item-height="100">
                <template v-slot="{item}" class="my-2">
                    <v-list-item three-line>
                        <Load :imagen="item.imagen" />
                       
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">{{item.nombre}}</v-list-item-title>
                            <v-list-item-subtitle class="font-weight-bold">
                                {{item.descripcion}}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle class="font-weight-bold">
                                Precio: {{item.precio_dolar}} - Cantidad: {{+item.cantidad}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-virtual-scroll>

            <v-footer absolute class="font-weight-bold title" elevation="3" color="#fff">
                <v-col class="text-center" cols="12">
                    Total: <strong>{{total}}</strong> 
                </v-col>
            </v-footer>
        </v-card>
    </v-dialog>
</template>

<script>
import Load from "@/components/overlays/LoadImageAvatar";
import accounting from 'accounting';

    export default {
        components:{
            Load
        },
        props:{
            dialog:{
                type:Boolean,
                default:false
            },
            conceptos:{
                type:Array,
                default:() => ([])
            },
            pedido:{
                type:Object,
                default:() => ({})
            }
        },
        watch:{
            conceptos(){
                this.total = 0;
                this.conceptos.filter((a,i) => {
                    this.total+= (+a.precio_dolar) * (+this.pedido.detalles[i].cantidad);
                    a.cantidad = this.pedido.detalles[i].cantidad;
                });
                this.total = accounting.formatMoney(+this.total,{symbol:"$ ",thousand:',',decimal:'.'});
                this.items = this.conceptos.length;
                this.conceptos.filter(a => a.precio_dolar = accounting.formatMoney(+a.precio_dolar,{symbol:"$ ",thousand:',',decimal:'.'}));
            }
        },
        data(){
            return {
                total:0,
                items:0
            }
        }
    }
</script>
