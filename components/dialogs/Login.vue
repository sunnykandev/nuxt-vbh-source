<template>
    <v-dialog v-model="show" width="450">
        <v-card>
            <v-card-title class="login_headline">
              <h2 class="mt-4 mb-0">Sign in</h2>
              <p class="mb-0">Don't you have an account yet? <span class="alt_sign primary--text" @click="sign_up_alt">Sign up</span> for free.</p>
            </v-card-title>
            <v-card-text>                
                <v-text-field 
                :rules="[rules.required, rules.email]"
                v-model="email" label="email" type="email" outlined dense></v-text-field>
                <v-text-field 
                :rules="[rules.required]"
                v-model="password" type="password" label="Password" outlined dense></v-text-field>                
            </v-card-text>
            <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn class="px-4 mb-4 mr-3" rounded color="primary" elevation="0" @click="login" :loading=this.login_btn_loading>Sign in</v-btn>
            </v-card-actions>
            <v-card-text class="login_card_footer">
                Protected by reCAPTCHA and subject to the Google <a>Privacy Policy</a> and <a>Terms of Service</a>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapMutations} from 'vuex'
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
            login_btn_loading:false,
            show:false,
            email:'',
            password:''
        }
    },
    created: function(){
        this.$store.watch(state =>state.global.login_popup, ()=>{
            this.show = this.$store.state.global.login_popup            
        })        
    },
    watch: {
        show: function (newshow, oldshow) {
            this.loginPopup(newshow)
        }
    },
    methods:{ 
        sign_up_alt(){
            this.loginPopup(false)
            this.signupPopup(true)
        },
        async login() {
            this.signup_btn_loading = true            
            try {
                let response = await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    },
                })
                this.$auth.setUser(response.data.user)
                this.$auth.setUserToken(response.data.token)
                this.signup_btn_loading = true
                this.password = ''
                this.email = ''
                this.loginPopup(false)
                this.$store.dispatch('localStorage/getUserData')
                this.$router.push('/')
            } catch (e) {                                                            
                this.signup_btn_loading = false
            }
        },            
        ...mapMutations({
            loginPopup:'global/loginPopup'  ,
            signupPopup:'global/signupPopup'          
        })
    }  
}
</script>

<style>
.login_headline h2{
    width: 100%;
}
.login_headline p{
    font-size: 13px;
    font-weight: 400;
    color: #4c4c4c;
}
.login_card_footer{
    padding-top: 15px !important;
    background: #1c334a;
    color: #abd0f5 !important;
    font-size: 12px !important;
}
.login_card_footer a{
    text-decoration: underline;
    color: white;
}
.alt_sign{
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
}
</style>