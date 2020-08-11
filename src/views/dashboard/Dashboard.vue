<template>
    <div>
        <AppBar />
		
        <router-view/>
	</div>
</template>

<script>
import AppBar from '@/components/navbar/AppBar';

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