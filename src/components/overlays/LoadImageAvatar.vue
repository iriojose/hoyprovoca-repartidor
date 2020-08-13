<template>
    <v-list-item-avatar size="80" v-if="loading">
        <v-img :src="image+imagen"></v-img>
    </v-list-item-avatar>
    <v-list-item-avatar size="80" v-else>
        <v-progress-circular
            :width="5" color="#c9242b" indeterminate
        ></v-progress-circular>
    </v-list-item-avatar>
</template>

<script>
import variables from '@/services/variables_globales';

    export default {
        props:{
            imagen:{
                type:String,
                default:"default.png"
            }
        },
        data(){
            return {
                ...variables,
                loading:false
            }
        },
        async mounted(){
            await this.preload(this.image + this.imagen);
        },
        methods: {
            check(event){
                let img = new Image();
                img.src = event.target.responseURL;
            return this.loading=true;
            },
            preload(data) {
                return new Promise((done) => {
                    try {
                        let load = (url) => {
                            let req = new XMLHttpRequest();
                            req.open("GET", url, true);
                            req.responseType = "blob";
                            req.onload = async (event) => done( this.check(event));
                            req.onerror = (event) => done(this.check(event));
                            req.send();
                        };
                        load(data);
                    } catch (error) {
                        console.log("error :", error);
                    }
                });
            },
        },
    }
</script>