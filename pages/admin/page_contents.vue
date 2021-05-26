<template>
<div>

<v-card>
    <v-tabs>
        <v-tab>
            <v-icon left>
                mdi-home-outline
            </v-icon>
            Homepage
        </v-tab>
        <v-tab>
            <v-icon left>
                mdi-cash-check
            </v-icon>
            Buying Power
        </v-tab>
        <v-tab>
            <v-icon left>
                mdi-map-marker-radius-outline
            </v-icon>
            Land Page
        </v-tab>
        <v-tab>
            <v-icon left>
                mdi-shield-home-outline
            </v-icon>
            Responsibilities
        </v-tab>
        <v-tab>
            <v-icon left>
                mdi-folder-home-outline
            </v-icon>
            Browse Homes
        </v-tab>

        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <div style="position:relative;">
                        <v-carousel hide-delimiters>
                            <v-carousel-item
                            v-for="(item,i) in homepage_contents.carousel_items"
                            :key="i"
                            :src="item.image"
                            style="background:linear-gradient(to right,rgba(0,0,0,.25) 0,rgba(0,0,0,0) 81%,rgba(0,0,0,0) 75%);"
                            >
                            <div style="height:100%; padding-left:8%;padding-right:8%;">
                                <div class="d-flex align-center" style="height:100%;">
                                    <div style="transform: translate(0px, -50px); max-width:500px; padding-top:40px; padding-bottom:30px;">
                                        <div style="font-size:40px;line-height:1.4; font-weight:600; text-shadow:0px 0px 6px rgb(0 0 0 / 90%);">{{item.title}}</div>
                                        <h2 style="text-shadow:0px 0px 6px rgb(0 0 0 / 90%);">{{item.subtitle}}</h2>
                                        <p v-html="makeLineBreak(item.content)" style="text-shadow:0px 0px 6px rgb(0 0 0 / 90%); margin-top:20px;"></p>
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
                    </div>
                    <input
                        ref="slide_image_input"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        @change="onSlideImageChange"
                    >
                    <div
                    v-for="(item,i) in homepage_contents.carousel_items"
                    :key="i+'homepage_contents.carousel_items'"
                    style="width:100%; padding:15px;"
                    >
                        <div class="d-md-flex flex-row elevation-1 pa-4" style="flex-wrap:wrap;">
                            <div class="d-flex mr-4" style="min-height:200px; min-width:300px;max-width:300px; position:relative; background:#aaa;">
                                <img style="max-width:100%; object-fit:cover;" :src="item.image" alt="">
                                <v-btn 
                                v-if="!item.loading"
                                @click="slideImageClick(i)"
                                absolute small style="top:15px; right:15px;" fab>
                                    <v-icon>mdi-image-edit</v-icon>
                                </v-btn>
                                <v-progress-circular
                                v-if="item.loading"
                                absolute small style="position:absolute !important;top:50%; left:50%; transform:translate(-50%,-50%);"
                                indeterminate
                                color="primary"
                                ></v-progress-circular>
                            </div>
                            <div style="flex:1">
                                <v-text-field
                                v-model="item.title"
                                dense
                                outlined
                                label="Title"
                                ></v-text-field>
                                <v-text-field
                                v-model="item.subtitle"
                                dense
                                outlined
                                label="Subtitle"
                                ></v-text-field>
                                <v-textarea
                                v-model="item.content"
                                dense
                                outlined
                                label="Content"
                                ></v-textarea>
                            </div>
                            <div>
                                <v-btn class="ml-4" small fab @click="homepage_contents.carousel_items.splice(i,1)">
                                    <v-icon
                                    >mdi-close</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <v-spacer></v-spacer>
                        <v-btn color="primary mx-4" style="text-transform:none;" rounded @click="newSlide">New Slide</v-btn>
                        <v-spacer></v-spacer>
                    </div>

                    <v-row class="pt-10">
                        <v-container>
                            <center>
                            <h3 class="section_pre_header mb-5">{{homepage_contents.home_video_pretitle}}
                                <v-btn fab small @click="home_video_pretitle_visibility=true"><v-icon>mdi-pencil</v-icon></v-btn>
                            </h3>
                            <div class="d-flex" v-if="home_video_pretitle_visibility">
                                <v-text-field
                                label="Write your words"
                                v-model="homepage_contents.home_video_pretitle"
                                dense
                                outlined
                                ></v-text-field>
                                <v-btn class="ml-5" fab small @click="home_video_pretitle_visibility=false"><v-icon>mdi-check</v-icon></v-btn>
                            </div>
                            
                            <h1 class="section_header mb-5">{{homepage_contents.home_video_title}}
                                <v-btn fab small @click="home_video_title_visibility=true"><v-icon>mdi-pencil</v-icon></v-btn>
                            </h1>
                            <div class="d-flex" v-if="home_video_title_visibility">
                                <v-text-field
                                label="Write your words"
                                v-model="homepage_contents.home_video_title"
                                dense
                                outlined
                                ></v-text-field>
                                <v-btn class="ml-5" fab small @click="home_video_title_visibility=false"><v-icon>mdi-check</v-icon></v-btn>
                            </div>

                            <div class="video_container">
                                <button class="video_play_button">
                                    <svg width="56" height="56" viewBox="0 0 56 56">
                                        <g fill="#fff" fill-rule="evenodd">
                                            <path d="M28 53c13.807 0 25-11.193 25-25S41.807 3 28 3 3 14.193 3 28s11.193 25 25 25zm0 3C12.536 56 0 43.464 0 28S12.536 0 28 0s28 12.536 28 28-12.536 28-28 28z"></path>
                                            <path d="M37.232 27.91L22 36.82V19z"></path>
                                        </g>
                                    </svg>
                                </button>
                                <input
                                    ref="video_poster_input"
                                    class="d-none"
                                    type="file"
                                    accept="image/*"
                                    @change="onHomeVideoPosterChange"
                                >
                                <input
                                    ref="main_video_input"
                                    class="d-none"
                                    type="file"
                                    accept="video/mp4,video/x-m4v,video/*"
                                    @change="onHomeVideoChange"
                                >
                                <center>
                                    <v-btn class="ma-2" color="primary" fab x-small  @click="homeVideoPosterClick">
                                        <v-icon small>mdi-image-edit</v-icon>
                                    </v-btn>
                                    <v-btn class="ma-2" color="primary" fab x-small  @click="homeVideoClick">
                                        <v-icon small>mdi-video-outline</v-icon>
                                    </v-btn>
                                </center>

                                <div style="max-width:900px;position:relative;">
                                    <video
                                    :src="homepage_contents.main_video"
                                    style="cursor: pointer; max-width: 100%; border-radius: 7px; object-fit:cover;"
                                    class="round" poster="https://d2ppe5muinjj2h.cloudfront.net/main_video_poster.jpeg" controls>
                                    Your browser does not support HTML video.
                                    </video>   
                                </div>
                                           
                            </div>
                            <NuxtLink to="/buying_power">
                            <v-btn large class="px-7 mx-2 my-5" rounded color="primary" elevation="0"> 
                                {{homepage_contents.home_video_btn}}
                                &nbsp
                                <v-icon left style="font-size:20px;">mdi-arrow-right</v-icon> 
                            </v-btn>
                            </NuxtLink>
                            <v-btn fab small @click="home_video_btn_visibility=true"><v-icon>mdi-pencil</v-icon></v-btn>
                            <div class="d-flex" v-if="home_video_btn_visibility">
                                <v-text-field
                                label="Write your words"
                                v-model="homepage_contents.home_video_btn"
                                dense
                                outlined
                                ></v-text-field>
                                <v-btn class="ml-5" fab small @click="home_video_btn_visibility=false"><v-icon>mdi-check</v-icon></v-btn>
                            </div>
                            </center>
                        </v-container> 

                        <v-container>
                            <input
                                ref="home_step_image_input"
                                class="d-none"
                                type="file"
                                accept="image/*"
                                @change="onHomeStepImageChange"
                            >
                            <center>
                            <h1 v-if="!home_steps_title_edit" class="step_header mt-7 mb-6">
                                {{homepage_contents.home_steps_title}}
                                <v-btn fab small @click="home_steps_title_edit=true">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </h1>
                            <div v-if="home_steps_title_edit" class="d-flex">
                                <v-text-field v-model="homepage_contents.home_steps_title"></v-text-field>
                                <v-btn fab small @click="home_steps_title_edit=false">
                                    <v-icon>mdi-check</v-icon>
                                </v-btn>
                            </div>
                            </center> 
                            <v-card>
                                <v-tabs
                                v-model="home_step_tab"
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

                                <v-tabs-items v-model="home_step_tab">
                                <v-tab-item
                                    v-for="(step, i) in homepage_contents.home_steps"
                                    :key="i"
                                    :value="'tab-' + i"
                                >
                                    <v-card flat>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="7" md="7" lg="7">
                                                    <div style="width:100%; background:#aaa;min-height:300px;position:relative;">
                                                        <img class="d-flex" style="max-width:100%;" :src="step.image" alt="">
                                                        <v-btn fab small absolute style="top:15px; right:15px;" @click="homeStepImageClick(i,step.id)"><v-icon>mdi-image</v-icon></v-btn>
                                                        <v-progress-circular
                                                        v-if="step.loading"
                                                        absolute small style="position:absolute !important;top:50%; left:50%; transform:translate(-50%,-50%);"
                                                        indeterminate
                                                        color="primary"
                                                        ></v-progress-circular>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" sm="5" md="5" lg="5">
                                                    <h3 v-if="!home_step_title_edit" class="mb-3 mt-5">{{step.title}}
                                                        <v-btn fab small @click="home_step_title_edit=true"><v-icon>mdi-pencil</v-icon></v-btn>
                                                    </h3>
                                                    <div v-if="home_step_title_edit" class="d-flex">
                                                        <v-text-field  v-model="step.title"></v-text-field>
                                                        <v-btn fab small @click="home_step_title_edit=false"><v-icon>mdi-check</v-icon></v-btn>
                                                    </div>
                                                    
                                                    <p v-if="!home_step_content_edit" v-html="makeLineBreak(step.contents)">
                                                    </p>
                                                    <div class="d-flex mt-n10" ><v-spacer></v-spacer>
                                                    <v-btn v-if="!home_step_content_edit" fab small @click="home_step_content_edit=true"><v-icon>mdi-pencil</v-icon></v-btn>
                                                    </div>
                                                    
                                                    <div v-if="home_step_content_edit" class="d-flex">
                                                        <v-textarea  v-model="step.contents"></v-textarea>
                                                        <v-btn fab small @click="home_step_content_edit=false"><v-icon>mdi-check</v-icon></v-btn>
                                                    </div>
                                                    <div v-if="!home_step_btn_edit" class="d-flex">
                                                        <v-btn outlined class="px-4 mx-2" rounded color="primary" elevation="0">
                                                            <v-icon left style="font-size:20px;">mdi-arrow-right</v-icon>
                                                            {{step.btn}}
                                                        </v-btn>
                                                        <v-btn fab small @click="home_step_btn_edit=true"><v-icon>mdi-pencil</v-icon></v-btn>
                                                    </div>
                                                    <div v-if="home_step_btn_edit" class="d-flex">
                                                        <v-text-field  v-model="step.btn"></v-text-field>
                                                        <v-btn fab small @click="home_step_btn_edit=false"><v-icon>mdi-check</v-icon></v-btn>
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
                                    v-for="(testimonial,i) in homepage_contents.home_testimonials"
                                    :key="testimonial.name+i"
                                >
                                    <v-sheet
                                    height="100%"
                                    tile
                                    >
                                    <div
                                        class="fill-height d-flex align-center justify-center"
                                        style="flex-direction:column; max-width:700px;"
                                    >
                                        <div class="testimonial_text">
                                        {{testimonial.text}}
                                        </div>
                                        <img class="testimonial_avatar" :src="testimonial.img" alt="">
                                        <div  class="testimonial_name">
                                        {{testimonial.name}}
                                        </div>
                                        <div  class="testimonial_location">
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
                    <div
                    v-for="(testimonial, i) in homepage_contents.home_testimonials"
                    :key="i"
                    class="pa-2"
                    >
                        <div class="elevation-2 pa-4">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="7" md="3" class="d-flex justify-center">
                                        <div class="d-flex flex-column">
                                            <v-image-input
                                            v-model="testimonial.processing_image"
                                            :image-quality="1"
                                            clearable
                                            image-format="jpeg"
                                            :image-width="100"
                                            :image-height="100"
                                            overlayPadding="20px"
                                            />
                                            <v-btn :loading="testimonial.loading" rounded small color="primary" @click="uploadTestimonialAvatar(i,testimonial.id)">Ok,upload</v-btn>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" sm="5" md="3">
                                        <v-text-field
                                        outlined
                                        dense
                                        v-model="testimonial.name"
                                        label="Name"
                                        ></v-text-field>
                                        <v-text-field
                                        outlined
                                        dense
                                        v-model="testimonial.location"
                                        label="Location"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6" class="d-flex">
                                        <v-textarea
                                        outlined
                                        dense
                                        v-model="testimonial.text"
                                        label="He or she said"
                                        ></v-textarea>
                                        <v-btn fab small class="ml-5">
                                            <v-icon @click="homepage_contents.home_testimonials.splice(i,1)">mdi-close</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                    
                    </div>
                    <v-btn color="primary" style="text-transform:none;" rounded @click="newTestimonial">Add New Testimonial</v-btn>
                    <v-container class="mt-10">
                        <v-row>
                        <h1 style="width:100%;">
                            <center>
                            Our Recent Projects
                            </center> 
                        </h1>
                        <input
                            ref="home_projects_image_input"
                            class="d-none"
                            type="file"
                            accept="image/*"
                            @change="onHomeProjectsImageChange"
                        >
                        <v-col cols="12" sm="2" md="4" lg="4"
                        v-for="(project , i) in homepage_contents.home_projects"
                        :key="i"
                        >
                            <div class="project_item">
                            <div class="project_item_container">
                                <img :src="project.image" alt="">
                                <div class="project_item_title_container">
                                    <h3 v-if="!project.edit" class="project_item_title">{{project.title}}
                                        <v-btn x-small fab @click="project.edit=true">
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-btn>
                                    </h3>
                                    <div v-if="project.edit" class="d-flex">
                                        <v-text-field  class="white_input" label="Project Title" outlined dense v-model="project.title">
                                        </v-text-field>
                                        <v-btn class="ml-3" x-small fab @click="project.edit=false">
                                            <v-icon small>mdi-check</v-icon>
                                        </v-btn>
                                    </div>
                                    
                                </div>
                                <v-btn :loading="project.loading" @click="homeprojectsImageClick(i,project.id)" absolute small fab style="top:15px; right:15px;">
                                    <v-icon>mdi-image</v-icon>
                                </v-btn>
                            </div>
                            </div>
                        </v-col>
                        </v-row>
                        
                        <v-row class="contact_row">
                            <div class="buildings_background"></div>
                            <v-container style="z-index:1;">
                                <center>

                                    <h2 v-if="!home_contact_title_edit" class="primary--text contact_subtitle mb-6">
                                        {{homepage_contents.contact_title}}
                                        <v-btn x-small fab @click="home_contact_title_edit = true">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </h2>

                                    <div v-if="home_contact_title_edit" class="d-flex">
                                        <v-text-field
                                        v-model="homepage_contents.contact_title"
                                        label="Write your words"
                                        ></v-text-field>
                                        <v-btn @click="home_contact_title_edit = false" x-small fab>
                                            <v-icon>mdi-check</v-icon>
                                        </v-btn>
                                    </div>

                                    <h1 v-if="!home_contact_text_edit" class="primary--text contact_title">
                                        {{homepage_contents.contact_text}}
                                        <v-btn x-small fab @click="home_contact_text_edit = true">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </h1>

                                    <div v-if="home_contact_text_edit" class="d-flex">
                                        <v-text-field
                                        v-model="homepage_contents.contact_text"
                                        label="Write your words"
                                        ></v-text-field>
                                        <v-btn @click="home_contact_text_edit = false" x-small fab>
                                            <v-icon>mdi-check</v-icon>
                                        </v-btn>
                                    </div>

                                    <v-btn class="px-8 py-6 mx-2 contact_btn" outlined color="primary" elevation="0">     
                                        Contact Us
                                    </v-btn>
                                </center>
                            </v-container>
                        </v-row>
                    </v-container>
                    <center>
                        <v-btn :loading="homepage_updating" @click="saveHomePage" class="my-5" color="primary" rounded>Save Homepage</v-btn>
                    </center>
                </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <v-row class="section flesh py-10">
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="5">
                                    <h1 v-if="!power_intro_title_edit" class="section_header">{{power_contents.intro_title}}
                                        <v-btn fab x-small @click="power_intro_title_edit=true">
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-btn>
                                    </h1>
                                    <div class="d-flex" v-if="power_intro_title_edit">
                                        <v-text-field outlined dense label="Your words" v-model="power_contents.intro_title"></v-text-field>
                                        <v-btn fab x-small @click="power_intro_title_edit=false">
                                            <v-icon small>mdi-check</v-icon>
                                        </v-btn>
                                    </div>

                                    <div v-if="!power_intro_content_edit">
                                        <p v-html="makeLineBreak(power_contents.intro_content)" class="section_header_content">
                                        </p>
                                        <div class="d-flex mt-n10">
                                            <v-spacer></v-spacer>
                                            <v-btn fab x-small @click="power_intro_content_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>

                                    <div class="d-flex" v-if="power_intro_content_edit">
                                        <v-textarea outlined dense label="Your words" v-model="power_contents.intro_content"></v-textarea>
                                        <v-btn x-small fab @click="power_intro_content_edit=false">
                                            <v-icon small>mdi-check</v-icon>
                                        </v-btn>
                                    </div>
                                    
                                    <div class="mb-2">
                                        <v-icon left>mdi-arrow-right</v-icon>
                                        <a v-if="!power_intro_link1_edit" href="#financing">
                                            {{power_contents.intro_link1}}
                                            <v-btn fab x-small @click="power_intro_link1_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </a>
                                        <div v-if="power_intro_link1_edit" class="d-flex">
                                            <v-text-field dense outlined v-model="power_contents.intro_link1"></v-text-field>
                                            <v-btn x-small fab @click="power_intro_link1_edit=false">
                                                <v-icon small>mdi-check</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>

                                    <div class="mb-2">
                                        <v-icon left>mdi-arrow-right</v-icon>
                                        <a v-if="!power_intro_link2_edit" href="#qualified">
                                            {{power_contents.intro_link2}}
                                            <v-btn fab x-small @click="power_intro_link2_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </a>
                                        <div v-if="power_intro_link2_edit" class="d-flex">
                                            <v-text-field dense outlined v-model="power_contents.intro_link2"></v-text-field>
                                            <v-btn x-small fab @click="power_intro_link2_edit=false">
                                                <v-icon small>mdi-check</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-2">
                                        <v-icon left>mdi-arrow-right</v-icon>
                                        <a v-if="!power_intro_link3_edit" href="#qualified">
                                            {{power_contents.intro_link3}}
                                            <v-btn fab x-small @click="power_intro_link3_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </a>
                                        <div v-if="power_intro_link3_edit" class="d-flex">
                                            <v-text-field dense outlined v-model="power_contents.intro_link3"></v-text-field>
                                            <v-btn x-small fab @click="power_intro_link3_edit=false">
                                                <v-icon small>mdi-check</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>                                
                                    
                                    <div class="mb-2">
                                        <v-icon left>mdi-arrow-right</v-icon>
                                        <a v-if="!power_intro_link4_edit" href="#calculator">
                                            {{power_contents.intro_link4}}
                                            <v-btn fab x-small @click="power_intro_link4_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </a>
                                        <div v-if="power_intro_link4_edit" class="d-flex">
                                            <v-text-field dense outlined v-model="power_contents.intro_link4"></v-text-field>
                                            <v-btn x-small fab @click="power_intro_link4_edit=false">
                                                <v-icon small>mdi-check</v-icon>
                                            </v-btn>
                                        </div>
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
                                                <video class="round power_video" poster="http://english.cscec.com/Auxiliary_column/News_round/202011/W020201111495215012173.png" style="object-fit:cover;" controls>
                                                <source src="~/assets/countdown.mp4" type="video/mp4">
                                                Your browser does not support HTML video.
                                                </video>
                                            </div>
                                    </v-col>
                            </v-row>                
                        </v-container>       
                    </v-row>

                    <v-row style="position:relative;" class="py-10">
                        
                        <v-container>
                            <v-row class="section">
                                <v-col cols="12" sm="12" md="7">
                                        <div style="position:relative;min-height:300px; background:#aaa;">
                                            <input
                                                ref="power_finance_image_input"
                                                class="d-none"
                                                type="file"
                                                accept="image/*"
                                                @change="onPowerFinanceImageChange"
                                            >
                                            <v-img
                                            class="shadow_far mt-n20 round"
                                            :src="power_contents.finance_image"
                                            ></v-img>
                                            <v-btn absolute style="top:15px; right:15px;" fab small @click="powerFinanceImageClick">
                                                <v-icon>mdi-image</v-icon>
                                            </v-btn>
                                        </div>
                                </v-col>
                                <v-col cols="12" sm="12" md="5">
                                        <h1 v-if="!power_finance_title_edit" class="section_header">{{power_contents.finance_title}}
                                            <v-btn x-small fab @click="power_finance_title_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </h1>
                                        <div v-if="power_finance_title_edit" class="d-flex">
                                            <v-text-field dense outlined v-model="power_contents.finance_title"></v-text-field>
                                            <v-btn x-small fab @click="power_finance_title_edit=false">
                                                <v-icon small>mdi-check</v-icon>
                                            </v-btn>
                                        </div>

                                        <div v-if="!power_finance_content_edit">
                                            <p v-html="makeLineBreak(power_contents.finance_content)" class="section_header_content">
                                            </p>
                                            <div class="d-flex mt-n10">
                                                <v-spacer></v-spacer>
                                                <v-btn x-small fab @click="power_finance_content_edit=true">
                                                    <v-icon small>mdi-pencil</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>

                                        <div v-if="power_finance_content_edit" class="d-flex">
                                            <v-textarea v-model="power_contents.finance_content"></v-textarea>
                                            <v-btn x-small fab @click="power_finance_content_edit=false">
                                                <v-icon small>mdi-check</v-icon>
                                            </v-btn>
                                        </div>
                                        
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

                    <v-row style="background:#eceef1; position:relative;" class="py-10">
                        
                        <v-container>
                            <v-row class="section" >
                                <v-col cols="12" sm="12" md="6">
                                        <h1 v-if="!power_lender_title_edit" class="section_header">{{power_contents.lender_title}}
                                            <v-btn x-small fab @click="power_lender_title_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </h1>
                                        <div v-if="power_lender_title_edit" class="d-flex">
                                            <v-text-field v-model="power_contents.lender_title" dense outlined></v-text-field>
                                            <v-btn x-small fab @click="power_lender_title_edit=false">
                                                <v-icon small>mdi-check</v-icon>
                                            </v-btn>
                                        </div>
                                        <div v-if="!power_lender_content_edit">
                                            <p v-html="makeLineBreak(power_contents.lender_content)" class="section_header_content">
                                            </p>
                                            <div class="d-flex mt-n10">
                                                <v-spacer></v-spacer>
                                                <v-btn x-small fab @click="power_lender_content_edit=true">
                                                    <v-icon small>mdi-pencil</v-icon>
                                                </v-btn>
                                            </div>
                                        </div>
                                        <div class="d-flex" v-if="power_lender_content_edit">
                                            <v-textarea outlined dense v-model="power_contents.lender_content"></v-textarea>
                                            <v-btn x-small fab @click="power_lender_content_edit=false">
                                                <v-icon small>mdi-check</v-icon>
                                            </v-btn>
                                        </div>
                                        
                                        <v-text-field
                                            background-color="white"
                                            label="Lender's Company"                               
                                            outlined
                                            readonly
                                        ></v-text-field> 
                                        <v-text-field
                                            background-color="white"
                                            label="Lender's Name"                               
                                            outlined
                                            readonly
                                        ></v-text-field> 
                                        <p v-if="!power_lender_letter_content_edit">{{power_contents.lender_letter_content}}
                                            <v-btn x-small fab @click="power_lender_letter_content_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </p> 
                                        <div v-if="power_lender_letter_content_edit" class="d-flex">
                                            <v-text-field outlined dense v-model="power_contents.lender_letter_content"></v-text-field>
                                            <v-btn x-small fab @click="power_lender_letter_content_edit=false">
                                                <v-icon small>mdi-check</v-icon>
                                            </v-btn>
                                        </div>
                                        <v-btn
                                        text
                                        class="d-flex justify-center align-center rounded mb-5"
                                        style="width:100%; height:90px; border:dashed 2px #555; text-transform:none !important;"
                                        >
                                        <h4>
                                            <span>
                                                Upload File
                                            </span>
                                        </h4>
                                        
                                        </v-btn>
                                        <v-btn style="text-transform:none !important" color="primary" rounded>Save Lender Data</v-btn>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" class="d-flex align-center justify-center">
                                    <div style="flex:1; position:relative;min-height:300px; background:#aaa;">
                                        <input
                                            ref="power_lender_image_input"
                                            class="d-none"
                                            type="file"
                                            accept="image/*"
                                            @change="onPowerLenderImageChange"
                                        >
                                        <img
                                        style="max-width:100%;"
                                        class="d-flex shadow_far mt-n20 round"
                                        :src="power_contents.lender_image"
                                        />
                                        <v-btn absolute style="top:15px; right:15px;" fab small @click="powerLenderImageClick">
                                            <v-icon>mdi-image</v-icon>
                                        </v-btn>
                                    </div>                          
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-row>

                    <v-row style="position:relative;">
                    <v-container>
                        <v-row class="section" >
                            <v-col cols="12" sm="12" md="7" class="d-flex justify-center align-center">
                                <div style="flex:1; position:relative;min-height:300px; background:#aaa;">
                                    <input
                                        ref="power_calc_image_input"
                                        class="d-none"
                                        type="file"
                                        accept="image/*"
                                        @change="onPowerCalcImageChange"
                                    >
                                    <img
                                    style="max-width:100%;"
                                    class="d-flex shadow_far mt-n20 round"
                                    :src="power_contents.calc_image"
                                    />
                                    <v-btn absolute style="top:15px; right:15px;" fab small @click="powerCalcImageClick">
                                        <v-icon>mdi-image</v-icon>
                                    </v-btn>
                                </div>  
                            </v-col>

                            <v-col cols="12" sm="12" md="5" class="monthly_calculator">
                                    <h1 v-if="!power_calculator_title_edit" class="section_header">{{power_contents.calculator_title}}
                                        <v-btn x-small fab @click="power_calculator_title_edit=true">
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-btn>
                                    </h1>
                                    <div v-if="power_calculator_title_edit" class="d-flex">
                                        <v-text-field v-model="power_contents.calculator_title" outlined dense></v-text-field>
                                        <v-btn fab x-small @click="power_calculator_title_edit=false">
                                            <v-icon small>mdi-check</v-icon>
                                        </v-btn>
                                    </div>

                                    <div v-if="!power_calculator_content_edit">
                                        <p v-html="makeLineBreak(power_contents.calculator_content)" class="section_header_content">
                                        </p>
                                        <div class="d-flex mt-n10">
                                            <v-spacer></v-spacer>
                                            <v-btn fab x-small @click="power_calculator_content_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                    <div v-if="power_calculator_content_edit" class="d-flex">
                                        <v-textarea outlined dense v-model="power_contents.calculator_content"></v-textarea>
                                        <v-btn fab x-small @click="power_calculator_content_edit=false">
                                            <v-icon small>mdi-check</v-icon>
                                        </v-btn>
                                    </div>
                                    
                                    <v-text-field
                                        label="Total investment"
                                    
                                        outlined
                                    ></v-text-field>   

                                    <v-text-field
                                        label="Interest Rate"
                                    
                                        outlined
                                    ></v-text-field>

                                    <v-text-field
                                        label="Loan Duration"
                                        
                                        outlined
                                    ></v-text-field>
                                    <v-divider></v-divider>
                                    <div class="d-flex align-center mt-5">
                                        <span>Monthly Payment</span>
                                        <v-spacer></v-spacer>
                                        <span style="font-size: 37px;    font-weight: 500;    color: #36b13a;">$1000</span>
                                    </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-row>

                <center>
                    <v-btn :loading="power_updating" @click="savePowerPage" class="my-5" color="primary" rounded>Save this page</v-btn>
                </center>
                </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <v-row class="section header_image_section" :style="{background:'url('+land_contents.header_image+') center no-repeat', backgroundSize:'cover'}">
                        <v-btn x-small fab absolute style="top:15px; right:15px;" @click="landHeaderImageClick"><v-icon small>mdi-image</v-icon></v-btn>
                        <input
                            ref="land_header_image_input"
                            class="d-none"
                            type="file"
                            accept="image/*"
                            @change="onLandHeaderImageChange"
                        >
                        <v-container>
                            <div class="header_title_container">
                                <center>
                                    <h1 v-if="!land_header_title_edit" class="header_title">{{land_contents.header_title}}
                                        <v-btn x-small fab @click="land_header_title_edit=true">
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-btn>
                                    </h1>
                                    <div class="d-flex" v-if="land_header_title_edit">
                                        <v-text-field class="white_input" dense outlined v-model="land_contents.header_title"></v-text-field>
                                        <v-btn x-small fab @click="land_header_title_edit=false">
                                            <v-icon small>mdi-check</v-icon>
                                        </v-btn>
                                    </div>

                                    <div v-if="!land_header_content_edit">
                                        <p v-html="makeLineBreak(land_contents.header_content)" class="header_text"></p>
                                        <div class="d-flex mt-n10">
                                            <v-spacer></v-spacer>
                                            <v-btn x-small fab @click="land_header_content_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                    <div v-if="land_header_content_edit" class="d-flex">
                                        <v-textarea class="white_input" outlined dense v-model="land_contents.header_content"></v-textarea>
                                        <v-btn x-small fab @click="land_header_content_edit=false">
                                            <v-icon small>mdi-check</v-icon>
                                        </v-btn>
                                    </div>
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

                    <center>
                        <v-btn :loading="land_updating" @click="saveLandPage" class="my-5" color="primary" rounded>Save this page</v-btn>
                    </center>
                </v-card-text>
            </v-card>
        </v-tab-item>

        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <v-row class="section header_image_section" :style="{background:'url('+resp_contents.header_image+') center no-repeat', backgroundSize:'cover'}">
                        <v-btn x-small fab absolute style="top:15px; right:15px;" @click="respHeaderImageClick"><v-icon small>mdi-image</v-icon></v-btn>
                        <input
                            ref="resp_header_image_input"
                            class="d-none"
                            type="file"
                            accept="image/*"
                            @change="onRespHeaderImageChange"
                        >
                        <v-container>
                            <div class="header_title_container">
                                <center>
                                    <h1 v-if="!resp_header_title_edit" class="header_title">{{resp_contents.header_title}}
                                        <v-btn x-small fab @click="resp_header_title_edit=true">
                                            <v-icon small>mdi-pencil</v-icon>
                                        </v-btn>
                                    </h1>
                                    <div class="d-flex" v-if="resp_header_title_edit">
                                        <v-text-field class="white_input" dense outlined v-model="resp_contents.header_title"></v-text-field>
                                        <v-btn x-small fab @click="resp_header_title_edit=false">
                                            <v-icon small>mdi-check</v-icon>
                                        </v-btn>
                                    </div>

                                    <div v-if="!resp_header_content_edit">
                                        <p v-html="makeLineBreak(resp_contents.header_content)" class="header_text"></p>
                                        <div class="d-flex mt-n10">
                                            <v-spacer></v-spacer>
                                            <v-btn x-small fab @click="resp_header_content_edit=true">
                                                <v-icon small>mdi-pencil</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                    <div v-if="resp_header_content_edit" class="d-flex">
                                        <v-textarea class="white_input" outlined dense v-model="resp_contents.header_content"></v-textarea>
                                        <v-btn x-small fab @click="resp_header_content_edit=false">
                                            <v-icon small>mdi-check</v-icon>
                                        </v-btn>
                                    </div>
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
                    </v-row>
                    <v-container>
                        <center>                        
                            <h1 v-if="!resp_content_title_edit" class="section_title primary--text">
                                {{resp_contents.content_title}}
                                <v-btn x-small fab @click="resp_content_title_edit=true">
                                    <v-icon small>mdi-pencil</v-icon>
                                </v-btn>
                            </h1>
                            <div v-if="resp_content_title_edit" class="d-flex">
                                <v-text-field v-model="resp_contents.content_title" outlined dense></v-text-field>
                                <v-btn class="ml-5" x-small fab @click="resp_content_title_edit=false">
                                    <v-icon small>mdi-check</v-icon>
                                </v-btn>
                            </div>
                            <div v-if="!resp_content_content_edit">
                                <p class="section_subtext" v-html="makeLineBreak(resp_contents.content_content)"></p>
                                <div class="d-flex mt-n10">
                                    <v-spacer></v-spacer>
                                    <v-btn x-small fab @click="resp_content_content_edit=true">
                                        <v-icon small>mdi-pencil</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                            <div v-if="resp_content_content_edit" class="d-flex">
                                <v-textarea outlined dense v-model="resp_contents.content_content"></v-textarea>
                                <v-btn x-small fab @click="resp_content_content_edit=false">
                                    <v-icon small>mdi-check</v-icon>
                                </v-btn>
                            </div>

                            <center>
                                <v-btn :loading="resp_updating" @click="saveRespPage" class="my-5" color="primary" rounded>Save This Page</v-btn>
                            </center>
                        </center>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-tab-item>

        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <div style="position:relative;">
                        <v-carousel hide-delimiters>
                            <v-carousel-item
                            v-for="(item,i) in browse_contents.carousel_items"
                            :key="i"
                            :src="item.image"
                            style="background:linear-gradient(to right,rgba(0,0,0,.25) 0,rgba(0,0,0,0) 81%,rgba(0,0,0,0) 75%);"
                            >
                            <div style="height:100%; padding-left:8%;padding-right:8%;">
                                <div class="d-flex align-center" style="height:100%;">
                                    <div style="max-width:500px; padding-top:40px; padding-bottom:30px;">
                                        <div style="font-size:40px;line-height:1.4; font-weight:600; text-shadow:0px 0px 6px rgb(0 0 0 / 90%);">{{item.title}}</div>
                                        <h2 style="text-shadow:0px 0px 6px rgb(0 0 0 / 90%);">{{item.subtitle}}</h2>
                                        <p v-html="makeLineBreak(item.content)" style="text-shadow:0px 0px 6px rgb(0 0 0 / 90%); margin-top:20px;"></p>
                                    </div>
                                </div>
                            </div>
                            </v-carousel-item>
                        </v-carousel> 
                    </div>
                    <input
                        ref="browse_slide_image_input"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        @change="onBrowseSlideImageChange"
                    >
                    <div
                    v-for="(item,i) in browse_contents.carousel_items"
                    :key="i"
                    style="width:100%; padding:15px;"
                    >
                        <div class="d-md-flex flex-row elevation-1 pa-4" style="flex-wrap:wrap;">
                            <div class="d-flex mr-4" style="min-height:200px; min-width:300px;max-width:300px; position:relative; background:#aaa;">
                                <img style="max-width:100%; object-fit:cover;" :src="item.image" alt="">
                                <v-btn 
                                @click="browseSlideImageClick(i)"
                                absolute small style="top:15px; right:15px;" fab>
                                    <v-icon>mdi-image-edit</v-icon>
                                </v-btn>
                            </div>
                            <div style="flex:1">
                                <v-text-field
                                v-model="item.title"
                                dense
                                outlined
                                label="Title"
                                ></v-text-field>
                                <v-text-field
                                v-model="item.subtitle"
                                dense
                                outlined
                                label="Subtitle"
                                ></v-text-field>
                                <v-textarea
                                v-model="item.content"
                                dense
                                outlined
                                label="Content"
                                ></v-textarea>
                            </div>
                            <div>
                                <v-btn class="ml-4" small fab>
                                    <v-icon
                                    >mdi-close</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex">
                        <v-spacer></v-spacer>
                        <v-btn color="primary mx-4" style="text-transform:none;" rounded @click="newBrowseSlide">New Slide</v-btn>
                        <v-spacer></v-spacer>
                    </div>

                    <center>
                        <v-btn :loading="browse_updating" @click="saveBrowsePage" class="my-5" color="primary" rounded>Save This Page</v-btn>
                    </center>
                </v-card-text>
            </v-card>
        </v-tab-item>
    </v-tabs>
