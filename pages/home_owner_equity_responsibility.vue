<template>
    <div>
        <v-container class="full">
            <v-row class="section header_image_section" :style="{background:'url('+resp_contents.header_image+') center no-repeat', backgroundSize:'cover'}">
                <v-container style="z-index:1;">
                    <div class="header_title_container">
                        <center>
                            <h1 class="header_title">{{resp_contents.header_title}}</h1>
                            <p v-html="makeLineBreak(resp_contents.header_content)" class="header_text"></p>
                        </center>                        
                    </div>  
                </v-container>                    
                
                <div class="header_banner">
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="4" md="4" lg="4" class="header_banner_item secondary_step">
                                <div class="icon_container">
                                    <LandSvg width="60px" height="60px" viewBox="0,0,400,400"/>
                                </div>                                
                                <div class="text_container" style="text-align:left;">
                                    <h5 class="item_title">Your Land</h5>
                                    <p class="item_subtitle">Your Land Information</p>
                                </div>
                            </v-col>

                            <v-col cols="12" sm="4" md="4" lg="4" style="background:#097cea61;" class="header_banner_item">
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
                            Check Each of Your Responsibilities
                        </h1>
                        <p class="section_subtext">This form is for budgeting purposes only.<br> Ranges are based on averages from past customers and are shown to assist in budgeting.<br>
                         You will be getting
bids for you lot to determine the actual cost.</p>

                        <v-sheet
                        v-for="(category,i) in categories"
                        :key="i"
                        >
                            <div class="question_divider">
                                <h4 class="divider_title">{{category}}</h4>
                                <div class="divider_line"></div>
                            </div>
                            
                            
                            <RespCard
                            v-for="(resp,i) in category_resps(category)"
                            :key="i"
                            :array_key="resp.array_key"
                            :props_resp="resp"
                            :amount="resp.amount"
                            :done="resp.done"
                            :amountChanged="handleRespAmountChanged"
                            :doneChanged="handleRespDoneChanged"
                            />
                        </v-sheet>
                        
                    <div class="mt-10 total_container">
                        <div>
                            <h4 class="primary--text">Total Cost</h4>
                            <h3 class="primary--text">for Home Owner Equity Responsibilities</h3>
                        </div>
                        <v-spacer></v-spacer>
                        <h1 class="success--text">${{total_sum}}</h1>
                    </div>

                    <v-btn @click="saveResp" large class="px-7 mx-2 my-8" rounded color="primary" elevation="0" style="text-transform:none;">                           
                        Save and Go on
                        &nbsp;
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
import RespCard  from '~/components/RespCard'
import {mapMutations} from 'vuex';

