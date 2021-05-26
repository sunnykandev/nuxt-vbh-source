<template>
    <v-row>
        <div class="customize_title">
            {{home.title}}
        </div>

        <v-divider
            style="width:100%;"
            class="ma-4 row"
            inset
        ></v-divider>
        
        <div style="width:100%; display:flex; justify-content:center;">            
            <v-slide-group
            v-model="selected_subdesign"
            class="py-4 customize_plan_slider"
            center-active
            mandatory
            show-arrows
            active-class="customize_slider_selected"
            >
                <v-slide-item
                    v-for="(subdesign,i) in home.subdesigns"
                    :key="i"
                    v-slot="{ active, toggle }"
                >
                    <v-card
                    :color="active ? 'primary' : 'grey lighten-1'"
                    class="mx-2 sub_design_slider_card"
                    @click="toggle"
                    >         
                    <img
                    class="white--text  customize_slider_card_img"
                    :src="subdesign.main_image"
                    >      
                    <v-row
                        class="fill-height"                    
                    >                    
                        <v-scale-transition>
                        <v-icon
                            class="customize_slider_selected_icon"
                            style="background:#1cd04b; border-radius:100px;padding:4px;"
                            v-if="active"
                            color="white"
                            size="35"
                            v-text="'mdi-check-bold'"
                        ></v-icon>
                        </v-scale-transition>
                    </v-row>
                    </v-card>
                </v-slide-item>
            </v-slide-group>            
        </div>            
        
        

        <div v-if="home.subdesigns" style="width:100%;" class="sub_design_detail_container">
            <div class="customize_slider_title">
                <span>
                    {{home.subdesigns[selected_subdesign].title}}
                </span>
            </div>
            <div class="customize_info_container">
                <div class="d-flex justify-center">
                    <div class="customize_info_item_content">
                        <AreaSvg width="40px" height="40px" viewBox="0,0,400,400"/>
                        {{home.subdesigns[selected_subdesign].size}} sqft
                    </div>
                    <div class="customize_info_item_content">
                        <BedSvg width="40px" height="40px" viewBox="0,0,400,400"/>
                        {{home.subdesigns[selected_subdesign].beds}}
                    </div>
                    <div class="customize_info_item_content">
                        <BathSvg width="40px" height="40px" viewBox="0,0,400,400"/>
                        {{home.subdesigns[selected_subdesign].baths}}
                    </div>
                    <div class="customize_info_item_content">
                        <GarageSvg width="40px" height="40px" viewBox="0,0,400,400"/>
                        {{home.subdesigns[selected_subdesign].garage}}
                    </div>
                </div>            
            </div>
            <div v-viewer="viewer_options" class="row images clearfix d-flex mt-5" style="justify-content:center;">
                <template v-for="{src} in home.subdesigns[selected_subdesign].images">
                    <img :src="src" :data-source="src" class="viewer_item_image" :key="src" :alt="src.split('?image=').pop()">
                </template>
            </div>
        </div>
        

        

        <div style="width:100%;">
            <div class="customize_slider_title mt-10">Customize your Home to Your Liking!</div>
        </div>
        <div style="width:100%;" >
            <v-stepper v-model="current_step" vertical>
                <v-stepper-step :complete="current_step > 1" step="1" editable>
                    Exterior Styling
                    <small>Step Description</small>
                </v-stepper-step>
                <v-stepper-content
                step="1"
                >
                    <ExteriorPlanStep
                    v-if="home.subdesigns"
                    :styles="home.subdesigns[selected_subdesign].styles"
                    :changeStyle="changeStyle"
                    :selected_style="selected_style"
                    />
                    <v-sheet class="d-flex my-5">
                        <v-spacer></v-spacer>
                        <v-btn rounded text>Cancel</v-btn>
                        <v-btn
                            rounded
                            color="primary"
                            @click="nextStep(1)"
                        >
                            Continue
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-sheet>
                </v-stepper-content>

                <v-stepper-step :complete="current_step > 2" step="2" editable>
                    Additional Options
                    <small>Step Description2</small>
                </v-stepper-step>
                <v-stepper-content
                step="2"
                >
                    <AdditionalOptions
                    v-if="home.options"
                    :prop_options="additional_options_prop"
                    :changeOptionCheck="changeOptionCheck"
                    :changeOptionAmount="changeOptionAmount"
                    :changeOptionSelect="changeOptionSelect"
                    :cancelOption="cancelOption"
                    :baseprice="home.baseprice"
                    />
                </v-stepper-content>
            </v-stepper>
            <v-sheet class="d-flex my-10">
                <v-spacer></v-spacer>                            
                <v-btn
                    v-if="home!={}"
                    fab
                    small
                    color="primary"
                    class="mx-3"
                    @click="addFavorite(home.id)"
                >
                    <v-icon 
                    v-if="$store.state.localStorage.favorite_homes.includes(home.id)"
                    dark>
                        mdi-heart
                    </v-icon>
                    <v-icon 
                    v-else
                    dark>
                        mdi-heart-outline
                    </v-icon>
                </v-btn>
                <v-btn
                    rounded
                    color="primary"
                    class="mx-3"
                    @click="saveCustomization"
                >
                <span v-if="isSaved">
                    <v-icon>mdi-check</v-icon>
                </span>
                <span v-else>
                    Save Customization
                </span>
                </v-btn>
                <v-spacer></v-spacer>
            </v-sheet>
        </div>
        <v-dialog v-model="submitModal" width="450">
            <v-card>
                <v-card-title class="login_headline">
                <h3 class="mt-4">Its time to submit your work so far.</h3>
                </v-card-title>
                <v-card-text>    
                    <div v-if="$store.state.localStorage.lender_data" class="submit_modal_div">
                        <h4>Lender Data</h4>
                        <h5>Lender Company: <span class="option_card_price">{{$store.state.localStorage.lender_data.lender_company}}</span></h5>
                        <h5>Lender Name: <span class="option_card_price">{{$store.state.localStorage.lender_data.lender_name}}</span></h5>
                        <h5>Pre-Approval Letter: <span class="option_card_price">{{$store.state.localStorage.lender_data.file_name}}</span></h5>
                        <v-divider></v-divider>
                    </div>
                    <div v-if="$store.state.localStorage.land_information.length"  class="submit_modal_div">
                        <h4>Cost for Land</h4>
                        <h5><span class="option_card_price">${{landCost}}</span></h5>
                        <v-divider></v-divider>
                    </div>
                    <div v-if="$store.state.localStorage.resp_information.length"  class="submit_modal_div">
                        <h4>Cost for Home Owner Equity Responsibilities</h4>
                        <h5><span class="option_card_price">${{respCost}}</span></h5>
                        <v-divider></v-divider>
                    </div>
                    <div class="submit_modal_div">
                        <h4>Cost for Customized Home : {{home.title}}</h4>
                        <h5><span class="option_card_price">${{$store.state.localStorage.home_cost}}</span></h5>
                        <v-divider></v-divider>
                    </div>
                    <div class="submit_modal_div">
                        <h4>Total</h4>
                        <h5><span class="option_card_price">${{$store.state.localStorage.total_cost}}</span></h5>
                        <v-divider></v-divider>
                    </div>
                    <client-only>
                        <v-text-field
                        v-model="email"
                        v-if="!$auth.loggedIn"
                        class="mt-5"
                        rounded
                        outlined
                        dense
                        label="Email"
                        type="email"
                        :rules="[rules.required, rules.email]"
                        ></v-text-field>
                        <v-text-field
                        v-model="password"
                        v-if="!$auth.loggedIn"
                        rounded
                        outlined
                        dense
                        label="Password"
                        type="password"
                        :rules="[rules.required]"
                        ></v-text-field>

                        <v-text-field
                        v-model="phone"
                        v-if="!$auth.loggedIn"
                        rounded
                        outlined
                        dense
                        label="Phone number"
                        type="text"
                        :rules="[rules.required]"
                        ></v-text-field>
                    </client-only>
                    

                </v-card-text>
                <v-card-actions class="mt-n6">
                    <v-spacer></v-spacer>
                    <v-btn @click="submit" class="px-4 mb-4 mr-3" rounded color="primary" elevation="0">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
        transition="slide-x-reverse-transition"
        v-model="snackbar"
        bottom
        right
        :color="snackbar_color"
        multi-line
        :timeout="2000"
        >
            {{ snackbar_text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                dark
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-row>
</template>

<script>
import ExteriorPlanStep  from '~/components/customizeSteps/ExteriorPlanStep'
import AdditionalOptions  from '~/components/customizeSteps/AdditionalOptions'
import LandStep  from '~/components/customizeSteps/LandStep'
import AreaSvg  from '~/components/custom_icons/AreaSvg'
import BathSvg  from '~/components/custom_icons/BathSvg'
import BedSvg  from '~/components/custom_icons/BedSvg'
import GarageSvg  from '~/components/custom_icons/GarageSvg'
import {mapMutations} from 'vuex'

  export default {
    data: () => ({
        snackbar:false,
        snackbar_color:"",
        snackbar_text:"",
        email:"",
        password:"",
        phone:"",
        rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
        submitModal:false,
        isSaved:false,
        selected_subdesign:0,
        selected_style:0,
        home:{},
      current_step:1,
      steps:3,
      viewer_options: {
        toolbar: true,
        url: 'data-source'
      },
      images:[
          {
              source:"https://lockridgehomes.com/Img.aspx?Path=%2fNewWebArt%2fFloorPlans%2f266%2f2fl_SC.jpg&Width=800",
              thumbnail:"https://lockridgehomes.com/Img.aspx?Path=%2fNewWebArt%2fFloorPlans%2f266%2f2fl_SC.jpg&Width=800"
          },
          {
              source:"https://lockridgehomes.com/Img.aspx?Path=%2fNewWebArt%2fFloorPlans%2f266%2f2fl_SC.jpg&Width=800",
              thumbnail:"https://lockridgehomes.com/Img.aspx?Path=%2fNewWebArt%2fFloorPlans%2f266%2f2fl_SC.jpg&Width=800"
          },
          {
              source:"https://static.wixstatic.com/media/daeae1_090a77881f5e4beab321e36e6934b9d0~mv2.jpg/v1/crop/x_33,y_0,w_1535,h_1020/fill/w_483,h_321,al_c,q_80,usm_0.66_1.00_0.01/pianta-design-cape-cod-living-room.webp",
              thumbnail:"https://static.wixstatic.com/media/daeae1_090a77881f5e4beab321e36e6934b9d0~mv2.jpg/v1/crop/x_33,y_0,w_1535,h_1020/fill/w_483,h_321,al_c,q_80,usm_0.66_1.00_0.01/pianta-design-cape-cod-living-room.webp"
          },
          {
              source:"https://static.wixstatic.com/media/daeae1_99453077f1f7477b961c5c8250b90384~mv2_d_3000_2813_s_4_2.jpg/v1/fill/w_482,h_266,al_c,q_80,usm_0.66_1.00_0.01/Foyer_mine_02.webp",
              thumbnail:"https://static.wixstatic.com/media/daeae1_99453077f1f7477b961c5c8250b90384~mv2_d_3000_2813_s_4_2.jpg/v1/fill/w_482,h_266,al_c,q_80,usm_0.66_1.00_0.01/Foyer_mine_02.webp"
          },
          {
              source:"https://static.wixstatic.com/media/daeae1_864fbb6ea07043dba7189836a2d07d17~mv2.jpg/v1/fill/w_482,h_266,al_c,q_80,usm_0.66_1.00_0.01/pianta-design-Miami-B.webp",
              thumbnail:"https://static.wixstatic.com/media/daeae1_864fbb6ea07043dba7189836a2d07d17~mv2.jpg/v1/fill/w_482,h_266,al_c,q_80,usm_0.66_1.00_0.01/pianta-design-Miami-B.webp"
          },
          {
              source:"https://static.wixstatic.com/media/daeae1_99453077f1f7477b961c5c8250b90384~mv2_d_3000_2813_s_4_2.jpg/v1/fill/w_482,h_266,al_c,q_80,usm_0.66_1.00_0.01/Foyer_mine_02.webp",
              thumbnail:"https://static.wixstatic.com/media/daeae1_99453077f1f7477b961c5c8250b90384~mv2_d_3000_2813_s_4_2.jpg/v1/fill/w_482,h_266,al_c,q_80,usm_0.66_1.00_0.01/Foyer_mine_02.webp"
          }
      ],
    }),

    mounted(){
        console.log("home page mounted")
        this.getHomeData()
        console.log("home data fetched")
    },

    components: {
        AdditionalOptions,
        ExteriorPlanStep,
        LandStep,
        AreaSvg,
        BathSvg,
        BedSvg,
        GarageSvg
    },
    computed:{
        additional_options_prop(){
            if(this.home.options){
                return [...this.home.options]
            }else{
                return []
            }
        },
        landCost(){
            let total = 0
            this.$store.state.localStorage.land_information.forEach(question => {
                total=total+parseInt(question.amount_value)
            });
            return total
        },
        respCost(){
            let total = 0
            this.$store.state.localStorage.resp_information.forEach(question => {
                total=total+parseInt(question.amount)
            });
            return total
        },
    },
    methods:{
        submit(){
            if(this.$auth.loggedIn){
                this.submitHomeData()
            }else{
                this.signupWithHomeData()
            }
        },
        async submitHomeData(){
            try{
                let temp_post_data = {
                    customized_homes:this.$store.state.localStorage.customized_homes,
                    favorite_homes:this.$store.state.localStorage.favorite_homes,
                    home_cost:this.$store.state.localStorage.home_cost,
                    land_cost:this.$store.state.localStorage.land_cost,
                    resp_cost:this.$store.state.localStorage.resp_cost,
                    last_customized_home:this.$store.state.localStorage.last_customized_home,
                    land_information:this.$store.state.localStorage.land_information,
                    resp_information:this.$store.state.localStorage.resp_information,
                }
                let res = await this.$axios.put('/api/auth/submithomedata', temp_post_data)
                console.log(res.data.data)
                this.snackbar_color="success"
                this.snackbar_text="Submit success!"
                this.snackbar=true
                this.submitModal = false
            } catch (e) {                                                            
                alert("Error occured.")
                this.submitModal = false
            }
        },

        async signupWithHomeData(){
            try{
                let temp_post_data = {
                    phone:this.phone,
                    email:this.email,
                    password:this.password,
                    customized_homes:this.$store.state.localStorage.customized_homes,
                    favorite_homes:this.$store.state.localStorage.favorite_homes,
                    home_cost:this.$store.state.localStorage.home_cost,
                    land_cost:this.$store.state.localStorage.land_cost,
                    resp_cost:this.$store.state.localStorage.resp_cost,
                    last_customized_home:this.$store.state.localStorage.last_customized_home,
                    land_information:this.$store.state.localStorage.land_information,
                    resp_information:this.$store.state.localStorage.resp_information,
                }
                let res = await this.$axios.post('/api/auth/signupwithhomedata', temp_post_data)
                console.log(res.data.data)
                this.snackbar_color="success"
                this.snackbar_text="Submit success!"
                this.snackbar=true
                this.submitModal = false
            } catch (e) {                                                            
                alert("Error occured.")
                this.submitModal = false
            }
        },
        calculateHomeCost(){
            let temp_cost = parseInt(this.home.baseprice)
            let chosen_options = this.home.options.filter(function (option) {
                return (option.type == "check"&&option.check)||(option.type == "select" && option.select&&option.select.select_id)||(option.type == "number"&&option.number)||(option.type == "select_number" && option.select&&option.select.select_id&&option.number)
            })
            chosen_options.forEach(option => {
                if(option.type=='number'){
                    temp_cost = temp_cost+ parseInt(option.price)*parseInt(option.number)
                }else if(option.type=='select_number'){
                    temp_cost = temp_cost+ parseInt(option.select.price)*parseInt(option.number)
                }else if(option.type=='select'){
                    temp_cost = temp_cost+ parseInt(option.select.price)
                }else if(option.type=='check'){
                    temp_cost = temp_cost+ parseInt(option.price)
                }
            });
            this.changeHomeCost({cost:temp_cost,id:this.home.id})
        },
        saveCustomization(){
            let temp_options=[]
            this.home.options.forEach(option => {
                let temp_option = {
                    id:option.id,
                    check:option.check,
                    number:option.number,
                    select:option.select
                }
                temp_options.push(temp_option)
            });

            let temp_home = {
                id:this.$route.query.id,
                selected_subdesign:this.selected_subdesign,
                selected_style_title:this.selected_style.title,
                options:temp_options
            }
            this.saveCustomize(temp_home)
            this.isSaved = true
            this.submitModal = true
        },
        nextStep(n){
            if(n==this.steps){
                this.current_step = 1
            }else{
                this.current_step = n + 1
            }
        },
        async getHomeData(){
            let res = await this.$axios.get('/api/home/'+this.$route.query.id)
            console.log(res.data.data)
            this.home = res.data.data
            this.home.options = JSON.parse(this.home.options)
            this.home.subdesigns = JSON.parse(this.home.subdesigns)

            this.$store.state.localStorage.customized_homes.forEach(element => {
                if(element.id==this.$route.query.id){
                    this.selected_subdesign = element.selected_subdesign
                    this.home.subdesigns[element.selected_subdesign].styles.forEach(style => {
                        if(style.title==element.selected_style_title){
                            let temp_categories = []
                            style.parts.forEach(part => {
                                temp_categories.push(part.category)
                            });
                            temp_categories = [...new Set(temp_categories)]
                            style.categories = temp_categories
                            
                            this.selected_style = style
                            return false
                        }
                    });
                    element.options.forEach(option => {
                        this.home.options.forEach(home_option => {
                            if(home_option.id == option.id){
                                home_option.check=option.check
                                home_option.number = option.number
                                home_option.select = option.select
                                return false
                            }
                        });
                    });
                }
            });

            this.calculateHomeCost()
        },
        changeStyle(selected_style){
            this.selected_style = selected_style
        },
        changeOptionCheck(event,title){
            this.home.options.forEach(option => {
                if(option.title==title){
                    option.check = event
                }
            });
            this.calculateHomeCost()
        },
        changeOptionAmount(event, title){
            this.home.options.forEach(option => {
                if(option.title==title){
                    option.number = event
                }
            });
            this.calculateHomeCost()
        },
        changeOptionSelect(event, title){
            this.home.options.forEach(option => {
                if(option.title==title){
                    option.select = event
                }
            });
            this.calculateHomeCost()
        },
        cancelOption(title){
            this.home.options.forEach(option => {
                if(option.title==title){
                    option.select = 0
                    option.check=false
                    option.number=0
                    return false
                }
            });
            this.calculateHomeCost()
        },
        ...mapMutations({
            saveCustomize:'localStorage/saveCustomization',
            changeHomeCost:'localStorage/changeHomeCost',
            addFavorite:'localStorage/addFavorite'
        })
    },
  }
</script>

<style>
    .v-main__wrap>.container{
    }
    .customize_plan_slider .v-slide-group__prev{
        border: solid 1px #ddd;
        border-left: none;
    }
    .customize_plan_slider .v-slide-group__next{
        border: solid 1px #ddd;
        border-right: none;
    }
    .customize_info_container{
        width: 100%;
        text-align: center;
    }
    .customize_title{
        width: 100%;
        text-align: center;
        font-size: 26px;
        font-weight: 800;
        margin-top: 20px;
    }
    .customize_info_item_content{
        display: flex;
        align-items: center;
        margin: 5px;
    }
    .customize_info_item_content img{
        margin-right: 5px;
    }
    .customize_slider_card_img{
        width: 100%;
    }
    .customize_slider_selected_icon{
        position: absolute !important;
        top: 10px;
        right: 10px;
        text-shadow: 2px 2px 4px #0007;
    }
    .customize_slider_title{
        text-align: center;
        font-size: 25px;
        font-weight: 500;
        padding: 15px;
        padding-left: 30px;
        padding-right: 30px;
        line-height: 1.7;
    }
    .theme--light.v-stepper .v-stepper__step--active .v-stepper__label{
        text-shadow: 0px 0px 0px #0e85ff;
    }
    .viewer_item_image {
        width: 150px;
        cursor: pointer;
        margin: 5px;
        display: inline-block;
        border-radius: 5px;
    }
    .sub_design_slider_card{
        width: 400px;
        padding-bottom: 17px;
        overflow: hidden;
    }
    .sub_design_detail_container{
        width: 100%;
        background: #edeff1;
        padding-bottom: 50px;
        padding-top: 16px;
        color: #424242;
        margin-top: 30px;
        border-radius: 10px;
        overflow: hidden;
        border: solid 2px #98aabb;
    }
    .sub_design_detail_container svg{
        fill: #0f5496;
    }
    .v-stepper{
        padding-bottom: 0px;
    }
    .v-stepper__content{
        margin: 0px !important;
        padding: 0px !important;
    }
    .submit_modal_div{
        margin-bottom: 10px;
    }
    @media (max-width: 959px){
        .sub_design_detail_container{
            border-left: none;
            border-right: none;
            border-radius: 0px;
        }
    }
    @media (max-width: 599px){
        .v-slide-group__next, .v-slide-group__prev{
            min-width: 30px !important;
        }
        .sub_design_slider_card{
            width: 280px;
        }
    }
</style>