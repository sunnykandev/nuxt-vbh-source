<template>

<div style="width:100%;">
    <v-container style="width:100%;">
        <v-row>
            <v-col cols="12" sm="4" md="3" lg="3">
                <v-sheet
                v-if="$vuetify.breakpoint.smAndUp"
                >
                    <v-card class="pt-2">
                        <v-tabs
                        show-arrows
                        center-active
                        v-model="tab"
                        >
                            <v-tabs-slider color="primary"></v-tabs-slider>

                            <v-tab
                                v-for="floor in floor_plan_data"
                                :key="floor.floor_number"
                                :href="'#tab-' + floor.floor_number"
                            >
                                Floor {{ floor.floor_number }}
                            </v-tab>                            
                        </v-tabs>
                        <v-divider></v-divider>
                        <v-tabs-items
                            v-model="tab"
                        >
                            <v-tab-item
                                v-for="floor in floor_plan_data"
                                :key="floor.floor_number"
                                :value="'tab-' + floor.floor_number"
                            >
                                <v-list
                                subheader
                                two-line
                                flat
                                dense
                                >    
                                    <v-list-item-group
                                        multiple
                                    >
                                        <v-list-item
                                        v-for="option in floor.options"
                                        :key="option.title"
                                        >
                                            <template v-slot:default="{active}">
                                                <v-list-item-action>
                                                    <v-checkbox
                                                        :input-value="active"
                                                        color="primary"
                                                    ></v-checkbox>
                                                </v-list-item-action>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{option.title}}</v-list-item-title>
                                                    <v-list-item-subtitle>{{option.description}}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </template>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-tab-item>
                        </v-tabs-items>                       
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
                </v-expansion-panels>
            </v-col>  

            <v-col cols="12" sm="8" md="9" lg="9">
                <v-img
                class=""
                src="https://preview.colorlib.com/theme/homes/img/rooms/1.jpg"
                >                
                </v-img>
            </v-col>  
        </v-row> 
    </v-container>                       
</div> 
</template>

<script>
  export default {
    data: () => ({
        tab:"tab-1",
      drawer: true,
      group:true,
      prices:["Any",
        "Under $25",
        "$100 to $500",
        "Over $500"
      ],
      floor_plan_data:[
          {
              floor_number:1,
              options:[
                  {
                      title:"Bathroom4",
                      description:"Add bathroom4"
                  },
                  {
                      title:"Garage2",
                      description:"Add garage"
                  },
                  {
                      title:"Bedroom5",
                      description:"Add bedroom5"
                  },
              ]
          },
          {
              floor_number:2,
              options:[
                  {
                      title:"Bathroom6sdf",
                      description:"Add bathroom4asdfs"
                  },
                  {
                      title:"Garage2 sdf ",
                      description:"Add garage asfd a"
                  },
                  {
                      title:"Bedroom5 asdf",
                      description:"Add bedroom5 ass df"
                  },
              ]
          },
      ],
    }),
  }
</script>

<style>
    .v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child{
        margin-right: 10px;
    }
    .v-expansion-panel-content__wrap{
        padding: 0 0px 16px;
    }
</style>