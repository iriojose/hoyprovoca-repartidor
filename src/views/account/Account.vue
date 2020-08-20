<template>
   <div>
       <AppBar class="margen2" />

       <v-card color="transparent" elevation="0" width="100%">
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="12" md="3">
                        <v-card class="bg" :min-height="!$vuetify.breakpoint.smAndDown ? '572.5px' : '150px'" @click="clicked = !clickable ? true : !clicked">
                            <v-list dense nav color="transparent">
                                <v-list-item two-line>
                                    <v-list-item-avatar size="115">
                                        <v-img :src="user.data.imagen === 'default.png' ? require('@/assets/user.jpg'):image+user.data.imagen"></v-img>
                                    </v-list-item-avatar>
                                    <v-avatar @click="dialog = !dialog" class="abs_center" size="35" style="z-index:2;" color="#F5F5F5">
                                        <v-icon style="font-size:21px;">mdi-camera</v-icon>
                                    </v-avatar>
                                    <v-list-item-content class="white--text font-weight-bold">
                                        <v-list-item-title class="subtitle-1 mb-1" style="text-overflow:none; white-space:normal;">{{user.data.nombre +' '+ user.data.apellido}}</v-list-item-title>
                                        <v-list-item-subtitle class="subtitle-2 white--text font-weight-bold">Mi Perfil</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>

                            <v-divider class="back" v-show="!$vuetify.breakpoint.smAndDown"></v-divider>

                            <v-expand-transition>
                                <v-card-actions v-show="clicked">
                                    <v-list dense nav style="background: none;width:100%">
                                        <v-list-item 
                                            v-for="item in items" 
                                            :key="item.title" 
                                            link 
                                            :to="item.to"
                                            active-class="white--text color font-weight-bold sombra"
                                        >
                                            <v-list-item-icon>
                                                <v-icon dark>{{ item.icon }}</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content style="text-align:left;">
                                                <v-list-item-title class="subtitle-2 white--text font-weight-bold">{{ item.title }}</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-card-actions>
                            </v-expand-transition>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="9">
                        <v-card min-height="570px">
                            <router-view></router-view>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!--modal para cambiar imagen-->
        <CambiarImagen :dialog="dialog">
            <template v-slot:close>
                <v-btn tile color="#232323" text @click="dialog = !dialog">
                    Cancelar
                </v-btn>
            </template>
            <template v-slot:salir>
                <v-btn fab small color="#fff" @click="dialog = !dialog">
                    <v-icon color="#fff">mdi-close</v-icon>
                </v-btn>
            </template>
        </CambiarImagen>
   </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import variables from '@/services/variables_globales';
import AppBar from '@/components/navbar/AppBar';

    export default {
        components:{
            CambiarImagen:() => import('@/components/modals/CambiarImagen'),
            AppBar,
        },
        data() {
            return {
                ...variables,
                
                items: [
                    {icon:'mdi-cogs', to:'/account/profile',title:'Ajustes de Cuenta'},
                    //{icon:'mdi-history',to:'/account/notificaciones',title:'Centro de Notificaciones'},
                    {icon:'mdi-alert-circle',to:'/account/ordenes',title:'Ordenes Completadas'},
                    //{icon: 'mdi-help-circle',to:'/account/ayuda',title:'Atención al cliente'},
                ],
                dialog:false,
                clicked: false,
                clickable: true,
            }
        },
        computed:{
            ...mapState(['user']),
        },
        created() {
            window.addEventListener('resize', this.onResize);
            this.onResize();
        },
        methods: {
            onResize() {
                if (window.innerWidth < 957) {
                    this.clicked = false;
                    this.clickable = true;
                }else {
                    this.clicked = true;
                    this.clickable = false;
                }
            },
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize);
        },
    }
</script>

<style lang="scss" scoped>
    .margen2{
        margin-bottom:60px;
    }
    .color{
        background: #17468b;
    }
    .back{
        background: #fff;
    }
    .sombra{
        background:#01579b !important;
    }
    .bg{
        background-image: linear-gradient(to right top, rgba(100, 115, 201, 0.33), rgba(25, 32, 72, 0.7)), url(../../assets/bg.jpg);
        background-position: center center;
        transition: all .2s linear;
    }
    .bg-center{
        background-position:center center!important;
        width: 115px;
        height: 115px;
        background-size: 125px !important;
    }
    .border{
         border: 2px solid #F5F5F5;
    }
    .abs_center{
        position: absolute;
        top: 95px;
        left: 83px;
    }
    .abs_center:hover{
        cursor: pointer;
        background: #ededed!important;
    }
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition-duration: .3s;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
        overflow: hidden;
    }
    
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(2em, 0);
    }
    
    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        transform: translate(-2em, 0);
    }
</style>