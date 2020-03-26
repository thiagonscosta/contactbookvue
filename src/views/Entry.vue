<template>
    <v-content>
        <v-container>
            <v-row
                align="center"
                justify="center"
            >
                <v-col
                    sm="8"
                    md="6"
                    lg="6"
                >
                    <v-sheet elevation="2">
                        <v-tabs
                            background-color="teal"
                            dark
                            grow
                            v-model="tabs"
                        >
                            <v-tab>
                                Login
                            </v-tab>

                            <v-tab>
                                Register
                            </v-tab>

                            <v-tab-item>
                                <form-login />
                            </v-tab-item>

                            <v-tab-item >
                                <form-register />
                            </v-tab-item>

                        </v-tabs>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import FormLogin from '@/components/FormLogin.vue'
import FormRegister from '@/components/FormRegister.vue'

export default {
    
    components: {
        FormLogin,
        FormRegister
    }, 

    data () {
        return {
            tabs: null, 
            isLogin: { type: Boolean },
            isRegister: { type: Boolean }
        }
    },

    mounted () {
        this.isLogin = true
        this.isRegister = false
    },

    methods: {
        showLogin () {
            this.isLogin = true
            this.isRegister = false
        },

        showRegister () {
            this.isRegister = true
            this.isLogin = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to  {
        opacity: 0;
    }


</style>