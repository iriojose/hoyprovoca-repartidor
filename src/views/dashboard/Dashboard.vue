<template>
    <div :class="$vuetify.breakpoint.smAndDown?'mx-2 bottom top2':null">
		<router-view/>

		<div v-if="$route.name == 'dashboard'">
            <Dashboard />
        </div>
	</div>
</template>

<script>
import Dashboard from '@/components/dashboard/Dashboard';

    export default {
        components:{
            Dashboard
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

<style lang="scss" scoped>
    .top2{
        margin-top:20px;
    }
    .bottom{
        margin-bottom:200px;
    }
</style>