<template>
    <v-bottom-navigation color="#c9242b" fixed v-if="$vuetify.breakpoint.smAndDown">
        <v-btn to="/dashboard/vias">
            <span>En camino</span>
            <v-icon color="#c9242b">mdi-bike-fast</v-icon>
        </v-btn>
        <v-btn to="/dashboard/completados">
            <span>Completados</span>
            <v-icon color="#c9242b">mdi-check-bold</v-icon>
        </v-btn>
        <v-btn to="/dashboard/chats">
            <span>Chats</span>
            <v-icon color="#c9242b">mdi-chat-processing</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>