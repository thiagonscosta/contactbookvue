<template>
    <v-content>
        
        <loading />

        <form
            class="mx-9 py-6"
            @submit.prevent="userLogin"
            novalidate
        >
            <v-text-field
                v-model="email"
                label="E-mail"
                prepend-inner-icon="mdi-account"
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock"
            ></v-text-field>

            <v-btn
                tile
                block
                dark
                color="teal"
                class="px-9 my-7"
                type="submit"
            >Submit</v-btn>
        </form>
    </v-content>
</template>

<script>
import Loading from '@/components/Loading.vue'

export default {
    name: 'form-login',

    components: {
        Loading
    },

    data () {
        return {
            email: '',
            password: ''
        }
    },

    computed: {
        loggedIn () {
            return this.$store.state.auth.status.loggedIn;
        }
    },

    methods: {

        startLoading () {
            this.$bus.$emit('loading', true)
        },

        stopLoading () {
            this.$bus.$emit('loading', false)
        },

        userLogin () {
            
            let credentials = {
                email: this.email,
                password: this.password
            }

            this.$store.dispatch('login', credentials)
                .then(() => {
                    if (this.loggedIn) {
                        this.$router.push('home')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    this.stopLoading()
                })
        }
    }
}
</script>