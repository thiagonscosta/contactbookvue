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
                    <v-icon>mdi-close</v-icon>    
                </v-btn>

                <v-toolbar-title>Create Contact</v-toolbar-title>
            </v-app-bar>
        </v-sheet>

        <v-container>
            <v-row 
                justify="center"
                align="center"
            >
                <v-col
                    sm="8"
                    md="6"
                    lg="6"
                >   
                    <v-sheet elevation="2" tile>
                        <form-contact />
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
        
    </v-content>
</template>

<script>
import FormContact from '@/components/FormContact.vue'

export default {
    name: 'create-contact',

    components: {
        FormContact
    },

    methods: {
        back () {
            this.$router.back()
        },
    }
}
</script>
