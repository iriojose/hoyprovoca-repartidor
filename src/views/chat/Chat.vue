<template>
    <v-card class="fixHeight"  style="background:transparent;border: none;padding:25px;" outlined>
        <div class="font-weight-black title" style="padding-top:10px;text-align:center;">Chat</div>
        <v-row justify="center" align="center" class="mt-3" style="padding-top:15px;">
            <v-scroll-x-transition>
                <div id="talkjs-container" style="width: 100%;; height: 450px"><i><v-spacer></v-spacer><v-spacer></v-spacer></i></div>
            </v-scroll-x-transition>
        </v-row>
    </v-card>
</template>

<script>
import {mapState,mapActions} from 'vuex';
import Talk from 'talkjs';
import w from '@/services/variables_globales';

    export default {
        head: {
            title() { 
                return {
                    inner: "Hoyprovoca",
                    separator:'|',
                    complement:'Chat'
                };
            }
        },
        data() {
            return {
                ...w,
                me: null,
                other: null,
                loading:false,
            }
        },
        computed:{
            ...mapState(['user','cliente']),
        },
        watch:{
            cliente(){
                this.init();
            }
        },
        methods:{
            init(){
                let inbox;
                // cambiar teamlead por cualquier otro email de soporte
                Talk.ready.then(async () => {
                    this.me = new Talk.User({
                        id: this.user.data.id !== 2 ? this.user.data.email : "teamlead@somossistemas.com",
                        name: this.user.data.id !== 2 ? this.user.data.nombre + " " + this.user.data.apellido: "Soporte HOYPROVOCA.COM",
                        email: this.user.data.id !== 2 ? this.user.data.email !== "" ? this.user.data.email : null : "teamlead@somossistemas.com", 
                        photoUrl: this.user.data.id !== 2 ? this.user.data.imagen === 'default.png' ? require('@/assets/user.jpg') : this.image+this.user.data.imagen : require('@/assets/2.png'),
                        welcomeMessage: this.user.data.id !== 2 ?  "Hola, soy "+this.user.data.nombre : "En Somos Sistemas C.A, estamos encantados de ayudarte a solventar tus problemas. Déjanos un mensaje!",
                        role: 'Delivery',
                        locale: 'es-ES'
                    });
                    window.talkSession = new Talk.Session({
                        appId: process.env.VUE_APP_TALKJS_ID,
                        me: this.me
                    });        

                    if(this.user.data.id !== 2){
                        // Cambiar teamlead por cualquier otro correo de soporte
                        this.other = new Talk.User({
                            id: this.cliente ? this.cliente.correo_electronico:"teamlead@somossistemas.com",
                            name: this.cliente ? this.cliente.nombre:"Soporte HOYPROVOCA.COM",
                            email: this.cliente ? this.cliente.correo_electronico:"teamlead@somossistemas.com",
                            photoUrl: this.cliente ? require('@/assets/2.png'):require('@/assets/2.png'),
                            //welcomeMessage: this.cliente ?  "Bienvenido, a donde desea que se envie su pedido":"En Hoyprovoca, estamos encantados de ayudarte a enviar tus pedidos. Déjanos un mensaje!",
                            role:this.cliente ? 'Cliente':'Soporte',
                            locale: 'es-ES'
                        });
                    
                        let conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(this.me, this.other));
                        conversation.setParticipant(this.me);
                        conversation.setParticipant(this.other);
                        inbox = window.talkSession.createInbox({selected: conversation});
                    }else{
                        window.talkSession = new Talk.Session({
                            appId: process.env.VUE_APP_TALKJS_ID,
                            me: this.me
                        });
                        let conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(this.me));
                        conversation.setParticipant(this.me);    
                        inbox = window.talkSession.createInbox({selected: conversation});
                    }
                    inbox.mount(document.getElementById("talkjs-container"));
                });
            },
        },
        mounted() {
            this.init();   
        }
    }
</script>

<style lang="scss">
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        transition-duration: .3s;
        transition-property: height, opacity, transform;
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
    .fixHeight{
        @media (max-width:958px){
            margin-top:-25px!important;
            max-height: 100%!important;
        }
    }
</style>