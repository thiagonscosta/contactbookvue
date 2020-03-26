<template>
    <v-content>
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="200"
        >
            <v-card
                class="text-center"
                color="teal"
                dark
            >
                <v-card-text class="text-center">
                    Please stand by
                </v-card-text>

                <v-progress-circular
                    indeterminate
                    color="white"
                    class="my-3"
                ></v-progress-circular>
            </v-card>
        </v-dialog>
    </v-content>
</template>

<script>
export default {
    name: 'dialog-load',

    data () {
        return {
            dialog: false
        }
    },

    created () {
        this.$bus.$on('loading', (e) => {
            this.dialog = e
        })
    }
}
</script>