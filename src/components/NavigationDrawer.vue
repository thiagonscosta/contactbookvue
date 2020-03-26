<template>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >   
        <v-list>
            <v-list-item>
                <div flex-colunm>
                    <v-list-item-avatar size="80">
                        <img v-if="user.image_path" :src="user.image_path">
                        <v-icon v-else size="80">mdi-account-circle</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="title">{{ user.username }}</v-list-item-title>
                        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                </div>
            </v-list-item>
           <v-divider></v-divider>
            <v-list-item-group color="primary">
                <v-list-item link to="user_profile">
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="settings">
                    <v-list-item-icon>
                        <v-icon>mdi-settings</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="userLogout()">
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

    </v-navigation-drawer>
</template>

<script>

export default {
    name: 'navigation-drawer',

    data () {
        return {
            drawer: false,
        }
    },

    computed: {
        user () {
            return this.$store.getters.getUser
        }
    },
    
    created () {
        this.$bus.$on('drawer', (e) => {
            this.drawer = e
        });
    },

    methods: {
        userLogout () {
            this.$store.dispatch('logout')
            this.$router.push('/')
        },

    }

    
}
</script>