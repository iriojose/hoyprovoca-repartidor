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
    }
</script>