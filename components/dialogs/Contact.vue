<template>
    <v-dialog v-model="show" width="400">
        <v-card class="pb-4">
            <v-card-title class="login_headline">
              <h2 class="mt-4 mb-3 primary--text" style="text-align:center;">Contact Us</h2>
            </v-card-title>
            <v-card-text>  
                <a href="tel:919-373-6157">
                    <v-btn style="width:100%;" class="my-3" rounded outlined color="primary">
                        Office: (919) 373-6157
                    </v-btn>
                </a>              
                
                <a href="tel:919-777-0133">
                    <v-btn style="width:100%;" class="my-3" rounded outlined color="primary">
                        Fax: (919) 777-0133
                    </v-btn>
                </a>
                
                <a href="https://valuebuildhomes.com/schedule-appointment/" target="_blank">
                    <v-btn style="width:100%; text-transform:none;" class="my-3" rounded color="primary">
                        Schedule Appointment
                    </v-btn>
                </a>
                
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            link:"https://valuebuildhomes.com/schedule-appointment/",
            show:false,
        }
    },
    created: function(){
        this.$store.watch(state =>state.global.contact_popup, ()=>{
            this.show = this.$store.state.global.contact_popup            
        })        
    },
    watch: {
        show: function (newshow, oldshow) {
            this.contactPopup(newshow)
        }
    },
    methods:{      
        ...mapMutations({
            contactPopup:'global/contactPopup'        
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