<template>
    <div>
        <AppBar />
		
        <transition name="fade">
            <router-view/>
        </transition> 
        
        <Footer />
	</div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Usuario from '@/services/Usuario';
import Pedidos from '@/services/Pedidos';
import Footer from '@/components/footer/FooterDashboard';
import {mapState} from 'vuex';

    export default {
        components:{
            AppBar,
            Footer
        },
		head:{
            title(){
                return {
                    inner:'Dashboard',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        computed:{
            ...mapState(['user'])
        },
        mounted() {
            this.getPedidos();
        },
        methods:{
            getPedidos(){
                Usuario().get(`/${this.user.data.id}/pedidos`).then((response) => {
                    console.log(response);
                }).catch(e => {
                    console.log(response);
                });
            }
        }
    }
</script>