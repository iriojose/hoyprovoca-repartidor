<template>
    <div>
        <AppBar />
		
        <router-view/>
	</div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';
import Usuario from '@/services/Usuario';
import Pedidos from '@/services/Pedidos';

    export default {
        components:{
            AppBar
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