<template>
    <div class="fondo">
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded color="#2950c3" class="text-capitalize white--text caption" @click="forgot">
                ¿Olvido su contraseña?
            </v-btn>
        </v-card-actions>

        <v-card color="transparent" elevation="0" width="100%">
            <v-card-text>
                <v-row justify="center">
                    <v-img transition="scale-transition" contain width="100" height="50" :src="require('@/assets/logo 6.png')"></v-img>
                </v-row>
            </v-card-text>

            <v-card-text>
                <v-row justify="center" class="py-2">
                    <v-col cols="12" md="9" sm="12">
                        <v-card width="100%" elevation="0">
                            <v-row justify="center">
                                <v-col cols="12" md="6" class="hidden-sm-and-down">
                                    <v-img width="100%" height="400" contain :src="require('@/assets/delivery.svg')"></v-img>
                                </v-col>
                                <v-col cols="12" md="6" sm="12" class="px-8 py-12">
                                    <div class="headline text-center mb-5">Inicia sesión ahora!</div>
                                        
                                    <v-card elevation="0" height="50">
                                        <v-fade-transition>
                                            <v-alert border="left" colored-border elevation="2"  dense :type="type" v-show="showMessage">
                                                {{mensaje}}
                                            </v-alert>
                                        </v-fade-transition> 
                                    </v-card>

                                    <v-form v-model="valid" @submit.prevent="">
                                        <v-text-field
                                            filled rounded :disabled="loading" v-model="data.user"
                                            single-line dense color="#0f2441"
                                            :success-messages="success" :error-messages="errors"
                                            @input="getUser(data.user)" label="Ingrese correo electrónico"
                                        >
                                            <template v-slot:append>
                                                <v-fade-transition leave-absolute>
                                                    <v-progress-circular
                                                        v-if="loading2" size="24"
                                                        color="#0f2441" indeterminate
                                                    ></v-progress-circular>
                                                    <img v-else width="24" height="24" :src="require('@/assets/logo 3.png')">
                                                </v-fade-transition>
                                            </template>
                                        </v-text-field>

                                        <v-text-field
                                            filled rounded dense
                                            :disabled="loading" v-model="data.password"
                                            single-line type="password" color="#0f2441"
                                            :rules="[required('Contraseña'),minLength('Contraseña',6)]"
                                            label="Contraseña"
                                        ></v-text-field>

                                        <v-btn
                                            rounded color="#2950c3" block
                                            :loading="loading" height="40"
                                            :disabled="valid && success !== '' ? false:true"
                                            @click="login()" class="text-capitalize caption white--text"
                                        >
                                            Iniciar sesión
                                        </v-btn>
                                    </v-form>

                                    <v-divider class="my-10"></v-divider>

                                    <div class="subtitle-2 text-center color" @click="forgot">¿Olvidaste tu contraseña? ¡Recuperala!</div>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-footer fixed class="font-weight-medium" elevation="0" color="#1f3b63">
            <v-col class="text-center white--text" cols="12">
                {{ new Date().getFullYear() }} — <strong>Hoyprovoca</strong> 
            </v-col>
        </v-footer>
    </div>
</template>

<script>
import router from '@/router';
import validations from '@/validations/validations';
import Auth from '@/services/Auth';
import Usuario from '@/services/Usuario';
import {mapActions} from 'vuex';

    export default {
        data() {
            return {
                ...validations,
                mensaje:'',
                type:'error',
                showMessage:false,
                loading:false,
                loading2:false,
                valid:false,
                success:'',
                errors:[],
                aux:[],
                data:{
                    user:'',
                    password:''
                },
            }
        },
        head:{
            title(){
                return {
                    inner:'Iniciar sesión',
                    separator:' ',
                    complement: ' '
                }
            }
        },
        methods:{
            ...mapActions(['logged','setModalBloqueado']),
            
            forgot(){
                router.push('/forgot');
            },
            respuesta(mensaje,type){
                this.mensaje = mensaje;
                this.type = type
                this.loading = false;
                this.showMessage = true;
                setTimeout(() => {this.showMessage = false}, 2000);
            },
            async getUser(email){
                this.errors = [];
                this.success = '';
                if(email.length <= 0) return this.errors.push('Debe ingresar un email');
                // eslint-disable-next-line
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/ 
                if (!regex.test(email)) return this.errors.push(`Debe ingresar un email válido`);
                this.loading2 = true;
                await Usuario().get(`/?email=${email}`).then((response) => {
                    this.loading2 = false;
                    if(!response.data.data) {
                        return this.errors.push('Este email no esta registrado');
                    }else{
                        if(response.data.data[0].bloqueado == 1){
                            return this.errors.push("Esta cuenta se encuentra bloqueada.");
                        }else{
                            return this.success='Email verificado';
                        }
                    }
                }).catch(e => {
                    this.loading2 = false;
                    return this.errors.push('Error de conexión');
                });
            },
            login(){
                this.loading = true;
                Auth().post("/login",{data:this.data}).then((response) =>{
                    if(response.data.data.bloqueado == 1){
                        this.setModalBloqueado(true);
                        this.loading = false;
                    }else if(response.data.data.perfil_id == 4){
                        this.logged(response.data.data);
                        this.respuesta("Bienvenido.","success");
                        setTimeout(() => { this.home()},1000);
                    }else{
                        this.respuesta("Este usuario no es un Repartidor.","error");
                    }
                }).catch((e) => {
                    console.log(e);
                    this.respuesta("Contraseña incorrecta.","error");
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .fondo{
        background:#1f3b63;
        height: 100%;
    }   
    .color{
        color:#000;
        background:#fff;
    }
    .color:hover{
        cursor:pointer;
        text-decoration:underline;
        background:#fff;
    }
</style>