<template>
    <v-content
        class="mx-9 py-6"
    >
        <loading />
        
        <!-- STEP 1 -->
        <v-form v-show="step == 1" v-model="isValidOne" ref="form1">
            <v-text-field
                label="Username"
                v-model="username"
                required
                :rules="name_rules"
            ></v-text-field>

            <v-text-field
                label="E-mail"
                v-model="email"
                required
                :rules="email_rules"
            ></v-text-field>

            <v-text-field
                label="Phone"
                v-model="phone"
                required
                v-mask="['(##) ####-####', '(##) #####-####']"
                :rules="phone_rules"
            ></v-text-field>

            <v-btn     
                class="float-right white--text"
                color="teal"
                tile
                @click="step++" 
                :disabled="!isValidOne"
            >
                Next
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </v-form>
        <!-- END STEP 1 -->
    
        <!-- STEP 2 -->
        <v-form v-show="step == 2" v-model="isValidTwo" ref="form2">
            <v-text-field
                label="Password"
                type="password"
                :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                v-model="password"
                :rules="password_rules"
                required
            ></v-text-field>

            <v-text-field
                label="Confirm password"
                type="password"
                v-model="confirm_pass"
                :rules="[confirmPassword]"
                required
            ></v-text-field>

            <div class="mt-5">
                <v-btn 
                    class="float-left" 
                    tile color="teal" dark 
                    @click="step--">
                        <v-icon>mdi-chevron-left</v-icon>
                        Back
                </v-btn>
                <v-btn 
                    class="float-right white--text" 
                    tile color="teal"
                    @click="step++"
                    :disabled="!isValidTwo"
                >
                    Next
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </div>
        </v-form>
        <!-- END STEP 2 -->
        
        <!-- STEP 3 -->
        <div v-show="step == 3">
            <v-row v-show="is_preview" class="justify-content-center">
                <v-col md="6">
                    <v-sheet class="mx-3" height="200">   
                        <img ref="source" :src="objectUrl">
                    </v-sheet>
                </v-col>

                <v-col md="6" class="text-center">
                    <v-avatar size="180" class="avatar">
                        <img :src="preview_cropped">
                    </v-avatar>
                </v-col>
            </v-row>

            <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
                v-model="selected_file"
                @change="setupCropper"
            ></v-file-input>

            <div>
                <v-btn 
                    class="float-left" 
                    tile color="teal" dark 
                    @click="step--"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                    Back
                </v-btn>
                <v-btn 
                    class="float-right" 
                    tile color="teal" dark 
                    @click="step++"
                >
                    Next
                    <v-icon>mdi-chevron-right</v-icon>    
                </v-btn>
            </div>
        </div>
        <!-- END STEP 3 -->

        <!-- STEP 4, LAST STEP -->        
        <div v-if="step == 4" >
            <form
                @submit.prevent="register"
                novalidate
                ref="form4"
            >
                <div class="text-center">
                    <v-avatar v-if="image" size="180" class="avatar">
                        <img :src="avatar">
                    </v-avatar>
                    <v-avatar v-if="!image" size="180" color="teal">
                        <span class="white--text font-weight-bold display-2 text-uppercase">
                            {{ getInitials }}
                        </span>
                    </v-avatar>
                </div>
                
                <v-text-field v-model="username" label="Username" readonly>
                    {{ username }}
                </v-text-field>

                <v-text-field v-model="email" label="E-mail" readonly>
                    {{ email }}
                </v-text-field>

                <v-text-field v-model="phone" label="Phone" readonly>
                    {{ phone }}
                </v-text-field>

                <div >
                    <v-btn 
                        tile color="teal" dark 
                        @click="reset()"
                        class="float-left"
                    >
                        <v-icon small>mdi-close</v-icon>    
                        <span style="font-size:.8rem">Cancel</span>
                    </v-btn>
                    <!--  -->
                    <v-btn 
                        type="submit"
                        tile color="teal" dark 
                        class="float-right"
                    >
                        <span style="font-size:.8rem">Confirm</span>
                        <v-icon small>mdi-check</v-icon>    
                    </v-btn>
                </div>
            </form>
            
            <v-card color="red" class="mt-12 text-center" v-if="submit_error">
                <div class="d-inline-flex white--text error-alert py-2">
                    <v-avatar color="white" size="28">
                        <v-icon color="red">
                            mdi-exclamation-thick
                        </v-icon>
                    </v-avatar>
                    <span class="mt-auto mb-auto ml-2 error-alert">{{ submit_error_message }}</span>
                </div>
            </v-card>
        </div>

        <!-- END 4 STEP -->

    </v-content>
</template>

