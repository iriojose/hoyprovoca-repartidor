<template>
    <v-bottom-navigation color="#c9242b" fixed v-if="$vuetify.breakpoint.smAndDown">
        <v-btn to="/dashboard">
            <span>Dashboard</span>
            <v-icon color="#232323">mdi-view-dashboard</v-icon>
        </v-btn>
        <v-btn to="/account/profile">
            <span>Perfil</span>
            <v-icon color="#232323">mdi-account</v-icon>
        </v-btn>
        <v-btn to="/dashboard/chats">
            <span>Chats</span>
            <v-icon color="#232323">mdi-chat-processing</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>