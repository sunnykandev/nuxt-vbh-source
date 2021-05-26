<template>
  <div class="d-flex admin_login_back">
        <v-card class="login_card">
            <v-card-title class="login_headline">
              <h2 class="mt-4 mb-0"><span class="primary--text">Admin</span> Sign in</h2>
              <p class="mb-0">If you have no admin account, talk to super admin to add you.</p>
            </v-card-title>
            <v-card-text>                
                <v-text-field v-model="email" label="email" type="email" outlined dense></v-text-field>
                <v-text-field v-model="password" type="password" label="Password" outlined dense></v-text-field>                
            </v-card-text>
            <v-card-actions class="mt-n6 login_action">
                <v-btn class="px-4 mb-7 login_btn" rounded color="primary" elevation="0" @click="login">Sign in</v-btn>
                <p class="error--text">{{error}}</p>
            </v-card-actions>
        </v-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            login_btn_loading:false,
            show:false,
            email:'',
            password:'',
            error:''
        }
    },
    methods:{ 
        async login() {        
            try {
                let response = await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    },
                })
                this.$auth.setUser(response.data.user)
                this.$auth.setUserToken(response.data.token)
                this.password = ''
                this.email = ''
                if(response.status == 200){
                    this.$router.push('/admin');
                }
            } catch (e) {                                 
                console.log(e.response.data.message);
                this.error = e.response.data.message
            }
        }
    } 
}
</script>
<style>
.admin_login_back{
    height: 100%;
    width: 100%;
}
.login_btn{
    width: 100%;
}
.login_card{
    max-width: 500px;
    margin: auto;
    margin-top: 100px;
}
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
.v-card__actions{
    padding: 16px;
}
.login_action{
    flex-direction: column;
}

</style>