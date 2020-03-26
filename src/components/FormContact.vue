<template>
    <v-content>
        <div class="text-center mx-9 py-6">
            
            <loading />

            <div class="d-flex flex-column align-center">
                <v-avatar color="teal" size="160" @click="selectImage" v-if="!preview">
                    <v-icon color="white" x-large>mdi-camera-plus</v-icon>   
                </v-avatar>
            
                <v-avatar size="160" v-if="preview">
                    <img :src="preview_img">
                </v-avatar>

                <input type="file" id="input-img" @change="changeImage()" ref="inputImage">

                <v-btn 
                    class="my-4" 
                    color="teal" dark outlined tile 
                    v-if="preview"
                    @click="resetPreview"
                >
                    <v-icon>mdi-delete</v-icon>
                    Delete
                </v-btn>
            </div>
            
            <v-text-field
                label="Name"
                prepend-icon="mdi-account"
                v-model="name"
                :rules="name_rules"
            >
            </v-text-field>
            
            <v-text-field
                label="Phone"
                prepend-icon="mdi-phone"
                v-model="phone"
                v-mask="['(##) ####-####', '(##) #####-####']"
                :rules="phone_rules"
                required
            ></v-text-field>
            
            <v-text-field
                label="E-mail"
                prepend-icon="mdi-email"
                v-model="email"
                :rules="email_rules"
            ></v-text-field>

            <v-btn
                class="my-4"
                color="teal"
                width="70%"
                tile
                dark
                @click="registerContact()"
            >
                Save
            </v-btn>
        </div>
    </v-content>
</template>

<script>
import Loading from '@/components/Loading.vue'
// import ContactService from '@/services/contact.service'
import authHeader from '../services/auth.header'

export default {
    name: 'form-contact',

    components: {
        Loading,
    },

    data () {
        return {
            preview: false,
            preview_img: null,
            filename: null,

            name_rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 2) || 'Min 3 characters',
            ],
            phone_rules: [
                value => !!value || 'Required.',
                value => (value && value.length >= 3) || 'Min 3 characters',
            ],
            email_rules: [
                value => /.+@.+/.test(value) || 'E-mail must be valid',
            ],
            
            name: null,
            phone: null,
            email: null,
            image: null
        }
    },

    methods: {
        selectImage () {
            this.$refs.inputImage.click()
        },

        changeImage () {
            const input = this.$refs.inputImage
            let files = input.files

            if (files && files[0]) {
                const reader = new FileReader()
                
                reader.onload = e => {
                    this.preview_img = e.target.result
                    this.preview = true
                    let filename = files[0].name
                    this.image = this.dataUrlToFile(this.preview_img, filename)
                }
                reader.readAsDataURL(files[0])
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

        resetPreview () {
            this.preview = false
            this.preview_img = null
        },

        registerContact () {
            let formData = new FormData()

            this.startLoading()

            formData.append('name', this.name)
            formData.append('phone', this.phone)
            formData.append('email', this.email)
            formData.append('contact_image', this.image)

            this.axios.post('http://127.0.0.1:3333/contact/register', formData, { headers: authHeader()})
                .then(
                    this.$router.back()
                )
                .catch(error => console.log(error))
                .finally(() => {
                    this.stopLoading()
                    this.resetForm()
                })
        },

        resetForm () {
            this.name = null
            this.phone = null
            this.email = null
            this.image = null

            this.preview = false
            this.preview_img = null
            this.filename = null
        },

        startLoading () {
            this.$bus.$emit('loading', true)
        },

        stopLoading () {
            this.$bus.$emit('loading', false)
        },
    }
}
</script>

<style lang="scss" scoped>
    #input-img {
        width: 0px;
        height: 0px;
    }

    .avatar {
        position: relative;
    }

</style>