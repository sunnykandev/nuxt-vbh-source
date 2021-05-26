<template>

<div style="width:100%;">
    <v-container style="width:100%;">
        <v-row>
            <v-col cols="12" sm="4" md="4" lg="3" style="border:solid 1px #ccc; border-radius:7px;">
                <v-select
                  :items="state_items"
                  label="State"
                  outlined
                ></v-select>

                <v-select
                  :items="county_items"
                  label="County"
                  outlined
                ></v-select>

                <v-select
                  :items="land_ownership_items"
                  label="Land ownership"
                  outlined
                ></v-select>

                <v-text-field
                  label="Street Address"
                  outlined
                ></v-text-field>

                <v-text-field
                  label="City"
                  outlined
                ></v-text-field>

                <v-text-field
                  label="Zip Code"
                  outlined
                  type="number"
                ></v-text-field>
            </v-col>

            <v-col cols="12" sm="8" md="8" lg="9">
                <v-row class="pl-sm-10 pl-md-15 pl-lg-20">
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <h3 class="radio_group_title">Sewage Treatment</h3>
                    <v-radio-group
                      v-model="sewage"
                      column
                    >
                      <v-radio
                        label="I have public sewer"
                        color="primary"
                        value="1"
                      ></v-radio>
                      <v-radio
                        label="I currently have a septic system"
                        color="primary"
                        value="2"
                      ></v-radio>
                      <v-radio
                        label="I have a perc test and need a septic system"
                        color="primary"
                        value="3"
                      ></v-radio>
                      <v-radio
                        label="I need a perc test"
                        color="primary"
                        value="4"
                      ></v-radio>
                      <v-radio
                        label="I'm not sure"
                        color="primary"
                        value="5"
                      ></v-radio>                      
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <h3 class="radio_group_title">Water Service</h3>
                    <v-radio-group
                      v-model="water"
                      column
                    >
                      <v-radio
                        label="I have public sewer"
                        color="primary"
                        value="6"
                      ></v-radio>
                      <v-radio
                        label="I currently have a septic system"
                        color="primary"
                        value="7"
                      ></v-radio>
                      <v-radio
                        label="I have a perc test and need a septic system"
                        color="primary"
                        value="8"
                      ></v-radio>
                      <v-radio
                        label="I need a perc test"
                        color="primary"
                        value="9"
                      ></v-radio>
                      <v-radio
                        label="I'm not sure"
                        color="primary"
                        value="10"
                      ></v-radio>                      
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <h3 class="radio_group_title">Driveway Status</h3>
                    <v-radio-group
                      v-model="water"
                      column
                    >
                      <v-radio
                        label="I have public sewer"
                        color="primary"
                        value="6"
                      ></v-radio>
                      <v-radio
                        label="I currently have a septic system"
                        color="primary"
                        value="7"
                      ></v-radio>
                      <v-radio
                        label="I have a perc test and need a septic system"
                        color="primary"
                        value="8"
                      ></v-radio>
                      <v-radio
                        label="I need a perc test"
                        color="primary"
                        value="9"
                      ></v-radio>
                      <v-radio
                        label="I'm not sure"
                        color="primary"
                        value="10"
                      ></v-radio>                      
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <h3 class="radio_group_title">My Site Status</h3>
                    <v-radio-group
                      v-model="water"
                      column
                    >
                      <v-radio
                        label="I have public sewer"
                        color="primary"
                        value="6"
                      ></v-radio>
                      <v-radio
                        label="I currently have a septic system"
                        color="primary"
                        value="7"
                      ></v-radio>
                      <v-radio
                        label="I have a perc test and need a septic system"
                        color="primary"
                        value="8"
                      ></v-radio>
                      <v-radio
                        label="I need a perc test"
                        color="primary"
                        value="9"
                      ></v-radio>
                      <v-radio
                        label="I'm not sure"
                        color="primary"
                        value="10"
                      ></v-radio>                      
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <h3 class="radio_group_title">Basement Status</h3>
                    <v-radio-group
                      v-model="water"
                      column
                    >
                      <v-radio
                        label="I have public sewer"
                        color="primary"
                        value="6"
                      ></v-radio>
                      <v-radio
                        label="I currently have a septic system"
                        color="primary"
                        value="7"
                      ></v-radio>
                      <v-radio
                        label="I have a perc test and need a septic system"
                        color="primary"
                        value="8"
                      ></v-radio>
                      <v-radio
                        label="I need a perc test"
                        color="primary"
                        value="9"
                      ></v-radio>
                      <v-radio
                        label="I'm not sure"
                        color="primary"
                        value="10"
                      ></v-radio>                      
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <h3 class="radio_group_title">Natural Gas Service</h3>
                    <v-radio-group
                      v-model="water"
                      column
                    >
                      <v-radio
                        label="I have public sewer"
                        color="primary"
                        value="6"
                      ></v-radio>
                      <v-radio
                        label="I currently have a septic system"
                        color="primary"
                        value="7"
                      ></v-radio>
                      <v-radio
                        label="I have a perc test and need a septic system"
                        color="primary"
                        value="8"
                      ></v-radio>
                      <v-radio
                        label="I need a perc test"
                        color="primary"
                        value="9"
                      ></v-radio>
                      <v-radio
                        label="I'm not sure"
                        color="primary"
                        value="10"
                      ></v-radio>                      
                    </v-radio-group>
                  </v-col>
                </v-row>
            </v-col>            
        </v-row> 
    </v-container>                       
</div> 
</template>

<script>
  export default {
    data: () => ({
      state_items:["Georgia",
        "South Carolina",
        "North Carolina"
      ],
      county_items:["Abbevile",
        "Aiken",
        "Anderson"
      ],
      land_ownership_items:["Receiving Land from a Friend/Relative",
        "Currently Own Land",
        "Need Land"
      ],
      water:"",
      sewage:""
    }),
  }
</script>

<style>
  .radio_group_title{
        background: #cbe5ff;
        color: #0065cd;
        padding: 5px 42px 5px 13px;
        display: inline-block;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 51px;
  }
</style>
<style lang="scss">
</style>