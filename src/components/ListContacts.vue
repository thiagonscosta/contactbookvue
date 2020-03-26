<template>
    <v-content>
        <v-list dense>
            <v-list-item
                v-for="contact in contacts"
                :key="contact.id"
            >
                <v-sheet class="d-inline-flex px-4 py-2 mb-2" width="100%" elevation="2" >
                    <v-list-item-avatar size="60" color="teal">
                    
                        <img 
                            v-if="contact.image_path" 
                            :src="contact.image_path"
                        >

                        <v-icon 
                            v-else 
                            size="60"
                            color="white"
                        >
                            mdi-account
                        </v-icon>

                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="contact.name"></v-list-item-title>
                        <v-list-item-title v-text="contact.phone"></v-list-item-title>
                        <v-list-item-subtitle v-text="contact.email"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-sheet>
                
            </v-list-item>
        </v-list>

        <v-fab-transition>
            <v-btn
                style="bottom: 40px"
                color="teal"
                dark
                absolute
                bottom
                right
                fab
                @click="toCreateContact"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>

    </v-content>
</template>

<script>

export default {
    name: 'list-contacts',

    data () {
      return {
        contacts: [],
      }
    },

    created () {
        this.listContacts()
    },

    methods: {
        toCreateContact () {
            this.$router.push('create_contact')
        },

        listContacts () {
            this.$store.dispatch('allContacts')
                .then(resp => { 
                    this.contacts = resp
                })
        }
    }
}
</script>

<style lang="scss" scoped>
    
    .v-list {
        height: 80vh;
        overflow-y: auto
    }

</style>
