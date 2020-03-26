<template>
    <v-content>
        <v-sheet>
            <v-app-bar
                color="teal"
                dark
            >
                <v-btn icon
                    @click="back()"
                >
                    <v-icon>mdi-chevron-left</v-icon>    
                </v-btn>

                <v-toolbar-title>Profile</v-toolbar-title>
            </v-app-bar>
        </v-sheet>
        
        <v-container>
            <v-row 
                align="center"
                justify="center">
                <v-col 
                    md="5"
                >
                    <v-sheet elevation="2">
                        <form-user-profile />
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
        
        
    </v-content>
</template>

<script>
import FormUserProfile from '@/components/FormUserProfile'

export default {
    name: 'user-profile',   

    components: {
        FormUserProfile
    },

    computed: {
        status () {
            return this.$store.getters.getStatus
        }    
    },

    methods: {
        back () {
            this.$router.back()
        }
    },

    created () {
        // console.log('status', this.status)
        // console.log('contacts status', this.$store.getters.listContactsStatus)
    }
}
</script>