<template>
    <v-navigation-drawer app expand-on-hover permanent color="#0f2441">
        <v-list>
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img :src="user.data.imagen === 'default.png' ? require('@/assets/user.jpg'):image+user.data.imagen"></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="title white--text">{{user.data.nombre + ' ' + user.data.apellido}}</v-list-item-title>
                    <v-list-item-subtitle class="white--text">{{user.data.email}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider color="#fff"></v-divider>

        <v-list nav dense>
            <v-list-item link v-for="(item,i) in items" :key="i" :to="item.to">
                <v-list-item-icon>
                    <v-icon color="#fff">{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="white--text">{{item.title}}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapState} from 'vuex';
import variables from '@/services/variables_globales';

    export default {
        data() {
            return {
                ...variables,
                items: [
                    { title: 'Dashboard', icon: 'mdi-view-dashboard',to:'/' },
                    { title: 'Pedidos asignados', icon: 'mdi-cart',to:'/pedidos' },
                    { title: 'Pedidos cargados', icon: 'mdi-cart-arrow-down',to:'/cargados' },
                    { title: 'Pedidos en envio', icon: 'mdi-cart-arrow-right',to:'/envio' },
                    { title: 'Pedidos entregados', icon: 'mdi-cart-arrow-up',to:'/entregados' },
                ],
            }
        },
        computed: {
            ...mapState(['user'])
        },
    }
</script>

<style lang="scss" scoped>

</style>