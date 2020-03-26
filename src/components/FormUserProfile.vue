<template>
    <v-content
        class="mx-9 py-6"
    >
        <form>
            <v-text-field
                label="Username"
                v-model="username"
                prepend-icon="mdi-account"
                :readonly="is_readonly"
            >{{ user.username }}</v-text-field>

            <v-text-field
                label="Phone"
                v-model="phone"
                prepend-icon="mdi-phone"
                :readonly="is_readonly"
            >{{ user.phone }}</v-text-field>

            <v-text-field
                label="E-mail"
                v-model="email"
                prepend-icon="mdi-email"
                :readonly="is_readonly"
            >{{ user.email }}</v-text-field>

            <div class="text-center" v-if="is_readonly">
                <v-btn 
                    tile dark color="teal" 
                    style="width:90%" class="my-5"
                    @click="enableEdit()" 
                >
                    Edit
                </v-btn>
            </div>

            <div v-if="!is_readonly">
                <v-btn
                    tile dark color="teal"
                    class="float-left my-5" 
                    @click="cancelEdit()"
                >
                    <v-icon>mdi-close</v-icon>
                    Cancel
                </v-btn>
                
                <v-btn
                    tile dark color="teal" 
                    class="float-right my-5"
                    @click="saveEdit()"
                >
                    Confirm
                    <v-icon>mdi-check</v-icon>
                </v-btn>
            </div>
            
        </form>
    </v-content>
</template>

<script>
export default {
    name: 'form-user-profile',

    data () {
        return {
            username: null, 
            phone: null,
            email: null,
            image: null,

            is_readonly: true,

            is_loading: false
        }
    },

    computed: {
        user () {
            return this.$store.getters.getUser
        }
    },

    created () {
        this.username = this.user.username
        this.phone = this.user.phone
        this.email = this.user.email
        this.image = this.user.image
    },

    methods: {
        enableEdit () {
            this.is_readonly = false
        },

        cancelEdit () {
            this.is_readonly = true
        },

        saveEdit () {

        }
    }
}
</script>