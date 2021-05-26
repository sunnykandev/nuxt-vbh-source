<template>
    <v-dialog v-model="show" width="500">
        <v-form v-model="form_valid" @submit.prevent="register">
            <v-card>
                <v-card-title class="login_headline">
                <h2 class="mt-4 mb-0">Sign up</h2>
                <p class="mb-0">Already signed up? <span class="alt_sign primary--text" @click="login_alt">Sign in</span> please.</p>
                </v-card-title>
                <v-card-text>      
                    <v-text-field 
                    v-model="fullname" :rules="nameRules" :counter="30" required label="Full Name" outlined dense></v-text-field>                
                    <v-text-field v-on:keyup="check_email" v-model="email" type="email" label="Email" :rules="emailRules" outlined dense></v-text-field>          
                    <v-text-field v-on:keyup="check_username" v-model="username" :rules="nameRules" :counter="30" required label="Username" outlined dense></v-text-field>
                    <v-text-field v-model="password" type="password" label="Password" outlined dense required></v-text-field>
                    <v-text-field v-model="confirm_password" type="password" label="Confirm Password" :rules="passwordRules" outlined dense required></v-text-field> 
                    <v-radio-group
                        v-model="gender"
                        row
                        mandatory
                        >
                        <v-radio
                            label="Female"
                            value="F"
                        ></v-radio>
                        <v-radio
                            label="Male"
                            value="M"
                        ></v-radio>
                    </v-radio-group>               
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" class="px-4 mb-4 mr-3" rounded color="primary" elevation="0" :loading=this.signup_btn_loading>Sign up</v-btn>
                </v-card-actions>
                <v-card-text class="login_card_footer">
                    Protected by reCAPTCHA and subject to the Google <a>Privacy Policy</a> and <a>Terms of Service</a>
                </v-card-text>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
    data(){
        return{
            rules: {
            required: value => !!value || 'Required.',
            counter: value => value.length <= 20 || 'Max 20 characters',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
            },
            signup_btn_loading:false,
            form_valid:true,
            show:false,
            username:'',
            fullname:'',
            email:'',
            password:'',
            confirm_password:'',
            gender:'F',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],            
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => this.password==this.confirm_password || "Passwords don't match",                
            ],
        }
    },
    created: function(){
        this.$store.watch(state =>state.global.signup_popup, ()=>{
            this.show = this.$store.state.global.signup_popup            
        })
    },
    watch: {
        show: function (newshow, oldshow) {
            this.signupPopup(newshow)
        }
    },
    methods:{
        async check_email(){
            const email_result = await this.$axios.post('dj-rest-auth/registration/', {
                gender:this.gender,
                username: this.username,
                email: this.email,
                password1: this.password,
                password2:this.confirm_password
            })
            if(email_result) alert('sssss')
        },

        async check_username(){
            alert('sss')
        },
        login_alt(){
            this.signupPopup(false)
            this.loginPopup(true)
        },
        async register() {      
            this.signup_btn_loading = true
            if(!this.form_valid){
                this.signup_btn_loading = false
                return
            }
            try {
                await this.$axios.post('dj-rest-auth/registration/', {
                    gender:this.gender,
                    username: this.username,
                    email: this.email,
                    password1: this.password,
                    password2:this.confirm_password
                })

                await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    },
                })                
                this.$router.push('/')
            } catch (e) {                                                            
                this.signup_btn_loading = false
            }
        },
        ...mapMutations({
            signupPopup:'global/signupPopup',
            loginPopup:'global/loginPopup'
        })
    }  
}
</script>