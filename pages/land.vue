<template>
    <div>
        <v-container class="full">
            <v-row class="section header_image_section" :style="{background:'url('+land_contents.header_image+') center no-repeat', backgroundSize:'cover'}">
                <v-container>
                    <div class="header_title_container">
                        <center>
                            <h1 class="header_title">{{land_contents.header_title}}</h1>
                            <p v-html="makeLineBreak(land_contents.header_content)" class="header_text"></p>
                        </center>                        
                    </div>  
                </v-container>                    
                
                <div class="header_banner">
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="4" md="4" lg="4" class="header_banner_item" style="background:#097cea61;">
                                <div class="icon_container">
                                    <LandSvg width="60px" height="60px" viewBox="0,0,400,400"/>
                                </div>                                
                                <div class="text_container" style="text-align:left;">
                                    <h5 class="item_title">Your Land</h5>
                                    <p class="item_subtitle">Your Land Information</p>
                                </div>
                            </v-col>

                            <v-col cols="12" sm="4" md="4" lg="4" class="header_banner_item secondary_step">
                                <div class="icon_container">
                                    <HomeCare width="60px" height="60px" viewBox="0,0,400,400"/>
                                </div>                                
                                <div class="text_container" style="text-align:left;">
                                    <h5 class="item_title">Home Owner</h5>
                                    <p class="item_subtitle">Equity Responsibility</p>
                                </div>
                            </v-col>

                            <v-col cols="12" sm="4" md="4" lg="4" class="header_banner_item secondary_step">
                                <div class="icon_container">
                                    <DesignSvg width="60px" height="60px" viewBox="0,0,400,400"/>
                                </div>                                
                                <div class="text_container" style="text-align:left;">
                                    <h5 class="item_title">Customize Home</h5>
                                    <p class="item_subtitle">To Your Liking</p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>    
                </div>          
                <v-container>
                    <v-row>
                    </v-row>
                </v-container>
            </v-row>
            <v-row>
                <v-container>
                    <center>
                        <h1 class="section_title primary--text">
                            Just a Few Questions
                        </h1>
                      
                    <v-card
                    v-for="(question,i) in questions"
                    :key="i"
                    class="question_card"
                    v-bind:class="{checked:question.check_value}"
                    >
                        <div class="question_container">                            
                            <h3 class="question_text">    
                                <v-icon left style="font-size:30px;">mdi-help-circle-outline</v-icon>                            
                                {{question.title}}
                            </h3>
                            <v-spacer></v-spacer>
                            <v-btn 
                            v-if="question.check"
                            outlined rounded class="px-4 mx-2 answer_button"  color="dimgrey" elevation="0"> 
                                <v-checkbox
                                v-model="question.check_value"
                                color="success"
                                label="Yes"
                                v-on:change="questionCheckedChanged($event, i)"
                                ></v-checkbox>
                            </v-btn>
                            <v-text-field
                                class="answer_text_input"
                                :value="question.amount_value"
                                v-if="question.amount && questionAmountShow(i)"
                                label="How much?"
                                outlined
                                dense
                                type="number"
                                style="max-width:145px;"
                                @input="questionAmountChanged($event,i)"
                            ></v-text-field>
                        </div>                                            
                    </v-card>


                    <v-btn 
                    @click="saveLand"
                    large class="px-7 mx-2 my-8" rounded color="primary" elevation="0" style="text-transform:none;">                           
                        Save and Go on
                        &nbsp
                        <v-icon left style="font-size:25px;">mdi-arrow-right</v-icon>
                    </v-btn>
                    </center>                 
                </v-container>
            </v-row>

            <v-row>
                <v-container class="contact_section">
                    <div class="d-flex contact_content">
                        <div style="padding: 25px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;">
                            <h1 class="mb-7" style="color:white; font-size:38px;">Need Personal Help? We're Here!</h1>
                            <v-btn large class="px-7 mx-2 contact_button" elevation="0"> 
                                Contact Us
                            </v-btn>
                        </div>
                    </div>                    
                </v-container>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import LandSvg  from '~/components/custom_icons/LandSvg'
import DesignSvg  from '~/components/custom_icons/DesignSvg'
import HomeCare  from '~/components/custom_icons/HomeCare'
import {mapMutations} from 'vuex'

