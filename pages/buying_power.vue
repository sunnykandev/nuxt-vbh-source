<template>
  <div>
      <v-container class="full">
          <v-row class="section flesh">
              <v-container>
                  <v-row>
                       <v-col cols="12" sm="12" md="5">
                                <h1 class="section_header">{{power_contents.intro_title}}</h1>
                                <p v-html="makeLineBreak(power_contents.intro_content)" class="section_header_content">
                                </p>

                                <div class="mb-2">
                                    <v-icon left>mdi-arrow-right</v-icon>
                                    <a href="#financing">                                    
                                        {{power_contents.intro_link1}}
                                    </a>
                                </div>
                                
                                <div class="mb-2">
                                    <v-icon left>mdi-arrow-right</v-icon>
                                    <a href="#qualified">                                    
                                        {{power_contents.intro_link2}}
                                    </a>
                                </div>
                                
                                <div class="mb-2">
                                    <v-icon left>mdi-arrow-right</v-icon>
                                    <a href="#qualified">                                    
                                        {{power_contents.intro_link3}}
                                    </a>
                                </div>                                

                                <div class="mb-2">
                                    <v-icon left>mdi-arrow-right</v-icon>
                                    <a href="#calculator">                                    
                                        {{power_contents.intro_link4}}
                                    </a>
                                </div>
                                
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                                <div class="video_container">
                                    <button class="video_play_button">
                                        <svg width="56" height="56" viewBox="0 0 56 56">
                                            <g fill="#fff" fill-rule="evenodd">
                                                <path d="M28 53c13.807 0 25-11.193 25-25S41.807 3 28 3 3 14.193 3 28s11.193 25 25 25zm0 3C12.536 56 0 43.464 0 28S12.536 0 28 0s28 12.536 28 28-12.536 28-28 28z"></path>
                                                <path d="M37.232 27.91L22 36.82V19z"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <video :src="homepage_contents.main_video" class="round" :poster="homepage_contents.main_video_poster" style="object-fit:cover;" controls>
                                    Your browser does not support HTML video.
                                    </video>
                                </div>
                        </v-col>
                  </v-row>                
              </v-container>       
          </v-row>
          <v-row style="position:relative;">
              <div id="financing"></div>
              <v-container>
                  <v-row class="section">
                      <v-col cols="12" sm="12" md="7">
                            <v-img
                            class="shadow_far mt-n20 round"
                            lazy-src="https://na.rdcpix.com/1955954680/b57cb3fe060b4e365f4756e99b2b4287w-c248446xd-w685_h860_q80.jpg"
                            :src="power_contents.finance_image"
                            ></v-img>
                      </v-col>
                      <v-col cols="12" sm="12" md="5">
                            <h1 class="section_header">{{power_contents.finance_title}}</h1>
                            <p v-html="makeLineBreak(power_contents.finance_content)" class="section_header_content">
                            </p>
                            <center>
                                <a href="#qualified">
                                    <v-btn large class="px-7 mx-2" rounded color="primary" elevation="0"> 
                                        <v-icon left style="font-size:30px;">mdi-bank-transfer-out</v-icon> 
                                        &nbsp
                                        Financing
                                    </v-btn>
                                </a>
                                <a href="#steps">
                                    <v-btn large class="px-7 mx-2" rounded color="primary" elevation="0"> 
                                        <v-icon left style="font-size:25px;">mdi-cash-multiple</v-icon> 
                                        &nbsp
                                        Cash
                                    </v-btn>
                                </a>
                            </center>                            
                      </v-col>
                  </v-row>
              </v-container>
          </v-row>

          <v-row style="background:#eceef1; position:relative;">
              <div id="qualified"></div>
              <v-container>
                  <v-row class="section" >                      
                      <v-col cols="12" sm="12" md="6">
                            <h1 class="section_header">{{power_contents.lender_title}}</h1>
                            <p v-html="makeLineBreak(power_contents.lender_content)" class="section_header_content"> 
                            </p>
                            <v-text-field
                                :value="lender_company"
                                @input="changeLenderCompany"
                                background-color="white"
                                label="Type Lender's Company"                               
                                outlined
                            ></v-text-field> 
                            <v-text-field
                                :value="lender_name"
                                @input="changeLenderName"
                                background-color="white"
                                label="Type Lender's Name"                               
                                outlined
                            ></v-text-field> 
                            <p>{{power_contents.lender_letter_content}}</p> 
                            <v-btn
                            text
                            class="d-flex justify-center align-center rounded mb-5"
                            style="width:100%; height:90px; border:dashed 2px #555; text-transform:none !important;"
                            @click="letterBtnClick">
                            <h4>
                                <span v-if="fileName">
                                    <v-icon color="success">mdi-check</v-icon>
                                    {{fileName}}
                                </span>
                                <span v-else>
                                    Upload File
                                </span>
                            </h4>
                            
                            </v-btn>
                            <input
                                ref="letter_uploader"
                                class="d-none"
                                type="file"
                                @change="onLetterChanged"
                            >

                            <v-btn @click="saveLenderData" style="text-transform:none !important" color="primary" rounded>Save Lender Data</v-btn>
                      </v-col>
                      <v-col cols="12" sm="12" md="6" class="d-flex align-center justify-center">
                          <img class="shadow_far round" :src="power_contents.lender_image" alt="">                           
                      </v-col>
                  </v-row>
              </v-container>
          </v-row>

          <v-row style="position:relative;">
              <div id="calculator"></div>
              <v-container>
                  <v-row class="section" >
                      <v-col cols="12" sm="12" md="7" class="d-flex justify-center align-center">
                          <img style="flex:1; max-width:100%;" class="d-flex" :src="power_contents.calc_image" alt="">                           
                      </v-col>

                      <v-col cols="12" sm="12" md="5" class="monthly_calculator">
                            <h1 class="section_header">{{power_contents.calculator_title}}</h1>
                            <p v-html="makeLineBreak(power_contents.calculator_content)" class="section_header_content">
                            </p>
                            <v-text-field
                            v-model="total_invest"
                                label="Total investment"
                                type="number"
                                outlined
                            ></v-text-field>   

                            <v-text-field
                            v-model="total_interest"
                                label="Interest Rate"
                                type.number
                                outlined
                            ></v-text-field>

                            <v-text-field
                            v-model="loan_duration"
                                label="Loan Duration"
                                type="number"
                                outlined
                            ></v-text-field>
                            <v-divider></v-divider>
                            <div class="d-flex align-center mt-5">
                                <span>Monthly Payment</span>
                                <v-spacer></v-spacer>
                                <span style="font-size: 37px;    font-weight: 500;    color: #36b13a;">${{monthlyPay}}</span>
                            </div>
                      </v-col>
                  </v-row>
              </v-container>
          </v-row>

          <v-row style="background:#eceef1;" class="section" id="steps">
              <v-container>
                  <center>
                    <h1 class="section_header">
                        {{homepage_contents.home_steps_title}}
                    </h1>
                    </center> 
                    <v-card>
                        <v-tabs
                        v-model="step_tab"
                        centered
                        fixed-tabs
                        class="step_tabs"
                        >
                            
                            <v-tab class="step_tab first_tab" href="#tab-0">                                
                                <div class="icon_container">
                                    <LandSvg width="50px" height="50px" viewBox="0,0,400,400"/>
                                </div>                                
                                <div class="text_container" style="text-align:left;">
                                    <h5 class="item_title">Your Land</h5>
                                    <p class="item_subtitle">Your Land Information</p>
                                </div>
                            </v-tab>
                            <v-tab class="step_tab" href="#tab-1">                                
                                <div class="icon_container">
                                    <HomeCare width="50px" height="50px" viewBox="0,0,400,400"/>
                                </div>                                
                                <div style="text-align:left;">
                                    <h5 class="item_title">Home Owner</h5>
                                    <p class="item_subtitle">Equity Responsibility</p>
                                </div>
                            </v-tab>
                            <v-tab class="step_tab last_tab" href="#tab-2">                                
                                <div class="icon_container">
                                    <DesignSvg width="50px" height="50px" viewBox="0,0,400,400"/>
                                </div>                                
                                <div style="text-align:left;">
                                    <h5 class="item_title">Customize Home</h5>
                                    <p class="item_subtitle">To your Own Liking</p>
                                </div>
                            </v-tab>                            
                        </v-tabs>

                        <v-tabs-items v-model="step_tab">
                        <v-tab-item
                            v-for="(step, i) in homepage_contents.home_steps"
                            :key="i"
                            :value="'tab-' + i"
                        >
                            <v-card flat>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="7" md="7" lg="7">
                                            <div style="width:100%; background:#aaa;position:relative;">
                                                <img class="d-flex" style="max-width:100%;" :src="step.image" alt="">
                                            </div>
                                        </v-col>
                                        <v-col cols="12" sm="5" md="5" lg="5">
                                            <h3  class="mb-3 mt-5">{{step.title}}
                                            </h3>
                                            
                                            <p v-html="makeLineBreak(step.contents)">
                                            </p>
                                            <div class="d-flex">
                                                <v-btn :to="step.to" outlined class="px-4 mx-2" rounded color="primary" elevation="0">
                                                    <v-icon left style="font-size:20px;">mdi-arrow-right</v-icon>
                                                    {{step.btn}}
                                                </v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-tab-item>
                        </v-tabs-items>
                    </v-card>
              </v-container>
          </v-row>
      </v-container>
  </div>
