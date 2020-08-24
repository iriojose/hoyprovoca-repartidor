<template>
	<div>
        <v-app-bar app elevation="0" color="#fff">
            <v-spacer class="hidden-sm-and-up"></v-spacer>
            <div class="d-flex align-center">
                <v-img
                    alt="Hoyprovoca logo" class="shrink mr-2 cursor" contain
                    src="@/assets/logo2.png" transition="scale-transition"
                    width="200" height="100"
                />
            </div>

            <v-spacer></v-spacer>
            <v-btn text class="text-capitalize body-1 font-weight-bold" v-if="!$vuetify.breakpoint.smAndDown">
                Hoyprovoca
                <v-icon class="mx-2" color="#c9242b">mdi-basket</v-icon>
            </v-btn>

            <v-btn text class="text-capitalize body-1 font-weight-bold" v-if="!$vuetify.breakpoint.smAndDown">
                Administrativo
                <v-icon class="mx-2" color="#c9242b">mdi-chart-timeline-variant</v-icon>
            </v-btn>

            <v-btn text class="text-capitalize body-1 font-weight-bold" v-if="!$vuetify.breakpoint.smAndDown">
                Repartidores
                <v-icon class="mx-2" color="#c9242b">mdi-truck</v-icon>
            </v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn text to="/login" class="text-capitalize body-1 font-weight-bold" v-if="!$vuetify.breakpoint.smAndDown">
                Inicia sesión
                <v-icon class="mx-2" color="#c9242b">mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>

        <div :class="$vuetify.breakpoint.smAndDown ? 'text-capitalize font-weight-bold letras-sm ml-5':'letras text-capitalize font-weight-bold ml-12'">
            Conectate con tu <strong class="color">Comprador</strong> para el envio de su <strong class="color">pedido</strong>!
        </div>

        <div class="ubicacion">
            <v-img contain width="400" height="800" src="@/assets/delivery2.svg"></v-img>
        </div>

        <v-card elevation="0" class="mb-10">
            <v-card-text>
                <v-row justify="start" class="ml-12 mt-12">
                    <v-btn 
                        to="/login" @click="login" rounded color="#c9242b" 
                        :class="$vuetify.breakpoint.smAndDown ? 'body-1 text-capitalize white--text':'text-capitalize white--text title'" 
                        height="50" elevation="0"
                    >
                        Inicia sesión
                    </v-btn>

                    <!--v-btn 
                        to="/register" rounded outlined 
                        :class="$vuetify.breakpoint.smAndDown ? 'body-1 text-capitalize mx-2':'text-capitalize mx-10 title'" 
                        height="50" elevation="0"
                    >
                        Registrate!
                    </v-btn-->
                </v-row>
            </v-card-text>
        </v-card>

        <v-card color="#c9242b" elevation="0" width="100%">
            <v-card-text :class="$vuetify.breakpoint.smAndDown ? 'margen2':''">
                <v-row justify="center">
                    <v-col :cols="12" md="3" v-for="(card,i) in cards" :key="i" :offset="i == 0 || i == 3 || $vuetify.breakpoint.smAndDown ? '0':'1'">
                        <v-card elevation="0" width="100%" height="300" class="px-5">
                            <v-avatar :color="card.color" class="mt-5">
                                <v-icon color="#fff">{{card.icon}}</v-icon>
                            </v-avatar>

                            <v-card-title class="font-weight-black">{{card.title}}</v-card-title>

                            <v-divider class="my-5"></v-divider>

                            <v-card-subtitle class="font-weight-bold">{{card.text}}</v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card elevation="0" width="100%" height="200">
            <v-card-text>
                <v-row justify="center" class="margen">
                    <div class="text-capitalize title black--text text-center">tu Perfecta <strong class="color">solución</strong> para enviar <strong class="color">pedidos!</strong></div>
                </v-row>
            </v-card-text>
        </v-card>

        <v-img class="mt-5" width="100%" height="200" transition="scale-transition" src="@/assets/wave.svg"></v-img>
        <v-footer color="#c9242b" widht="100%" elevation="0" :class="$vuetify.breakpoint.smAndDown ? 'mb-10':null">
            <v-col class="text-center white--text" cols="12">
                {{ new Date().getFullYear() }} — <strong><a style="color:white;text-decoration:none;" href="https://hoyprovoca.com">Hoyprovoca</a></strong>
            </v-col>
        </v-footer>
        
        <v-bottom-navigation color="#c9242b" fixed v-if="$vuetify.breakpoint.smAndDown">
            <v-btn href="https://hoyprovoca.com">
                <span>Hoyprovoca</span>
                <v-icon color="#c9242b">mdi-basket</v-icon>
            </v-btn>
            <v-btn href="https://hoyprovoca.com/admin">
                <span>Administrativo</span>
                <v-icon color="#c9242b">mdi-chart-timeline-variant</v-icon>
            </v-btn>
            <v-btn to="/login">
                <span>Inicia sesión</span>
                <v-icon color="#c9242b">mdi-exit-to-app</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script>
import router from '@/router';

	export default {
		head:{
            title(){
                return {
                    inner:'Repartidores | Inicio',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        data() {
            return {
                cards:[
                    {icon:"mdi-chat-processing",color:"#00796B",title:"Chat",text:"Comunicate con los clientes por chat online."},
                    {icon:"mdi-cogs",color:"#AFB42B",title:"Servicio 24/7",text:"Servicio disponible las 24 horas del dia."},
                    {icon:"mdi-truck",color:"#FBC02D",title:"Entregas",text:"Entregas de pedidos segun lo convenido."},
                    //{icon:"mdi-cogs",color:"#00796B",title:"",text:""},
                    //{icon:"mdi-cogs",color:"#AFB42B",title:"",text:""},
                    //{icon:"mdi-cogs",color:"#FBC02D",title:"",text:""}
                ]
            }
        },
        methods:{
            login(){
                router.push("/login");
            }
        }
	} 
</script>

<style lang="scss" scoped>
	.letras{
        width:80%;
        height:100%;
        margin-top:100px;
        font-size:82px;
        text-align: left;
    }
    .margen{
        margin-top:100px;
    }
    .margen2{
        margin-top:300px;
    }
    .letras-sm{
        width:80%;
        height:100%;
        margin-top:80px;
        text-align: left;
        font-size:34px;
    }
    .color{
        color:#c9242b;
    }
    .border{
        border-radius:5%;
    }
    .ubicacion{
        width:400px;
        height:300px;
        position: absolute;
        right:1%;
        top:5%;
        z-index:2;
    }
    .card{
        border-radius: 5%;
    }
    .hr{
        margin-top:50px;
        width:40%;
        height:5px;
        background:#c9242b;
        border:0;
    }
</style>
