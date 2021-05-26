<template>

<div style="width:100%;">
    <v-container>
        <v-row>
            <v-col cols="12" sm="12" md="4" lg="3">
                <h4 class="mb-2">Recommended Styles</h4>
                <v-select
                :value="selected_style"
                @change="changeStyle"
                :items="styles"
                item-text="title"
                item-value="title"
                return-object
                label="Styles"
                background-color="#e7ebef"
                solo
                ></v-select>
                <div class="d-none d-md-flex" style="flex-direction:column;">
                    <h4 class="mb-2">Individual parts</h4>

                    <v-expansion-panels  
                    v-if="selected_style.categories"
                    class="option_panel">
                        <v-expansion-panel
                        v-for="(category,i) in selected_style.categories"
                        :key="i"
                        >
                            <v-expansion-panel-header expand-icon="$dropdown">
                                {{category}}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list
                                subheader
                                two-line
                                class="colors_list"
                                >                
                                    <v-list-item
                                        v-for="part in category_parts(category)"
                                        :key="part.part"
                                    >
                                        <v-list-item-avatar size="50">
                                        <v-icon
                                            v-if="part.material"
                                            :style="{background:`url(`+part.material+`) center`, backgroundSize:'cover'}"
                                            dark
                                            class="color_icon"
                                        ></v-icon>
                                        <v-icon
                                            v-else
                                            :style="{backgroundColor:part.color}"
                                            dark
                                            class="color_icon"
                                        ></v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                        <v-list-item-title v-text="part.part"></v-list-item-title>

                                        <v-list-item-subtitle v-text="part.colorname"></v-list-item-subtitle>
                                        </v-list-item-content>

                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
                
                <!-- <v-sheet
                v-if="$vuetify.breakpoint.smAndUp"
                >
                    <v-card class="py-4 px-1">
                        <v-select
                        v-for="part in color_items"
                        :key="part.title"
                        item-text="title"
                        item-value="color_name"
                        class="customize_color_select"
                        :items="part.options"
                        :label="part.title"
                        solo
                        >
                            <template v-slot:selection="{item}">    
                                <v-sheet class="d-flex">
                                    <v-avatar
                                        class="mr-2"
                                        :color="item.color"
                                        size="36"
                                    >
                                        <img
                                            v-if="item.image"
                                            :src="item.image"
                                            alt="John"
                                        >
                                    </v-avatar>
                                    <div>
                                        <div class="customize_select_item_title">
                                            {{part.title}}
                                        </div>
                                        <div class="customize_select_item_color_name">
                                            {{item.color_name}}
                                        </div>
                                    </div>
                                </v-sheet>                            
                                <span>
                                   
                                </span>
                            </template>
                            
                            <template v-slot:item="{item}">
                                <v-sheet class="d-flex">
                                    <v-avatar
                                        class="mr-2"
                                        :color="item.color"
                                        size="36"
                                    >
                                        <img
                                            v-if="item.image"
                                            :src="item.image"
                                            alt="John"
                                        >
                                    </v-avatar>
                                </v-sheet> 
                                <span>
                                    {{item.color_name}}
                                </span>
                                
                            </template>
                        </v-select>
                    </v-card>                                
                </v-sheet>
                <v-expansion-panels v-else>
                    <v-expansion-panel>
                        <v-expansion-panel-header expand-icon="$dropdown">
                        Filters
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-list
                            subheader
                            two-line
                            flat
                            dense
                            >                                    
                                <v-list-item-group
                                    multiple
                                >
                                    <v-list-item>
                                    <template v-slot:default="{ active, }">
                                        <v-list-item-action>
                                        <v-checkbox
                                            :input-value="active"
                                            color="primary"
                                        ></v-checkbox>
                                        </v-list-item-action>

                                        <v-list-item-content>
                                        <v-list-item-title>Bathroom4</v-list-item-title>
                                        </v-list-item-content>
                                    </template>
                                    </v-list-item>

                                    <v-list-item>
                                    <template v-slot:default="{ active }">
                                        <v-list-item-action>
                                        <v-checkbox
                                            :input-value="active"
                                            color="primary"
                                        ></v-checkbox>
                                        </v-list-item-action>

                                        <v-list-item-content>
                                        <v-list-item-title>Bathroom4</v-list-item-title>
                                        <v-list-item-subtitle>Add Bathroom4</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </template>
                                    </v-list-item>

                                    <v-list-item>
                                    <template v-slot:default="{ active }">
                                        <v-list-item-action>
                                        <v-checkbox
                                            :input-value="active"
                                            color="primary"
                                        ></v-checkbox>
                                        </v-list-item-action>

                                        <v-list-item-content>
                                        <v-list-item-title>Bathroom4</v-list-item-title>
                                        <v-list-item-subtitle>Add Bathroom4</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </template>
                                    </v-list-item>

                                    <v-list-item>
                                    <template v-slot:default="{ active }">
                                        <v-list-item-action>
                                        <v-checkbox
                                            :input-value="active"
                                            color="primary"
                                        ></v-checkbox>
                                        </v-list-item-action>

                                        <v-list-item-content>
                                        <v-list-item-title>Bathroom4</v-list-item-title>
                                        <v-list-item-subtitle>Add Bathroom4</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </template>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels> -->
            </v-col>  

            <v-col cols="12" sm="12" md="8" lg="9">
                <v-img
                class="elevation-3 rounded"
                :src="selected_style.image"
                >                
                </v-img>

                <div class="d-flex d-md-none" style="flex-direction:column;margin-top:30px;">
                    <h4 class="mb-2">Individual parts</h4>

                    <v-expansion-panels  
                    v-if="selected_style.categories"
                    class="option_panel">
                        <v-expansion-panel
                        v-for="(category,i) in selected_style.categories"
                        :key="i"
                        >
                            <v-expansion-panel-header expand-icon="$dropdown">
                                {{category}}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list
                                subheader
                                two-line
                                class="colors_list"
                                >                
                                    <v-list-item
                                        v-for="part in category_parts(category)"
                                        :key="part.part"
                                    >
                                        <v-list-item-avatar size="50">
                                        <v-icon
                                            v-if="part.material"
                                            :style="{background:`url(`+part.material+`) center`, backgroundSize:'cover'}"
                                            dark
                                            class="color_icon"
                                        ></v-icon>
                                        <v-icon
                                            v-else
                                            :style="{backgroundColor:part.color}"
                                            dark
                                            class="color_icon"
                                        ></v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                        <v-list-item-title v-text="part.part"></v-list-item-title>

                                        <v-list-item-subtitle v-text="part.colorname"></v-list-item-subtitle>
                                        </v-list-item-content>

                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </v-col>  
        </v-row> 
    </v-container>                       