</v-card>

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

<center>
</center>
</div>
</template>

<script>
import LandSvg  from '~/components/custom_icons/LandSvg'
import DesignSvg  from '~/components/custom_icons/DesignSvg'
import HomeCare  from '~/components/custom_icons/HomeCare'
import VImageInput from 'vuetify-image-input';

export default {
    data(){
        return{
            homepage_contents:{
                main_video_poster:"",
                main_video:"",
                carousel_items: [
                ],
                home_video_pretitle:"",
                home_video_title:"",
                home_video_btn:"",
                home_steps:[
                ],
                home_steps_title:"Estimate your Home Budget through Simplified 3 Steps",
                home_testimonials:[
                ],
                home_projects:[
                ],
                contact_title:"Still interested?",
                contact_text:"Start Building Your Home with Us"
            },

            power_contents:{
                intro_title:"Your Buying Power",
                intro_content:"One thing that sets us apart for other builders is we establish your buying power before moving forward in the process.",
                intro_link1:"Are you financing or paying cash?",
                intro_link2:"Are you qualified by a lender?",
                intro_link3:"Have any Pre Approval Letter?",
                intro_link4:"Monthly Investment Calculator",
                finance_title:"Are you financing or paying cash?",
                finance_content:"One thing that sets us apart for other builders is we establish your buying power before moving forward in the process.",            
                finance_image:"",
                lender_title:"Which Lender have you been working with?",
                lender_content:"If you have not spoken with a lender yet about financing. No problem! We have a list of preferred lenders we can partner you up with.",
                lender_letter_content:"If you have a Pre-Approval letter already from your lender, upload it now.",
                lender_image:"",
                calculator_title:"Monthly Investment Calculator",
                calculator_content:"One thing that sets us apart for other builders is we establish your buying power before moving forward in the process.",
                calc_image:""
            },

            land_contents:{
                header_image:"https://classichomesofmaryland.com/wp-content/uploads/2021/01/lockland-2600x800-aerial-scaled-2600x800_c.jpg",
                header_title:"Identify and Evaluate your Land Situation",
                header_content:"We will provide a free evaluation of your property so we can offer expert advice and guidance about elements like the actual footprint of your new dream house. No land, no problem. Our Land Specialist will be able to connect you with our Realtor Partners to find the perfect lot to build on."
            },
            resp_contents:{
                header_image:"https://classichomesofmaryland.com/wp-content/uploads/2021/01/lockland-2600x800-aerial-scaled-2600x800_c.jpg",
                header_title:"Identify and Esdfr Land Situation",
                header_content:"We will provide a free esdfion of your property so we can offer expert advice and guidance about elements like the actual footprint of your new dream house. No land, no problem. Our Land Specialist will be able to connect you with our Realtor Partners to find the perfect lot to build on.",
                content_title:"Check Each of Your Responsibilities",
                content_content:"This form is for budgeting purposes only.Ranges are based on averages from past customers and are shown to assist in budgeting.You will be getting bids for you lot to determine the actual cost."
            },
            browse_contents:{
                carousel_items: [
                    {
                    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg',
                    title:"Your Advertizing Words",
                    subtitle:"Your advertizing subtitle",
                    content:"Your advertizing subtitle Your advertizing subtitle Your advertizing subtitle Your advertizing subtitle Your advertizing subtitle "
                    },
                    {
                    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg',
                    title:"Your Advertizing Words",
                    subtitle:"Your advertizing subtitle",
                    content:"Your advertizing subtitle Your advertizing subtitle Your advertizing subtitle Your advertizing subtitle Your advertizing subtitle "
                    }
                ],
            },
            image_upload_index:0,
            browsepage_updating:false,
            resp_content_content_edit:false,
            resp_content_title_edit:false,
            land_header_content_edit:false,
            land_header_title_edit:false,
            resp_header_content_edit:false,
            resp_header_title_edit:false,
            power_calculator_title_edit:false,
            power_calculator_content_edit:false,
            power_lender_title_edit:false,
            power_lender_content_edit:false,
            power_lender_letter_content_edit:false,
            power_finance_title_edit:false,
            power_finance_content_edit:false,
            power_intro_link1_edit:false,
            power_intro_link2_edit:false,
            power_intro_link3_edit:false,
            power_intro_link4_edit:false,
            power_intro_content_edit:false,
            power_intro_title_edit:false,
            home_contact_text_edit:false,
            home_contact_title_edit:false,
            project_title_edit:[0,0,0,0,0,0],
            testimonial_model:0,
            rating:5,
            home_steps_title_edit:false,
            home_step_btn_edit:false,
            home_step_content_edit:false,
            home_step_title_edit:false,
            home_step_tab:'',
            home_video_pretitle_visibility:false,
            home_video_title_visibility:false,
            home_video_btn_visibility:false,
            slide_image_change_index:0,
            home_step_image_change_index:0,
            home_projects_image_change_index:0,
            homepage_updating:false,
            power_updating:false,
            resp_updating:false,
            land_updating:false,
            browse_updating:false,
            snackbar:false,
            snackbar_color:"",
            snackbar_text:"",
            
        }
    },
    components:{
        LandSvg,
        DesignSvg,
        HomeCare,
        VImageInput
    },
    mounted(){
        this.fetchPageContents()
    },
    watch:{},
    computed:{},
    methods:{
        async fetchPageContents(){
            let res = await this.$axios.get('/api/pagecontents/allpages')
            console.log(res.data.data)
            let page_data = [...res.data.data]
            page_data.forEach((element,i) => {
                if(element.pageName == 'homepage'){
                this.homepage_contents = {...page_data[i].pageContents}
                this.homepage_contents.home_steps.forEach((step,i) => {
                    step.id = "main_step"+i;
                    step.loading=false
                });
                this.homepage_contents.home_testimonials.forEach((item,i) => {
                    item.id = "main_step"+i;
                    item.processing_image=item.img
                });
                this.homepage_contents.home_projects.forEach((item,i) => {
                    if(!item.id)item.id=Math.floor(Math.random() * 10000000)
                    item.loading=false
                });
                }else if(element.pageName == 'buying_power'){
                    this.power_contents = {...page_data[i].pageContents}
                }else if(element.pageName == 'land'){
                    this.land_contents = {...page_data[i].pageContents}
                }else if(element.pageName == 'resp'){
                    this.resp_contents = {...page_data[i].pageContents}
                }else if(element.pageName == 'browse'){
                    this.browse_contents = {...page_data[i].pageContents}
                }
            });
        },
        newSlide(){
            let temp_obj = {
                id:Math.floor(Math.random() * 1000000),
                loading:false,
                image:"",
                title:"New Slide Title",
                subtitle:"New Slide Subtitle",
                content:"New slide content..."
            }
            this.homepage_contents.carousel_items.push(temp_obj)
        },
        slideImageClick(i){
            this.$refs.slide_image_input.click()
            this.slide_image_change_index = i
            this.image_upload_index = this.homepage_contents.carousel_items[i].id
        },
        onSlideImageChange(e){
            let reader = new FileReader()
            reader.onload = async (re)=>{
                let temp_image_index = this.image_upload_index
                //this.homepage_contents.carousel_items[this.slide_image_change_index].image = re.target.result
              
                this.homepage_contents.carousel_items[this.slide_image_change_index].loading=true
                let temp_data = await this.$utility.uploadImage(re.target.result,temp_image_index)
                this.homepage_contents.carousel_items.forEach(item => {
                    if(item.id == temp_image_index){
                        item.image = temp_data.location
                        item.id=temp_data.name
                        item.loading=false
                        return false
                    }
                });
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },
        onHomeStepImageChange(e){
            let reader = new FileReader()
            reader.onload = async (re)=>{
                let temp_image_index = this.image_upload_index
                //this.homepage_contents.carousel_items[this.slide_image_change_index].image = re.target.result
                this.homepage_contents.home_steps[this.slide_image_change_index].loading=true
                let temp_data = await this.$utility.uploadImage(re.target.result,temp_image_index)
                this.homepage_contents.home_steps.forEach(item => {
                    if(item.id == temp_image_index){
                        item.image = temp_data.location
                        item.id=temp_data.name
                        item.loading=false
                        return false
                    }
                });
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },
        async uploadTestimonialAvatar(i,id){
            let temp_image_index = id
            //this.homepage_contents.carousel_items[this.slide_image_change_index].image = re.target.result
            this.homepage_contents.home_testimonials[i].loading=true
            let temp_data = await this.$utility.uploadImage(this.homepage_contents.home_testimonials[i].processing_image,temp_image_index)
            this.homepage_contents.home_testimonials.forEach(item => {
                if(item.id == temp_image_index){
                    item.img = temp_data.location
                    item.id=temp_data.name
                    item.loading=false
                    return false
                }
            });
        },
        homeStepImageClick(i,id){
            this.$refs.home_step_image_input.click()
            this.image_upload_index = id
            this.slide_image_change_index=i
        },
        
        homeVideoClick(){
            this.$refs.main_video_input.click()
        },
        async onHomeVideoChange(e){
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            formData.append('name', "main_video");
            let temp_data = await this.$utility.uploadFile(formData,"main_video",false)
            this.homepage_contents.main_video = temp_data.location
        },
        homeVideoPosterClick(){
            this.$refs.video_poster_input.click()
        },
        async onHomeVideoPosterChange(e){
            let reader = new FileReader()
            reader.onload = async (re)=>{
                let temp_data = await this.$utility.uploadImage(re.target.result,"main_video_poster",false)
                this.homepage_contents.main_video_poster = temp_data.location
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },
        homeprojectsImageClick(i,id){
            this.$refs.home_projects_image_input.click()
            this.home_projects_image_change_index = i
            this.image_upload_index = id
        },
       
        async onHomeProjectsImageChange(e){
            let reader = new FileReader()
            reader.onload = async (re)=>{
                let temp_image_index = this.image_upload_index
                //this.homepage_contents.carousel_items[this.slide_image_change_index].image = re.target.result
                this.homepage_contents.home_projects[this.home_projects_image_change_index].loading=true
                let temp_data = await this.$utility.uploadImage(re.target.result, temp_image_index)
                this.homepage_contents.home_projects.forEach(item => {
                    if(item.id == temp_image_index){
                        item.image = temp_data.location
                        item.id=temp_data.name
                        item.loading=false
                        return false
                    }
                });
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },
        makeLineBreak(str){
            return str.replace(/(?:\r\n|\r|\n)/g, '<br/>')
        },
        newTestimonial(){
            let temp_obj ={
                id:Math.floor(Math.random() * 10000000),
                text:"",
                img:"",
                name:"Name",
                location:"Location",
                processing_image:"",
                loading:false
            }
            this.homepage_contents.home_testimonials.push(temp_obj)
        },
        async saveHomePage(){
            this.homepage_updating = true
            this.homepage_contents.home_testimonials.forEach(element => {
                element.processing_image=""
            });
            try{
                let temp_post_data = {
                    page_name:"homepage",
                    page_contents:this.homepage_contents
                }
                let res = await this.$axios.put('/api/pagecontents/homepage', temp_post_data)
                console.log(res.data.data)
                this.snackbar_color="success"
                this.snackbar_text="Submit success!"
                this.snackbar=true
                this.homepage_updating = false
            } catch (e) {                                                            
                alert("Error occured.")
                this.homepage_updating= false
            }
        },
        async savePowerPage(){
            this.power_updating = true
            try{
                let temp_post_data = {
                    page_name:"buying_power",
                    page_contents:this.power_contents
                }
                let res = await this.$axios.put('/api/pagecontents/buying_power', temp_post_data)
                console.log(res.data.data)
                this.snackbar_color="success"
                this.snackbar_text="Submit success!"
                this.snackbar=true
                this.power_updating = false
            } catch (e) {                                                            
                alert("Error occured.")
                this.power_updating= false
            }
        },
        async saveLandPage(){
            this.land_updating = true
            try{
                let temp_post_data = {
                    page_name:"land",
                    page_contents:this.land_contents
                }
                let res = await this.$axios.put('/api/pagecontents/land', temp_post_data)
                console.log(res.data.data)
                this.snackbar_color="success"
                this.snackbar_text="Submit success!"
                this.snackbar=true
                this.land_updating = false
            } catch (e) {                                                            
                alert("Error occured.")
                this.land_updating= false
            }
        },
        async saveRespPage(){
            this.resp_updating = true
            try{
                let temp_post_data = {
                    page_name:"resp",
                    page_contents:this.resp_contents
                }
                let res = await this.$axios.put('/api/pagecontents/resp', temp_post_data)
                console.log(res.data.data)
                this.snackbar_color="success"
                this.snackbar_text="Submit success!"
                this.snackbar=true
                this.resp_updating = false
            } catch (e) {                                                            
                alert("Error occured.")
                this.resp_updating= false
            }
        },
        async saveBrowsePage(){
            this.browse_updating = true
            try{
                let temp_post_data = {
                    page_name:"browse",
                    page_contents:this.browse_contents
                }
                let res = await this.$axios.put('/api/pagecontents/browse', temp_post_data)
                console.log(res.data.data)
                this.snackbar_color="success"
                this.snackbar_text="Submit success!"
                this.snackbar=true
                this.browse_updating = false
            } catch (e) {                                                            
                alert("Error occured.")
                this.browse_updating= false
            }
        },
        powerFinanceImageClick(){
            this.$refs.power_finance_image_input.click()
        },
        onPowerFinanceImageChange:function(e){
            let reader = new FileReader()
            reader.onload = (re)=>{
                this.power_contents.finance_image = re.target.result
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },
        powerLenderImageClick(){
            this.$refs.power_lender_image_input.click()
        },
        onPowerLenderImageChange:function(e){
            let reader = new FileReader()
            reader.onload = (re)=>{
                this.power_contents.lender_image = re.target.result
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },

        powerCalcImageClick(){
            this.$refs.power_calc_image_input.click()
        },
        onPowerCalcImageChange:function(e){
            let reader = new FileReader()
            reader.onload = (re)=>{
                this.power_contents.calc_image = re.target.result
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },

        landHeaderImageClick(){
            this.$refs.land_header_image_input.click()
        },
        onLandHeaderImageChange:function(e){
            let reader = new FileReader()
            reader.onload = (re)=>{
                this.land_contents.header_image = re.target.result
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },

        respHeaderImageClick(){
            this.$refs.resp_header_image_input.click()
        },
        onRespHeaderImageChange:function(e){
            let reader = new FileReader()
            reader.onload = (re)=>{
                this.resp_contents.header_image = re.target.result
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },

        newBrowseSlide(){
            let temp_obj = {
                image:"",
                title:"New Slide Title",
                subtitle:"New Slide Subtitle",
                content:"New slide content..."
            }
            this.browse_contents.carousel_items.push(temp_obj)
        },
        browseSlideImageClick(i){
            this.$refs.browse_slide_image_input.click()
            this.slide_image_change_index = i
        },
        onBrowseSlideImageChange:function(e){
            let reader = new FileReader()
            reader.onload = (re)=>{
                this.browse_contents.carousel_items[this.slide_image_change_index].image = re.target.result
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },
    }
}
</script>
<style>
.v-main__wrap>.container{
    max-width: 100% !important;
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
.section_header{
line-height: 1.2;
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
      text-shadow: rgb(0 0 0 / 90%) 0px 0px 6px;
    }

    .white_input .v-input__slot{
        background:#fff !important;
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

    .power_video{
        cursor: pointer;
        width: 100%;
        box-shadow: rgb(50 50 93 / 25%) 0px 30px 60px -12px, rgb(0 0 0 / 30%) 0px 18px 36px -18px;
    }
    .video_container{
        position:relative;        
    }
    .video_play_button{
        position:absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
    }

    .flesh{
        background: #f5ebdd;
    }

    .shadow_far{
        box-shadow: rgb(255 255 255 / 10%) 0px 1px 1px 0px inset, rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px;
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

    .header_image_section{
        position:relative;
        background-size: cover !important;
        padding-bottom: 100px;
    }
    .section_subtext{
        font-size: 19px;
    }
    .section_title{
        font-size: 39px;
        margin-top: 25px;
        margin-bottom: 6px;
    }
    button{
        text-transform:none !important;
    }
</style>