</template>

<script>
import LandSvg  from '~/components/custom_icons/LandSvg'
import DesignSvg  from '~/components/custom_icons/DesignSvg'
import HomeCare  from '~/components/custom_icons/HomeCare'
import { mutations } from '~/store/global'
import {mapMutations} from 'vuex'

export default {
    data: () => ({
        fileName:"",
        letter:"",
        files:[],
        step_tab:'',
        lender_company:"",
        lender_name:"",
        power_contents:{},
        homepage_contents:{},
        total_invest:"",
        total_interest:"",
        loan_duration:""
    }),

    components: {
        LandSvg,
        HomeCare,
        DesignSvg
    },
    mounted(){
        this.fetchPageContents()
        if(this.$store.state.localStorage.lender_data){
            this.fileName = this.$store.state.localStorage.lender_data.file_name
            this.letter = this.$store.state.localStorage.lender_data.letter
            this.lender_name = this.$store.state.localStorage.lender_data.lender_name
            this.lender_company = this.$store.state.localStorage.lender_data.lender_company
        }
    },
    computed:{
        monthlyPay(){
            if(this.total_invest&&this.total_interest&&this.loan_duration){
                
                let p = parseInt(this.total_invest)
                let i = parseInt(this.total_interest)
                let n = parseInt(this.loan_duration)
                return Math.round(p/[ (1 + i)^n-1]/[ i*(1 + i)^n ])
            }else{
                return ""
            }
        }
    },
    methods:{
        async fetchPageContents(){
        let res = await this.$axios.get('/api/pagecontents/allpages')
        console.log(res.data.data)
        let page_data = [...res.data.data]
        this.savePageContents(page_data)
        page_data.forEach((element,i) => {
            if(element.pageName == 'buying_power'){
            this.power_contents = {...page_data[i].pageContents}
            }
            if(element.pageName == 'homepage'){
            this.homepage_contents = {...page_data[i].pageContents}
            }
        });
        },

        makeLineBreak(str){
            if(str){
                return str.replace(/(?:\r\n|\r|\n)/g, '<br/>')
            }else{
                return ""
            }
            
        },

        onLetterChanged:function(e){
            console.log(e.target.files[0].name)
            this.fileName = e.target.files[0].name
            let reader = new FileReader()
            reader.onload = (re)=>{
                this.letter=re.target.result
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },

        letterBtnClick:function(){
            this.$refs.letter_uploader.click()
        },
        changeLenderCompany(e){
            this.lender_company = e
        },
        changeLenderName(e){
            this.lender_name = e
        },
        saveLenderData(){
            let temp_data = {
                lender_company: this.lender_company,
                lender_name:this.lender_name,
                file_name:this.fileName,
                letter:this.letter
            }
            this.saveLender(temp_data)
        },
        ...mapMutations({
            saveLender:'localStorage/saveLender',
            savePageContents:'localStorage/savePageContents'      
        })
    }
}
</script>

<style>
    html {
    scroll-behavior: smooth;
    }
    .video_play_button{
        position:absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
    }
    video{
        cursor: pointer;
        width: 100%;
        box-shadow: rgb(50 50 93 / 25%) 0px 30px 60px -12px, rgb(0 0 0 / 30%) 0px 18px 36px -18px;
    }
    .video_container{
        position:relative;        
    }
    .v-main__wrap>.container{
        max-width:100% !important;
        padding-left: 0px;
        padding-right: 0px;
        padding-top:0px;
    }

    .container.full{
        max-width: 100% !important;
        padding-top:0px;
    }
    .section{
        padding-top: 50px;
        padding-bottom: 80px;
    }
    .section_header{
        font-size: 40px;
        margin-bottom: 10px;
        color: #292929;
    }
    .section_header_content{
        font-size: 18px;
    }
    .flesh{
        background: #f5ebdd;
    }
    .shadow_far{
        box-shadow: rgb(255 255 255 / 10%) 0px 1px 1px 0px inset, rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px;
    }
    .mt-n20{
        margin-top: -90px;
    }
    .round{
        border-radius: 7px;
        overflow: hidden;
    }
    .v-tabs-bar{
        height: unset;
    }
    .no_padding{
        padding-left: 0px;
        padding-right:0px;
    }
    .step_tab div{
        margin-top: 20px;
        margin-bottom: 20px;    
    }
    .step_tabs .v-tabs-bar__content{
        background: #f7f7f7;
    }
    .step_tabs .v-tab{
        border-right: solid 1px #dadada;
    }
    .step_tabs .last_tab{
        border-right:none;
    }
    .step_tabs .v-tab--active{
        border-top: solid;
        background: white;
        border-bottom: none !important;
    }
    .step_tabs .v-tabs-slider{
        display: none;
    }
    .step_tab svg{
        fill:#909090;
    }
    .step_tabs .v-tab--active svg{
        fill:#0065cd !important;
    }
    .step_tabs .v-tab--active.first_tab{
        border-left:solid 1px #dadada;
    }
    .step_tabs .v-tab--active.last_tab{
        border-right:solid 1px #dadada !important;
    }
    .step_tabs .item_title{
        font-size: 18px;
        margin-top: 6px;
        text-transform: none;
    }
    .step_tabs .item_subtitle{
        font-size: 14px;
        margin-top: 2px;
        text-transform: none;
    }
    .step_tab .icon_container{
        margin-right: 15px;
    }
    .monthly_calculator{
        border: solid 1px #c1c1c1;
        padding: 27px;
        border-radius: 10px;
    }
    #financing{
        position: absolute;
        top: -100px;
        left: 0px;
    }
    #qualified{
        position: absolute;
        top: -100px;
        left: 0px;
    }
    #calculator{
        position: absolute;
        top: -100px;
        left: 0px;
    }
    .no_dec_ancho{
        text-decoration: none;
    }
</style>