</div> 
</template>

<script>
  export default {
    props:['styles', 'changeStyle','selected_style'],
    data: () => ({
      style_color_data:[
          {
              category:"body",
              part_name:"Siding",
              color_name:"Everest",
              color:"#ff0000",
              material:""
          },
          {
              category:"body",
              part_name:"Masonry",
              color_name:"Northampton Parkway",
              color:"",
              material:"https://res.cloudinary.com/renderinghouse/image/upload/anewgo/library/textures/StoneCraft-LaurelCavernLedge-Asher"
          },
          {
              category:"accent",
              part_name:"Door",
              color_name:"Black",
              color:"#000",
              material:""
          },
          {
              category:"accent",
              part_name:"Shutters",
              color_name:"Black",
              color:"#000",
              material:""
          },
          {
              category:"accent",
              part_name:"Garage",
              color_name:"White",
              color:"#fff",
              material:""
          },
          {
              category:"accent",
              part_name:"Shingles",
              color_name:"Moire Black",
              color:"#000",
              material:""
          },
          {
              category:"trim",
              part_name:"Trim",
              color_name:"White",
              color:"#fff",
              material:""
          },
          {
              category:"trim",
              part_name:"Window Frame",
              color_name:"White",
              color:"#fff",
              material:""
          },
      ],
      drawer: true,
      group:true,
      prices:["Any",
        "Under $25",
        "$100 to $500",
        "Over $500"
      ],
      recommend_items:["Dark heavy","Bright sunny","Royal style","Modern style","Natural style","Castle style"],
      color_items:[
          {title:"door",
            options:[
                {
                    image:"",
                    color:"#729",
                    color_name:"red",
                },
                {                    
                    image:"",
                    color:"#29d",
                    color_name:"blue",
                },
                {                    
                    image:"https://preview.colorlib.com/theme/homes/img/rooms/1.jpg",
                    color:"#d38",
                    color_name:"black",
                },
                {                    
                    image:"",
                    color:"#349",
                    color_name:"green",
                },
            ]
          },
          {title:"roof",
            options:[
                {
                    image:"",
                    color:"#758",
                    color_name:"redss",
                },
                {                    
                    image:"",
                    color:"#254",
                    color_name:"bluess",
                },
                {                    
                    image:"",
                    color:"#5d8",
                    color_name:"blacksd",
                },
                {                    
                    image:"https://preview.colorlib.com/theme/homes/img/rooms/1.jpg",
                    color:"#38d",
                    color_name:"greenss",
                },
            ]
          },
      ],
    }),
    mounted(){
        console.log("External plans mounted")
        this.styles.forEach(style => {
            let temp_categories = []
            style.parts.forEach(part => {
                temp_categories.push(part.category)
            });
            temp_categories = [...new Set(temp_categories)]
            style.categories = temp_categories
        });
        if(!this.selected_style){
            this.changeStyle(this.styles[0])
        }else{
            let temp_categories = []
            this.selected_style.parts.forEach(part => {
                temp_categories.push(part.category)
            });
            temp_categories = [...new Set(temp_categories)]
            this.selected_style.categories = temp_categories
            this.changeStyle(this.selected_style)
        }
    },
    watch: {
        styles:function(newVal, oldVal){
            newVal.forEach(style => {
                let temp_categories = []
                style.parts.forEach(part => {
                    temp_categories.push(part.category)
                });
                temp_categories = [...new Set(temp_categories)]
                style.categories = temp_categories
            });
            this.changeStyle(newVal[0])
        }
    },
    computed: {
        category_parts(){
            return category=>{
                return this.selected_style.parts.filter(function (part) {
                    return part.category == category
                })
            }
        },
        bodyParts: function () {
            return this.style_color_data.filter(function (style) {
                return style.category == "body"
            })
        },
        accentParts: function () {
            return this.style_color_data.filter(function (style) {
                return style.category == "accent"
            })
        },
        trimParts: function () {
            return this.style_color_data.filter(function (style) {
                return style.category == "trim"
            })
        },
    },
    methods:{
    }
  }
</script>

<style>
    .customize_color_select.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot{
        box-shadow: none;
    }
    .v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child{
        margin-right: 10px;
    }
    .v-expansion-panel-content__wrap{
        padding: 0 0px 16px;
    }
    .customize_color_select .v-input__control{
        height: 48px;
    }
    .customize_select_item_title{
        font-size: 18px;
    }
    .customize_select_item_color_name{
        font-size: 12px;
    }
    .colors_list .v-list-item__subtitle{
        white-space: pre-wrap;
    }
    .color_icon{
        border: solid 1px #bbb;
    }
    .colors_list{
    }
    .v-avatar{
        margin-top: 0px !important;
        margin-bottom: 0px !important;
    }
</style>