export default {
    data(){
        return {
            resp_contents:{},
            change_count:0,
            resps:[],
            temp_resps:[],
            categories:[]
        }
    },
    components: {
        LandSvg,
        HomeCare,
        DesignSvg,
        RespCard
    },
    computed:{
        category_resps(){
            return category=>{
                return this.resps.filter(function (resp) {
                    return resp.category == category
                })
            }
        },
        total_sum(){
            let temp_count = this.change_count
            let total = 0
            this.resps.forEach((resp,i) => {
                total = total + parseInt(resp.amount)
            });
            return total
        },
    },
    created: function(){
            // const store_data = this.$store.getters['global/getresps']
            // this.temp_resps = [...JSON.parse(JSON.stringify(store_data))]
            // this.temp_resps.forEach((element,i) => {
            //     element.array_key = i
            // });
            // this.$store.watch(state =>state.global.resp_total, ()=>{
            //     this.total_sum = this.$store.state.global.resp_total        
            // })
    },
    beforeMount() {
        // this.temp_resps.forEach(resp => {
        //     this.categories.push(resp.category);
        // });
        // this.categories = [...new Set(this.categories)]
    },
    mounted() {
        this.fetchPageContents()
        this.getResponsibilities()
    },
    watch: {
        temp_resps: function (new_resps, old_resps) {
        }
    },
    methods:{
        async fetchPageContents(){
            let res = await this.$axios.get('/api/pagecontents/allpages')
            console.log(res.data.data)
            let page_data = [...res.data.data]
            this.savePageContents(page_data)
            page_data.forEach((element,i) => {
                if(element.pageName == 'resp'){
                    this.resp_contents = {...page_data[i].pageContents}
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
        handleRespAmountChanged(key, value){
            this.change_count++
            if(value){
                this.resps[key].amount = value
            }else{
                this.resps[key].amount = 0
            }
            this.saveTotalAmount()
        },
        saveTotalAmount(){
            let temp_cost = 0
            this.resps.forEach(resp => {
                temp_cost = temp_cost+ parseInt(resp.amount)
            });
            this.changeRespCost(temp_cost)
        },
        saveResp:function(){
            this.saveRespInfo(this.resps)
            this.$router.push("/choose_home")
        },   
             
        handleRespDoneChanged(key, value){
            if(value){
                this.resps[key].done=true
            }else{
                this.resps[key].done = false
            }
            if(value == true) this.resps[key].amount = 0
            this.saveTotalAmount()
            this.change_count++
            console.log(this.resps)
        },
        async getResponsibilities() {
            console.log(this.$store.state.localStorage.resp_information)
            if(this.$store.state.localStorage.resp_information.length){
                this.resps = [...this.$store.state.localStorage.resp_information]
                this.resps.forEach((element,i) => {
                    this.categories.push(element.category)
                });
                this.categories = [...new Set(this.categories)]
            }else if(this.$auth.loggedIn){
                let res = await this.$axios.get('/api/user/myrespinfo')
                console.log(res.data.data)
                if(res.data.data.respInfo.length){
                    this.resps = res.data.data.respInfo
                    this.resps.forEach((element,i) => {
                        this.categories.push(element.category)
                    });
                    this.categories = [...new Set(this.categories)]
                }else{
                    this.getNewResps()
                }
            }else{
                this.getNewResps()
            }
            this.saveTotalAmount()
        },
        async getNewResps(){
            let res = await this.$axios.get('/api/resp/responsibilities')
            this.resps = [...res.data.data]
            this.resps.forEach((element,i) => {
                element.done = false
                element.amount = 0
                element.array_key = i
                this.categories.push(element.category)
            });
            this.categories = [...new Set(this.categories)]
        },
        land_own_change:function(){
            if(this.land_own){
                this.land_gifted=false
                this.land_on_contract=false
                this.land_searching=false
                this.land_contract_amount=0
                this.land_searching_amount=0
            }
        },
        land_gifted_change:function(){
            if(this.land_gifted){
                this.land_own=false
                this.land_on_contract=false
                this.land_searching=false
                this.land_contract_amount=0
                this.land_searching_amount=0
            }
        },
        land_contract_change:function(){
            if(this.land_on_contract){
                this.land_gifted=false
                this.land_own=false
                this.land_searching=false
                this.land_searching_amount=0
            }
        },
        land_searching_change:function(){
            if(this.land_searching){
                this.land_gifted=false
                this.land_on_contract=false
                this.land_own=false
                this.land_contract_amount=0
            }
        },

        ...mapMutations({
            changeResps:'global/changeResps',
            saveRespInfo:'localStorage/changeRespInformation',
            changeRespCost:'localStorage/changeRespCost',
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
        background: url("https://hw.menardc.com/main/store/20090519001/assets/images6/landscape%20materials/Responsive/Hero_REV2.jpg") center no-repeat;
        background-size: cover !important;  
        padding-bottom: 100px;
    }
    .header_image_section::before{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #00000033;
        opacity: 0.9;
    }

    .header_banner{        
        position: absolute;
        width: 100%;
        bottom: 0px;
        background: rgb(27 96 162 / 77%);
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
        text-shadow: 1px 1px 1px rgb(0 0 0 / 50%);
    }
    .section_title{
        font-size: 39px;
        margin-top: 25px;
        margin-bottom: 6px;
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
    .section_subtext{
        font-size: 19px;
    }
    .total_container{
        display: flex;
        align-items: flex-end;
        border-bottom: solid 1px #a7a7a7;
        max-width: 1000px;
        padding-left: 20px;
        padding-right: 20px;
        text-align: left;
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

