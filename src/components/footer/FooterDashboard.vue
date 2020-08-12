<template>
    <v-bottom-navigation color="#c9242b" fixed v-if="$vuetify.breakpoint.smAndDown">
        <v-btn to="/dashboard">
            <span>Dashboard</span>
            <v-icon color="#c9242b">mdi-view-dashboard</v-icon>
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