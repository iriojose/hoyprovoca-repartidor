<template>
    <div>
        <v-menu :transition="transition()" bottom open-on-hover offset-y>
            <template v-slot:activator="{ on }">
                <v-avatar v-on="on" :class="$vuetify.breakpoint.smAndDown ? 'mx-1':'mx-3'" size="40">
                    <v-img
                        :src="require('@/assets/logo 3.png')"
                    ></v-img>
                </v-avatar>
            </template>
            
            <!-- lista de opciones-->
            <v-card class="customized">
                <!--v-list width="200" elevation="0">
                    <v-list-item class="border">
                        <v-list-item-content>
                            <v-list-item-title v-text="user.data.nombre+' '+user.data.apellido"></v-list-item-title>
                            <v-list-item-subtitle>Repartidor</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-->
                <v-divider></v-divider>
                <v-list dense>
                    <v-list-item to="/profile">   
                        <v-list-item-icon>
                            <v-icon>mdi-cogs</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Ajustes
                        </v-list-item-title>        
                    </v-list-item>
                    
                    <v-list-item @click="logOut()">   
                        <v-list-item-icon>
                            <v-icon>mdi-exit-to-app</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Cerrar sesión
                        </v-list-item-title>        
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import router from '@/router';

    export default {
        methods: {
            ...mapActions(['logout']),
            transition(){
                return "slide-y-transition"
            },
            logOut(){
                this.logout();
                router.push('/login');
            },
        },
    }
</script>

<style lang="scss" scoped>
    .customized {
        margin-top: 10px;
    }
    .customized {
        border: 1px solid #d5cec8;
        display: block;
        background: white;
    }
    .customized:before,
    .customized:after {
        content: " ";
        height: 0;
        position: absolute;
        width: 0;
        border: 11px solid transparent;
        /* arrow size */
        right: 1%;
        transform: translateX(-100%);
    }
    .customized:before {
        border-bottom: 12px solid rgba(0, 0, 0, 0.1);
        border-right: 12px solid rgba(0, 0, 0, 0);
        border-top: 12px solid rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        position: absolute;
        top: -24px;
    }
    .customized:after {
        border-bottom: 12px solid #fff;
        border-right: 12px solid rgba(0, 0, 0, 0);
        border-top: 12px solid rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        position: absolute;
        top: -22px;
    }
</style>