<script>
import Cropper from 'cropperjs'
import debounce from 'lodash/debounce'
import Loading from '@/components/Loading.vue'

export default {
    name: 'form-register',

    components: {
        Loading
    },

    data () {
        return {
            step: 1,
            show_pass: false, 

            isValidOne: true,
            isValidTwo: true,
            isValidThree: true,
            isValidFour: true,

            // rules validations
            name_rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            email_rules: [
                value => !!value || 'Required.',
                value => /.+@.+/.test(value) || 'E-mail must be valid',
            ],
            phone_rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            password_rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],
  
            // user data
            username: null,
            email: null,
            phone: null,
            password: null,
            image: null,

            // confirm password
            confirm_pass: null,

            // avatar preview 
            avatar: null,

            // image cropper
            selected_file: null,
            is_preview: false,
            filename: null,
            cropper: null,
            objectUrl: null,
            preview_cropped: null,
            debouncedUpdatePreview: debounce(this.updatePreview, 257),

            // loading progress
            loading: false,

            submit_error: false,
            submit_error_message: null
        }
    },

    computed: {
        confirmPassword () {
            return () => (this.password === this.confirm_pass || 'Password must match')
        },

        getInitials () {
            if (this.username) {
                let names = this.username.split(" ", 2)
            
                let initials = ""

                for (let i = 0; i < names.length; i++) {
                    initials += names[i][0]
                }

                return initials.toUpperCase()
            } else 
                return null
        },

        loggedIn () {
            return this.$store.state.auth.status.loggedIn;
        }

    },

    methods: {

        setupCropper (selectedFile) {

            if (selectedFile) 
                this.filename = selectedFile.name

            if (this.cropper) {
                this.cropper.destroy()
            }

            if (this.objectUrl) {
                window.URL.revokeObjectURL(this.objectUrl)
            }

            if (!selectedFile) {
                this.cropper = null
                this.objectUrl = null
                this.preview_cropped = null
                this.is_preview = false
                return
            }

            this.objectUrl = window.URL.createObjectURL(selectedFile)
            this.$nextTick(this.setupCropperInstance)
        },

        setupCropperInstance () {
            this.cropper = new Cropper(this.$refs.source, {
                aspectRatio: 1,
                crop: this.debouncedUpdatePreview
            })

            this.is_preview = true
        },

        updatePreview () {
            const canvas = this.cropper.getCroppedCanvas()
            this.preview_cropped = canvas.toDataURL('image/png')

            if (this.preview_cropped && this.filename)  {
                this.image = this.dataUrlToFile(this.preview_cropped, this.filename)
                this.avatar = window.URL.createObjectURL(this.image)
            }
            
        },

        dataUrlToFile (data, filename) {
            var arr = data.split(',')
            var mime = arr[0].match(/:(.*?);/)[1]
            var bstr = atob(arr[1])
            var n = bstr.length
            var u8arr = new Uint8Array(n)

            while(n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }

            return new File([u8arr], filename, {type:mime})
        },

        register () {
            this.startLoading()
         
            let formData = new FormData()
            formData.append('username', this.username)
            formData.append('email', this.email)
            formData.append('phone', this.phone)
            formData.append('password', this.password)
            formData.append('user_image', this.image)

            let credentials = {
                email: this.email,
                password: this.password
            }

            this.$store.dispatch('register', formData)
                .then(() => {
                    this.submit_error = false
                    this.$store.dispatch('login', credentials)
                    .then(() => {
                            if(this.loggedIn) {
                                this.reset()
                                this.$router.push('home')
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
                .catch((error) => { 
                    this.submit_error = true
                    if (error.data)
                        this.submit_error_message = error.data
                })
                .finally(() => {
                    this.stopLoading()
                })
        },

        startLoading () {
            this.$bus.$emit('loading', true)
        },

        stopLoading () {
            this.$bus.$emit('loading', false)
        },

        reset () {
            this.step = 1 
            this.show_pass = false, 

            this.isValidOne = true,
            this.isValidTwo = true,
            this.isValidThree = true,
            this.isValidFour = true,

            this.filename = null
            this.preview_cropped = null
            this.avatar = null

            this.username = null
            this.email = null
            this.phone = null
            this.password = null 
            this.image = null
            this.confirm_pass = null

            this.$refs.form1.reset()
            this.$refs.form2.reset()
            this.$refs.form4.reset()

            this.submit_error = false
            this.submit_error_message = null
        },

    }
}
</script>

<style lang="scss">
    @import '../../node_modules/cropperjs/dist/cropper.css';

    $teal_color: #009688;

    .avatar {
        border: solid 1px #bbbbbb;
    }

    .error-alert {
        font-size: .8rem;
    }

</style>
