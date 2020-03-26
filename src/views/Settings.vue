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

                <v-toolbar-title>Settings</v-toolbar-title>
            </v-app-bar>
        </v-sheet>
    </v-content>
</template>

<script>
export default {
    name: 'settings',

    methods: {
        back () {
            this.$router.back()
        }
    }
}
</script>