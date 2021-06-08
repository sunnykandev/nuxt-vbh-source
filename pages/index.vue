<template>
<div>
    <v-row justify="center" align="center" style="position:relative;">
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item,i) in carousel_items"
          :key="i"
          :src="item.image"
          style="background:linear-gradient(to right,rgba(0,0,0,.25) 0,rgba(0,0,0,0) 81%,rgba(0,0,0,0) 75%);"
        >
        <div style="height:100%; padding-left:8%;padding-right:8%;">
          <div class="d-flex align-center" style="height:100%;">
            <div style="transform: translate(0px, -50px); max-width:500px; padding-top:40px; padding-bottom:30px;">
              <h1 style="font-size:40px;text-shadow:0px 0px 6px rgb(0 0 0 / 90%);" class="white--text">{{item.title}}</h1>
              <h2 style="text-shadow:0px 0px 6px rgb(0 0 0 / 90%);" class="white--text">{{item.subtitle}}</h2>
              <p style="text-shadow:0px 0px 6px rgb(0 0 0 / 90%); margin-top:20px;" class="white--text">{{item.content}}</p>
            </div>
          </div>
        </div>
        
        </v-carousel-item>

      </v-carousel> 
      <div class="header_banner">
        <v-container>
            <v-row>
                <v-col cols="4" sm="4" md="4" lg="4" class="header_banner_item">
                    <div class="icon_container">
                        <LandSvg width="60px" height="60px" viewBox="0,0,400,400"/>
                    </div>
                    <div class="text_container d-none d-sm-block" style="text-align:left;">
                        <h5 class="item_title">Your Land</h5>
                        <p class="item_subtitle">Your Land Information</p>
                    </div>
                </v-col>

                <v-col cols="4" sm="4" md="4" lg="4" class="header_banner_item secondary_step">
                    <div class="icon_container">
                        <HomeCare width="60px" height="60px" viewBox="0,0,400,400"/>
                    </div>                                
                    <div class="text_container d-none d-sm-block" style="text-align:left;">
                        <h5 class="item_title">Home Owner</h5>
                        <p class="item_subtitle">Equity Responsibility</p>
                    </div>
                </v-col>

                <v-col cols="4" sm="4" md="4" lg="4" class="header_banner_item secondary_step">
                    <div class="icon_container">
                        <DesignSvg width="60px" height="60px" viewBox="0,0,400,400"/>
                    </div>                                
                    <div class="text_container d-none d-sm-block" style="text-align:left;">
                        <h5 class="item_title">Customize Home</h5>
                        <p class="item_subtitle">To Your Liking</p>
                    </div>
                </v-col>
            </v-row>
        </v-container>    
      </div>        
    </v-row>
    <v-row>
      <v-container>
        <center>
          <h3 class="section_pre_header">{{homepage_contents.home_video_pretitle}}</h3>
          <h1 class="section_header">{{homepage_contents.home_video_title}}</h1>
          <div class="video_container">
              <button class="video_play_button">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                      <g fill="#fff" fill-rule="evenodd">
                          <path d="M28 53c13.807 0 25-11.193 25-25S41.807 3 28 3 3 14.193 3 28s11.193 25 25 25zm0 3C12.536 56 0 43.464 0 28S12.536 0 28 0s28 12.536 28 28-12.536 28-28 28z"></path>
                          <path d="M37.232 27.91L22 36.82V19z"></path>
                      </g>
                  </svg>
              </button>
              <video class="round" :poster="homepage_contents.main_video_poster" style="object-fit:cover;" :src="homepage_contents.main_video" controls>
              
              </video>              
          </div>
          <NuxtLink to="/buying_power">
          <v-btn large class="px-7 mx-2 my-5" rounded color="primary" elevation="0"> 
              {{homepage_contents.home_video_btn}}
              &nbsp
              <v-icon left style="font-size:20px;">mdi-arrow-right</v-icon> 
          </v-btn>
          </NuxtLink>
        </center>
      </v-container> 
    </v-row>
    <v-row style="background:#eceef1;" class="section pb-15 pt-10">
        <v-container>
            <center>
              <h1 class="step_header mt-7 mb-6">
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

    <v-row class="testimonial_row">
      <div class="testimonial_container">
        <v-container>
          <center>
            <h1 class="white--text mt-16 mb-11">What our Clients Had to Say</h1>
            <v-carousel class="testimonial_carousel" hide-delimiters v-model="testimonial_model">
              <v-carousel-item
                  v-for="(testimonial) in homepage_contents.home_testimonials"
                  :key="testimonial.name"
              >
                  <v-sheet
                  height="100%"
                  tile
                  >
                  <div
                      class="fill-height d-flex align-center justify-center"
                      style="flex-direction:column; max-width:700px;"
                  >
                      <div class="testimonial_text white--text">
                      {{testimonial.text}}
                      </div>
                      <img class="testimonial_avatar" :src="testimonial.img" alt="">
                      <div  class="testimonial_name white--text">
                      {{testimonial.name}}
                      </div>
                      <div  class="testimonial_location white--text">
                      {{testimonial.location}}
                      </div>
                      <div class="testimonial_rating">
                      <v-rating
                          readonly
                          v-model="rating"
                          background-color="white"
                          color="white accent-4"
                          dense
                          half-increments
                          hover
                          size="18"
                      ></v-rating>
                      </div>
                  </div>
                  </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </center>
        </v-container>
      </div>
      
    </v-row>

    <v-row class="projects_row">
      <v-container>
        <v-row>
          <h1 style="width:100%;">
            <center>
              Our Recent Projects
            </center> 
          </h1>
          <v-col cols="12" sm="2" md="4" lg="4"
          v-for="(project , i) in homepage_contents.home_projects"
          :key="i"
          >
              <div class="project_item">
              <div class="project_item_container">
                  <img :src="project.image" alt="">
                  <div class="project_item_title_container">
                      <h3 class="project_item_title">{{project.title}}
                      </h3>
                  </div>
              </div>
              </div>
          </v-col>
        </v-row>
        
      </v-container>
    </v-row>

    <v-row class="contact_row">
      <div class="buildings_background"></div>
      <v-container style="z-index:1;">
        <center>
          <h2 class="primary--text contact_subtitle">{{homepage_contents.contact_title}}</h2>
          <h1 class="primary--text contact_title">{{homepage_contents.contact_text}}</h1>
          <v-btn class="px-8 py-6 mx-2 contact_btn" outlined color="primary" elevation="0" @click="contactPopup(true)">     
              Contact Us
          </v-btn>
        </center>
      </v-container>
    </v-row>
