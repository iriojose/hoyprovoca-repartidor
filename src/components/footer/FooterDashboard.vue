<template>
    <v-bottom-navigation color="#c9242b" fixed v-if="$vuetify.breakpoint.smAndDown">
        <v-btn to="/dashboard">
            <span>Dashboard</span>
            <v-icon color="#c9242b">mdi-view-dashboard</v-icon>
        </v-btn>
        <v-btn to="/account/profile">
            <span>Perfil</span>
            <v-icon color="#c9242b">mdi-account</v-icon>
        </v-btn>
        <v-btn to="/dashboard/chats">
            <span>Chats</span>
            <v-icon color="#c9242b">mdi-chat-processing</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>