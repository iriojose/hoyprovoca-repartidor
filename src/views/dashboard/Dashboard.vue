<template>
    <div>
        epa ciudadanos
		
        <router-view/>
	</div>
</template>

<script>
    export default {
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