</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import HomeCard from '~/components/HomeCard'
import LandSvg  from '~/components/custom_icons/LandSvg'
import DesignSvg  from '~/components/custom_icons/DesignSvg'
import HomeCare  from '~/components/custom_icons/HomeCare'
import {mapMutations} from 'vuex'

export default {
  data(){
      return{
        video_poster:"",
        video_src:"",
        homepage_contents:{},
        rating:5,
        projects:[
          {image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",
            title:"Green House"
          },
          {image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",
            title:"Green House"
          },
          {image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",
            title:"Green House"
          },
          {image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",
            title:"Green House"
          },
          {image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",
            title:"Green House"
          },
          {image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",
            title:"Green House"
          },
        ],
          testimonials:[
            {
              text:"We have used Value Build Home on two projects now. One in Soquel and one in Capitola. We have enjoyed working with them, and they have a very fast turn around time. We will continue to work with Design Everest on our future projects.",
              img:"https://static.designeverest.com/static/images/team/stephanie.jpg",
              name:"John Deer",
              location:"Los Angels"
            },
            {
              text:"We have used Value Build Home on two projects now. One in Soquel and one in Capitola. We have enjoyed working with them, and they have a very fast turn around time. We will continue to work with Design Everest on our future projects.",
              img:"https://static.designeverest.com/static/images/team/stephanie.jpg",
              name:"John Deer",
              location:"Los Angels"
            },
            {
              text:"We have used Value Build Home on two projects now. One in Soquel and one in Capitola. We have enjoyed working with them, and they have a very fast turn around time. We will continue to work with Design Everest on our future projects.",
              img:"https://static.designeverest.com/static/images/team/stephanie.jpg",
              name:"John Deer",
              location:"Los Angels"
            },
            {
              text:"We have used Value Build Home on two projects now. One in Soquel and one in Capitola. We have enjoyed working with them, and they have a very fast turn around time. We will continue to work with Design Everest on our future projects.",
              img:"https://static.designeverest.com/static/images/team/stephanie.jpg",
              name:"John Deer",
              location:"Los Angels"
            }
          ],
          testimonial_model:0,
          step_tab:'',
          sort_items:['area+','area-','price+','price-'],
          area_items:['500+ sqft','700+ sqft','1000+ sqft','1300+ sqft','1500+ sqft', '2000+ sqft','2300+ sqft','2500+ sqft','2800+ sqft','3000+ sqft'],
          count_items:['1','2+','3+','4+','5+','6+','7+','8+','9+','10+'],
          price_items:['Less than 100k','100k ~ 120k' , '120k ~ 150k' , '150k ~ 180k', '180k ~ 200k'],
          items: ['Foo', 'Bar', 'Fizetz', 'Bquzz', 'Bar', 'Fizz', 'Buzsz', 'Bsar', 'Fizgz', 'Buhzz', 'Barr', 'Feargizz', 'Beruzz', 'Bajh4r', 'Fizthz', 'Buyzz'],
          carousel_items: [],
      }
  },
  components: {
    Logo,
    VuetifyLogo,
    HomeCard,
    LandSvg,
    HomeCare,
    DesignSvg
  },
  mounted(){
      this.fetchPageContents()
      this.video_poster = "http://english.cscec.com/Auxiliary_column/News_round/202011/W020201111495215012173.png"
      this.video_src = require("~/assets/countdown.mp4")
  },
  methods:{
    getUser: function() {
      let response = this.$axios.get('/api/auth/user',{})
    },
    async fetchPageContents(){
      let res = await this.$axios.get('/api/pagecontents/allpages')
      console.log(res.data.data)
      let page_data = [...res.data.data]
      this.savePageContents(page_data)
      let temp_obj = {}
      page_data.forEach((element,i) => {
        if(element.pageName == 'homepage'){
          this.homepage_contents = {...page_data[i].pageContents}
        }
      });
      this.carousel_items = this.homepage_contents.carousel_items
    },
    
    makeLineBreak(str){
        return str.replace(/(?:\r\n|\r|\n)/g, '<br/>')
    },
    ...mapMutations({
        savePageContents:'localStorage/savePageContents',
        contactPopup:'global/contactPopup' 
    })
  }
}
</script>
<style>
  .v-main__wrap>.container{
    max-width: 100% !important;
  }
  .area_select .v-input__icon--prepend-inner{
    background: url("https://preview.colorlib.com/theme/homes/img/rooms/size.png") no-repeat center;
  }
  .area_select .v-input__icon--prepend-inner i{
    display: none;
  }
  .bed_select .v-input__icon--prepend-inner{
    background: url("https://preview.colorlib.com/theme/homes/img/rooms/bed.png") no-repeat center;
  }
  .bed_select .v-input__icon--prepend-inner i{
    display: none;
  }

  .bath_select .v-input__icon--prepend-inner{
    background: url("https://preview.colorlib.com/theme/homes/img/rooms/bath.png") no-repeat center;
  }
  .bath_select .v-input__icon--prepend-inner i{
    display: none;
  }

  .garage_select .v-input__icon--prepend-inner{
    background: url("https://preview.colorlib.com/theme/homes/img/rooms/garage.png") no-repeat center;
  }
  .garage_select .v-input__icon--prepend-inner i{
    display: none;
  }

  .home_filter_item .v-input__icon--prepend-inner{
    -webkit-filter: hue-rotate(348deg) saturate(60);
    filter: hue-rotate(348deg) saturate(60);
    margin-right: 3px;
  }
  .home_filter_sort .v-input__icon--prepend-inner{
    -webkit-filter: hue-rotate(0deg) saturate(1);
    filter: hue-rotate(0deg) saturate(1);    
  }

  .home_filter_sort .v-input__icon--prepend-inner i{
    color: #0180ff !important;
  }

  .home_filter_item{
    max-width: 150px;
    float: right;
    margin-right: 10px !important;
  }
  .home_filter_sort{
    float: left;
  }
  .v-select.v-input--dense .v-select__selection--comma{
    font-weight: 600;
  }
  .v-text-field--outlined.v-input--dense .v-label{
    font-weight: 600;
    color: #000;
  }
  .home_filter_item .v-input__control{
    height: 44px;
  }
  .v-slide-group__next>i{
    margin-bottom: 4px;
  }
  .v-slide-group__prev>i{
    margin-bottom: 4px;
  }
  .v-slide-group__next, .v-slide-group__prev{
    min-width: 30px;
  }
  .v-slide-group__next{
    margin-right: -11px;
  }
  .v-slide-group__prev{
    margin-left: -11px;
  }
  .home_filter_container{
    background: white;
    background-color: white;
    margin-top: -36px;
    z-index: 1;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 2px 15px 30px rgb(0 0 0 / 10%);
  }
  .header_banner{        
      position: absolute;
      width: 100%;
      bottom: 0px;
      background: #024d949e;
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
  .video_play_button{
      position:absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%,-50%);
      cursor: pointer;
  }
  video{
      cursor: pointer;
      max-width: 900px;
      border-radius: 7px;
  }
  .video_container{
      position:relative;        
  }
  .section_header{
    font-size: 43px;
    color: #0f5496;
    font-weight: 800;
    margin-bottom: 20px;
  }
  .section_pre_header{
    margin-top: 20px;
    color: #1b5a96;
    font-weight: 500;
    font-size: 25px;
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
    .testimonial_carousel .v-sheet{
      background:#0000;
    }
    .testimonial_row{
      position:relative;
      padding-bottom: 100px;
    }
    .testimonial_row::before{
      content: "";
      background: url("~assets/dot-pattern.png");
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      opacity: 0.45;
      background-size: 10px;
    }
    .testimonial_container{
      z-index: 1;
      width: 100%;
      background: #012344de;
    }
    .testimonial_avatar{
      border-radius: 100px;
      width: 90px;
      height:90px;
      margin-bottom: 10px;
    }
    .testimonial_text{
      margin-bottom: 30px;
    }
    .testimonial_name{
      font-size: 18px;
    }
    .testimonial_location{
      font-size: 12px;
    }
    .testimonial_carousel{
      height: unset !important;
      padding-bottom: 90px;
    }
    .testimonial_carousel .v-image{
      height: unset !important;
    }
    .project_item{
      height: 0px;
      overflow: hidden;
      padding-bottom: 70%;
      position: relative;
    }
    .project_item_container{
      background: url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg);
      background-position: center;
      background-size: cover;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .project_item_container img{
      width:100%;
      height:100%;
      object-fit: cover;
    }
    .project_item{
      border-radius: 7px;
    }
    .projects_row{
      padding-top: 50px;
      padding-bottom: 50px;
    }
    .projects_row h1{
      margin-bottom: 20px;
    }
    .project_item_container{
      box-shadow: inset 0px -110px 55px -30px rgb(0 0 0 / 50%);
    }
    .project_item_title_container{
      width: 100%;
      text-align: center;
      padding-bottom: 20px;
      position: absolute;
      bottom: 0px;
      color: white;
    }
    .project_item_title{
      font-size: 20px;
      font-weight: 500;
    }
    .contact_row{
      background: #f5f5f5;
      padding-top: 30px;
      padding-bottom: 30px;
      position: relative;
    }
    .contact_btn{
      margin-top: 30px;
      border: solid 2px;
      font-size: 17px !important;
      font-weight: 700 !important;
    }
    .contact_title{
      font-weight: 800;
      font-size: 38px;
    }
    .contact_subtitle{
      font-size: 27px;
    }
    .buildings_background{
      background: url("~assets/buildings_background.svg");
      background-size: contain;
      position:absolute;
      width:100%; 
      height:100%;
      top: 0px;
    }
    a:hover, a:active{
      text-decoration: none !important;
    }
</style>