export default {
    data: () => ({
        land_contents:{},
        change_count:0,
        land_own:false,
        land_gifted:false,
        land_on_contract:false,
        land_searching:false,
        land_contract_amount:0,
        land_searching_amount:0,
        questions:[]
    }),
    components: {
        LandSvg,
        HomeCare,
        DesignSvg
    },
    watch: {
        change_count: function (new_resps, old_resps) {
            let temp_cost=0
            this.questions.forEach(question => {
                temp_cost=temp_cost+parseInt(question.amount_value)
            });
            this.changeLandCost(temp_cost)
        }
    },
    mounted() {
        this.fetchPageContents()
        this.getQuestions()
        this.change_count++
    },
    computed:{
        questionAmountShow(){
            return i=>{
                let temp_change_count = this.change_count
                let temp_value = temp_change_count
                return this.questions[i].check_value
            }
        },
    },
    
    methods:{
        async fetchPageContents(){
            let res = await this.$axios.get('/api/pagecontents/allpages')
            console.log(res.data.data)
            let page_data = [...res.data.data]
            this.savePageContents(page_data)
            page_data.forEach((element,i) => {
                if(element.pageName == 'land'){
                this.land_contents = {...page_data[i].pageContents}
                }
                if(element.pageName == 'homepage'){
                this.homepage_contents = {...page_data[i].pageContents}
                }
            });
        },
        async getQuestions() {
            if(this.$store.state.localStorage.land_information.length){
                this.questions = JSON.parse(JSON.stringify(this.$store.state.localStorage.land_information))
                let res = await this.$axios.get('/api/user/mylandinfo')
                console.log(res.data.data)
            }else if(this.$auth.loggedIn){
                let res = await this.$axios.get('/api/user/mylandinfo')
                console.log(res.data.data)
                if(res.data.data.landInfo){
                    this.questions = res.data.data.landInfo
                }else{
                    this.getNewQuestions()
                }
            }else{
                this.getNewQuestions()
            }
        },
        async getNewQuestions(){
            let res = await this.$axios.get('/api/land/questions')
            console.log(res.data.data)
            this.questions = JSON.parse(JSON.stringify(res.data.data))
            this.questions.forEach(element => {
                element.check_value = false
                element.amount_value = 0
            });
        },
        questionCheckedChanged:function(event,i){
            if(event){
                this.questions.forEach(question => {
                    if(question.parent == this.questions[i].parent){
                        question.check_value = false
                        question.amount_value = 0
                    }
                });
                this.questions[i].check_value = event
            }else{
                this.questions[i].check_value = false
                this.questions[i].amount_value = 0
            }
            this.change_count++
        },
        questionAmountChanged(event, i){
            this.questions[i].amount_value = event
            this.change_count++
        },
        saveLand:function(){
            this.saveLandInfo(this.questions)
            this.$router.push("/home_owner_equity_responsibility")
        },
        makeLineBreak(str){
            if(str){
                return str.replace(/(?:\r\n|\r|\n)/g, '<br/>')
            }else{
                return ""
            }
        },
        ...mapMutations({
            saveLandInfo:'localStorage/changeLandInformation',
            changeLandCost:'localStorage/changeLandCost',
            savePageContents:'localStorage/savePageContents',
        })
    }
}
</script>
<style>
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
    .header_image_section{
        position:relative;
        /* background: url("https://classichomesofmaryland.com/wp-content/uploads/2021/01/lockland-2600x800-aerial-scaled-2600x800_c.jpg") center no-repeat; */
        background-size: cover !important;  
        padding-bottom: 100px;
    }

    .header_banner{        
        position: absolute;
        width: 100%;
        bottom: 0px;
        background: #1b60a291;
    }
    .header_banner .item_title{
        font-size: 20px;
        font-weight: 500;
    }
    .header_banner .item_subtitle{
        font-size: 16px;
    }
    .header_banner_item{
        padding-top: 22px;
        display: flex;
        justify-content: center;
    }
    .header_banner_item{
        color: white;
    }
    .header_banner_item svg{
        fill:white;
    }
    .icon_container{
        margin-right: 20px;
    }
    .header_title_container{
        color: white;
        padding-top: 100px;
    }
    .header_title{
        font-size: 44px;
        margin-bottom: 30px;
        text-shadow: 0 2px 2px rgb(0 0 0 / 50%);
    }
    .header_text{
        font-size: 19px;
        max-width: 82%;
        text-shadow: 2px 2px 2px rgb(0 0 0 / 50%);
    }
    .section_title{
        font-size: 44px;
    }

    .question_card{
        max-width: 850px;
        padding: 20px;
        border-radius: 20px !important;
        border: solid 1px #c7c7c7 !important;
        margin-top: 20px;
        margin-bottom: 20px;
        background:#f7f7f7 !important;
    }
    .question_container{
        align-items: center;
        display: flex;
        flex-wrap: wrap;
    }
    .question_container button{
        background:white;
        padding-top: 1px;
        text-transform: none;
    }
    .question_card.checked{
        border: solid 2px #4caf50 !important;
    }
    .question_card .v-text-field .v-input__control{
        height: 40px;
        background:white;
    }
    .section_question_mark{
        background: white;
        border-radius: 500px;
        width: 172px;
        border: solid 4px #0b486d;
    }
    .contact_section::before{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #08436d;
        opacity: 0.8;
    }

    .contact_section{
        position: relative;
        background: url(https://classichomesofmaryland.com/wp-content/uploads/2021/01/lockland-2600x800-aerial-scaled-2600x800_c.jpg) no-repeat;
        border-radius: 15px;
        overflow: hidden;
    }

    .contact_content{
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .contact_button{
            background-color: white !important;
            color: #0b4c73;
            font-size: 17px !important;
            font-weight: 700 !important;
    }

    @media(max-width:600px){
        .header_title_container{            
            padding-top: 60px;
        }
        .header_banner .secondary_step{
            display: none;
        }
        .header_image_section{
            padding-bottom: 62px;
        }
        .section_title {
            font-size: 25px;
        }
        .question_container{
            display: block;
            text-align: left;
            overflow: hidden;
        }
        .question_text{
            margin-bottom: 20px;
        }
        .answer_button{
            float: right;
        }
        .answer_text_input{
            float: right;
        }
        .header_text{
            display: none;
        }
        .header_title{
            font-size: 32px;
        }
    }
   
</style>

