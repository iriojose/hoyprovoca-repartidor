<template>
    <v-card elevation="0" color="#f7f7f7">
        <v-card-text>
            <v-row justify="center" class="ml-10">
                <v-col md="5">
                    <v-card elevation="3" width="100%" height="500">
                        <div class="text-center font-weight-black my-6">Nuevos</div>

                        <v-row justify="center">
                            <!--v-card width="90%" height="100">
                                que peo pana
                            </v-card-->
                            <div class="drag">
                                <draggable :list="pedidos" group="Nuevos" :move="checkMove">
                                    <transition-group>
                                        <div v-for="pedido in pedidos" :key="pedido.id">
                                            <h2 class="cursor">{{pedido.nombre}}</h2>
                                        </div>
                                    </transition-group>
                                </draggable>
                            </div>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col md="5">
                    <v-card elevation="3" width="100%" height="500">
                        <div class="text-center font-weight-black my-6">En via</div>

                        <v-row justify="center">
                            <!--v-card width="90%" height="100">
                                que peo pana
                            </v-card-->
                            <div class="drag">
                                <draggable :move="checkMove" :list="pedidos2" group="En via">
                                    <transition-group>
                                        <div v-for="pedido in pedidos2" :key="pedido.id">
                                            <h2 class="cursor">{{pedido.nombre}}</h2>
                                        </div>
                                    </transition-group>
                                </draggable>
                            </div>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
//import Usuario from '@/services/Usuario';
import { mapState } from 'vuex';
import draggable from 'vuedraggable'

    export default {
        components: {
            draggable
        },
        data() {
            return {
                pedidos:[
                    {id:1,orders:6,icon:"mdi-email",nombre:"uno"},
                    {id:2,orders:2,icon:"mdi-email",nombre:"dos"},
                    {id:3,orders:4,icon:"mdi-email",nombre:"tres"},
                    {id:4,orders:5,icon:"mdi-email",nombre:"cuatro"},
                    {id:5,orders:3,icon:"mdi-email",nombre:"cinco"}
                ],
                pedidos2:[
                    {id:1,orders:6,icon:"mdi-email",nombre:"seis"},
                    {id:2,orders:2,icon:"mdi-email",nombre:"siete"},
                    {id:3,orders:4,icon:"mdi-email",nombre:"ocho"},
                    {id:4,orders:5,icon:"mdi-email",nombre:"nueve"},
                    {id:5,orders:3,icon:"mdi-email",nombre:"diez"}
                ]
            }
        },
        mounted(){
            //this.getPedidos();
        },
        computed:{
           ...mapState(['user'])
        },
        methods: {
            /*getPedidos(){
                Usuario().get(`/${this.user.data.id}/pedidos`).then((response) => {
                    console.log(response);
                    if(response.data.data) this.pedidos = response.data.data;
                }).catch(e =>{
                    console.log(e);
                });
            }*/
            checkMove: function(evt){
                console.log(evt);
                return (evt.draggedContext.element.name!=='nuevos');
            }
        },         
    }
</script>

<style lang="scss" scoped>
    .cursor{
        cursor: move;
    }
</style>