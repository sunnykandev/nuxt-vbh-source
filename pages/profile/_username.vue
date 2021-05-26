<template>
    <div>
        <div class="profile_background">
            <img :src="`/profile/${background}`" alt="Default avatar" class="">
        </div>
        
        <v-container class="mt-10 profile_card_container">
            <v-card :elevation="0" outlined>                
                <v-row class="ma-0" style="width:100%;">
                    <v-col cols="12" sm="4" md="3" lg="3" xl="3">
                        <img :src="`/profile/${avatar}`" alt="Default avatar" class="profile_avatar">
                    </v-col>
                    <v-btn class="edit_profile_btn d-flex d-sm-none mx-auto" small dense rounded color="primary" elevation="0">
                        <v-icon left>mdi-pencil</v-icon>                                
                        Edit Profile
                    </v-btn>
                    <v-col cols="12" sm="8" md="9" lg="9" xl="9" class="profile_card_content">
                        <div>
                            <v-card-title class="profile_fullname text-xs-center" v-text="fullname"></v-card-title> 
                            <span  class="profile_username text-xs-center">@denisrodeman</span>                                
                            <v-btn class="ma-2 float-right edit_profile_btn d-none d-sm-flex" small dense rounded color="primary" elevation="0">
                                <v-icon left>mdi-pencil</v-icon>                                
                                Edit Profile
                            </v-btn>
                        </div>
                        
                        <v-card-subtitle color="primary--text" class="profile_user_title primary--text text-xs-center">Project manager</v-card-subtitle>
                        <div class="grey--text  text-xs-center" style="font-size: 14px;">
                            <div class="contact_info_item">
                                <v-icon small style="padding-bottom:4px;" class="grey-darken-2--text">mdi-map-marker</v-icon>
                                <span class="contact_info_text" v-text="location"></span>
                            </div>
                            <div class="contact_info_item">
                                <v-icon small style="padding-bottom:4px;" class="grey-darken-2--text">mdi-email</v-icon>
                                <span class="contact_info_text" v-text="email"></span>
                            </div>
                            <div class="contact_info_item">
                                <v-icon small style="padding-bottom:4px;" class="grey-darken-2--text">mdi-phone</v-icon>
                                <span class="contact_info_text" v-text="phone"></span>
                            </div>                            
                        </div>
                        <div class="mt-4 mb-4 profile_static_container">
                            <v-row>
                                <v-col sm="6" md="4" class="pa-1">
                                    <div class="profile_static_number gold--text">10.5K</div>
                                    <span class="profile_static_name">Followers</span>
                                </v-col>
                                <v-col sm="6" md="4" class="pa-1">
                                    <div class="profile_static_number gold--text">10.5K</div>
                                    <span class="profile_static_name">Collected</span>
                                </v-col>                                
                            </v-row>
                            <v-row>
                                <v-col sm="6" md="4" class="pa-1">
                                    <div class="profile_static_number gold--text">10.5K</div>
                                    <span class="profile_static_name">Likes</span>
                                </v-col>
                                <v-col sm="6" md="4" class="pa-1">
                                    <div class="profile_static_number gold--text">10.5K</div>
                                    <span class="profile_static_name">Shared</span>
                                </v-col>                                
                            </v-row>
                        </div>
                        <p class="devider_text">Dominating Tags</p>
                        <v-divider class="light-divider" :light="true"></v-divider>
                        <v-chip-group
                            class="featured_tag_group mt-3"
                            active-class="primary--text"
                            column
                        >
                            <v-chip
                                small
                                v-for="tag in featured_tags"
                                :key="tag"                            >
                                {{ tag }}
                            </v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>         
            </v-card>            
        </v-container>
    </div>
</template>

<script>

export default {
    data(){
        return{
            userid:this.$store.state.profile_page.userid,
            background:this.$store.state.profile_page.background,
            avatar:this.$store.state.profile_page.avatar,
            fullname:this.$store.state.profile_page.fullname,
            username:this.$store.state.profile_page.username,
            title:this.$store.state.profile_page.title,
            featured_tags:this.$store.state.profile_page.featured_tags,
            email:this.$store.state.profile_page.email,
            phone:this.$store.state.profile_page.phone,
            location:this.$store.state.profile_page.location
        }
    },
    components: {

    }
}
</script>

<style>    
    .profile_avatar{
        border-radius: 4px;
        margin: auto;
        width: 100%;
        margin-bottom: -6px;
    }
    .profile_fullname{
        font-size: 1.75rem;
        display: inline-block;
        padding-left: 0px;
        padding-bottom: 4px;
        max-width: 70%;
        white-space: normal;
        word-break: normal !important;
    }
    .v-card__title{
        word-break: normal !important;
    }
    .profile_username{
        font-size: 22px;
        font-weight: 300;
    }
    .profile_user_title{
        font-size: 0.9rem;
        padding-left: 4px;
        padding-top: 4px;        
    }
    .profile_background{
        position: absolute;
        width: 100%;
        left: 0;
        top: 0px;
        height: 200px;
    }
    .profile_background img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }    
    button{
        text-transform: none;
    }
    .profile_static_number{
        min-width: 70px;
        display: inline-block;
        font-weight: 700;
    }
    .profile_static_name{
        font-weight: 500;
    }
    .profile_static_container{
        padding-left: 16px;
    }
    .light-divider{
        border-color: #e6e6e6;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: -10px;
    }
    .devider_text{
        font-size: 11px;
        color: #888;
        margin-bottom: -8px !important;
        display: inline-block;
        background: #fff;
        padding-left: 7px;
        padding-right: 7px;
    }
    .contact_info_item{
            display: inline-block;
            margin-right: 20px;
            padding-bottom: 10px;
    }
    
    @media (min-width: 960px){
        
    }  
    @media (min-width: 1264px){
        
    }  
    @media (max-width: 959px){
        .edit_profile_btn{
            position: absolute !important;
            right: 0 ;
            bottom: 100%;
        }
    } 
    @media (max-width: 599px){
        .profile_fullname{
            max-width: 80% !important;
        }
        .edit_profile_btn{
            position: relative !important;
        }
        .profile_card_content{
            text-align: center;
        }
        .profile_static_number{
            text-align: left;
            min-width: 0px;
            margin-right: 8px;            
        }
        .profile_user_title{
            padding-left: 16px;
        }
        .profile_static_container{
            padding-left: 0px !important;
        }
        .profile_fullname{
            padding-left: 0px;
            padding-right: 0px;
        }
        .profile_card_container{
            padding: 0px;
        }
    }  
</style>