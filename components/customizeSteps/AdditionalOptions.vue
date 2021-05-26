<template>

<div style="width:100%;" class="pb-5">
    <v-container style="width:100%;">
        <v-row>
            <v-col cols="12" sm="12" md="6" lg="4">                
                <v-expansion-panels  class="option_panel">
                    <!-- <v-expansion-panel>
                        <v-expansion-panel-header expand-icon="$dropdown">
                            OYOL Decisions
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
                                        <template>
                                            <v-list-item-content>
                                                <v-header>Airborne Debris Window Protection (High Wind Zones - per Window)</v-header>
                                                <v-text-field
                                                    type="number"
                                                    dense
                                                    label="How many?"
                                                    outlined
                                                ></v-text-field>
                                            </v-list-item-content>
                                            <v-list-item-action>
                                                <v-popover
                                                placement="right"
                                                offset="10"
                                                trigger="hover"
                                                >
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                    </v-btn>
                                                    <template slot="popover">
                                                        <v-img
                                                        width="300"
                                                        height="200"
                                                        class=""
                                                        src="https://images-na.ssl-images-amazon.com/images/I/51KL4z3aNlL._AC_SY741_.jpg"
                                                        >                
                                                        </v-img>
                                                        <input class="tooltip-content"  placeholder="Tooltip content" />
                                                        <p>
                                                        sdfsfsadf
                                                        </p>
                                                        asdfasdf
                                                        <a v-close-popover>Close</a>
                                                    </template>
                                                </v-popover>                                                
                                            </v-list-item-action>
                                        </template>                                        
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-expansion-panel-content>
                    </v-expansion-panel> -->

                    <v-expansion-panel
                    v-for="(category,i) in categories"
                    :key="i"
                    >
                        <v-expansion-panel-header expand-icon="$dropdown">
                        {{category}}
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
                                    <v-list-item
                                    v-for="(option,i) in categoryOptions(category)"
                                    :key="i"
                                    >
                                        <v-list-item-action
                                        v-if="option.type=='check'"
                                        >
                                            <v-checkbox
                                                :value="option.check"
                                                @change="changeOptionCheck($event,option.title)"
                                                color="primary"
                                            ></v-checkbox>
                                        </v-list-item-action>

                                        <v-list-item-content>
                                            <v-list-item-title v-if="option.type=='check' || option.type=='number'">{{option.title}}</v-list-item-title>
                                            <v-list-item-subtitle  v-if="option.type=='check' || option.type=='number'">{{option.desc}}</v-list-item-subtitle>

                                            <v-text-field
                                                v-if="option.type=='number'"
                                                label="Amount"
                                                :value="option.number"
                                                @input="changeOptionAmount($event, option.title)"
                                                type="number"
                                                outlined
                                                dense
                                            ></v-text-field>

                                            <v-sheet
                                            class="option_select_container"
                                            v-if="option.type=='select' || option.type=='select_number'"
                                            >
                                                <v-select
                                                :value="option.select"
                                                @change="changeOptionSelect($event,option.title)"
                                                return-object
                                                item-value="select_id"
                                                class="customize_option_select"
                                                :items="option.selections"
                                                :label="option.title"
                                                solo
                                                flat
                                                >
                                                    <template v-slot:selection="{item}">    
                                                        <v-sheet class="d-flex">
                                                            <v-avatar
                                                                rounded
                                                                class="mr-2"
                                                                size="36"
                                                            >
                                                                <img
                                                                    v-if="item.option_img"
                                                                    :src="item.option_img"
                                                                    alt="selection image"
                                                                >
                                                            </v-avatar>
                                                            <div class="customize_option_select_content">
                                                                <div class="customize_option_select_title">
                                                                    {{option.title}}
                                                                </div>
                                                                <div class="customize_option_select_selection_title">
                                                                    {{item.option_title}}
                                                                </div>
                                                            </div>
                                                        </v-sheet>
                                                    </template>
                                                    
                                                    <template v-slot:item="{item}">
                                                        <v-sheet class="d-flex select_item_container">
                                                            <v-avatar
                                                                rounded
                                                                class="mr-2"
                                                                size="36"
                                                            >
                                                                <img
                                                                    v-if="item.option_img"
                                                                    :src="item.option_img"
                                                                    alt="selection image"
                                                                >
                                                            </v-avatar>
                                                            <div class="customize_option_select_item_content">
                                                                <div class="customize_option_select_item_title">
                                                                    {{item.option_title}}
                                                                </div>
                                                                <div class="customize_option_select_item_desc">
                                                                    <span v-if="item.select_id" class="option_price">
                                                                        <span v-if="item.price!=0">
                                                                            ${{item.price}}
                                                                            <span v-if="option.type=='select_number'">/
                                                                                <span v-if="option.unit">{{option.unit}}</span>
                                                                                <span v-else>each</span>
                                                                            </span>
                                                                        </span>
                                                                        <span v-else>
                                                                            Included (free)
                                                                        </span>
                                                                    </span>
                                                                    <span v-else>
                                                                        Cancel this option
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </v-sheet> 
                                                    </template>
                                                </v-select>
                                                <v-text-field
                                                    v-if="option.type=='select_number'&&option.select&&option.select.select_id"
                                                    label="Amount"
                                                    :value="option.number"
                                                    @input="changeOptionAmount($event, option.title)"
                                                    type="number"
                                                    outlined
                                                    dense
                                                ></v-text-field>
                                            </v-sheet>
                                            
                                        </v-list-item-content>

                                        <v-list-item-action>
                                            <h5 class="option_price_container"
                                            v-if="!option.select"
                                            >
                                                <span v-if="option.price" class="option_price">${{option.price}}</span>
                                                <span v-if="!option.price&&option.type!='select'&&option.type!='select_number'" class="option_price">Included</span>
                                                <span class="option_unit" v-if="option.price&&(option.type=='number'||option.type=='select_number')">/unit</span>
                                            </h5>

                                            <h5 class="option_price_container"
                                            v-if="option.select"
                                            >   
                                                <span v-if="option.select.price==0 && option.select.select_id!=0" class="option_price">Included</span>
                                                <span v-else>
                                                    <span v-if="option.select.price" class="option_price">${{option.select.price}}</span>
                                                    <span class="option_unit" v-if="option.select.price&&(option.type=='number'||option.type=='select_number')">/unit</span>
                                                </span>
                                                
                                            </h5>

                                            <v-popover
                                            placement="right"
                                            offset="10"
                                            trigger="click"
                                            >
                                                <v-btn icon>
                                                    <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                </v-btn>
                                                <template slot="popover">
                                                    <v-img
                                                    v-if="option.select"
                                                    width="300"
                                                    height="200"
                                                    class=""
                                                    :src="option.select.option_img"
                                                    >
                                                    </v-img>

                                                    <v-img
                                                    v-if="!option.select"
                                                    width="300"
                                                    height="200"
                                                    class=""
                                                    :src="option.help_img"
                                                    >
                                                    </v-img>

                                                    <v-sheet class="option_tooltip_title" style="max-width:300px;">
                                                        <h4
                                                        class="mb-1"
                                                        v-if="option.select"
                                                        >
                                                            {{option.select.option_title}}
                                                        </h4>

                                                        <span
                                                        v-if="!option.select"
                                                        >
                                                            {{option.title}}
                                                        </span>
                                                    </v-sheet>
                                                    <v-sheet class="option_tooltip_desc" style="max-width:300px;">
                                                        <span
                                                        v-if="option.select"
                                                        >
                                                            {{option.select.option_desc}}
                                                        </span>
                                                        <span
                                                        v-if="!option.select"
                                                        >
                                                            {{option.help_desc}}
                                                        </span>
                                                    </v-sheet>
                                                </template>
                                            </v-popover>                                                
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <!-- <v-expansion-panel>
                        <v-expansion-panel-header expand-icon="$dropdown">
                        Customize Plan
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-radio-group
                            v-model="radios"
                            class="radio_group"
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
                                        <v-list-item>
                                        <template v-slot:default="{}">                                           

                                            <v-list-item-content>
                                                <v-radio
                                                    value="radio-1"
                                                >
                                                    <template v-slot:label>
                                                    <div>
                                                        <img src="~/assets/aa.jpg" alt="">
                                                        <div class="radio_title">12X12 Screened Deck</div>
                                                        <div class="radio_subtitle">$5000</div>
                                                    </div>
                                                    </template>
                                                </v-radio>             
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-popover
                                                placement="right"
                                                offset="10"
                                                trigger="hover"
                                                >
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                    </v-btn>
                                                    <template slot="popover">
                                                        <v-img
                                                        width="300"
                                                        height="200"
                                                        class=""
                                                        src="https://preview.colorlib.com/theme/homes/img/rooms/1.jpg"
                                                        >                
                                                        </v-img>
                                                        <input class="tooltip-content"  placeholder="Tooltip content" />
                                                        <p>
                                                        sdfsfsadf
                                                        </p>
                                                        asdfasdf
                                                        <a v-close-popover>Close</a>
                                                    </template>
                                                </v-popover>                                                
                                            </v-list-item-action>
                                        </template>
                                        </v-list-item>

                                        <v-list-item>
                                        <template v-slot:default="{}">                                            
                                            <v-list-item-content>
                                                 <v-radio
                                                    value="radio-2"
                                                >
                                                    <template v-slot:label>
                                                    <div>
                                                        <img src="~/assets/bb.jpg" alt="">
                                                        <div class="radio_title">12X12 Screened In Deck</div>
                                                        <div class="radio_subtitle">$14500</div>
                                                    </div>
                                                    </template>
                                                </v-radio>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-popover
                                                placement="right"
                                                offset="10"
                                                trigger="hover"
                                                >
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                    </v-btn>
                                                    <template slot="popover">
                                                        <v-img
                                                        width="300"
                                                        height="200"
                                                        class=""
                                                        src="https://preview.colorlib.com/theme/homes/img/rooms/1.jpg"
                                                        >                
                                                        </v-img>
                                                        <input class="tooltip-content"  placeholder="Tooltip content" />
                                                        <p>
                                                        sdfsfsadf
                                                        </p>
                                                        asdfasdf
                                                        <a v-close-popover>Close</a>
                                                    </template>
                                                </v-popover>                                                
                                            </v-list-item-action>

                                        </template>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-radio-group>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header expand-icon="$dropdown">
                        Fireplace
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-radio-group
                            v-model="radios"
                            class="radio_group"
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
                                        <v-list-item>
                                        <template v-slot:default="{}">                                           

                                            <v-list-item-content>
                                                <v-radio
                                                    value="radio-1"
                                                >
                                                    <template v-slot:label>
                                                    <div>
                                                        <div class="radio_title">Gas Fireplace</div>
                                                        <div class="radio_subtitle">$5000</div>
                                                    </div>
                                                    </template>
                                                </v-radio>             
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-popover
                                                placement="right"
                                                offset="10"
                                                trigger="hover"
                                                >
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                    </v-btn>
                                                    <template slot="popover">
                                                        <v-img
                                                        width="300"
                                                        height="200"
                                                        class=""
                                                        src="https://preview.colorlib.com/theme/homes/img/rooms/1.jpg"
                                                        >                
                                                        </v-img>
                                                        <input class="tooltip-content"  placeholder="Tooltip content" />
                                                        <p>
                                                        sdfsfsadf
                                                        </p>
                                                        asdfasdf
                                                        <a v-close-popover>Close</a>
                                                    </template>
                                                </v-popover>                                                
                                            </v-list-item-action>
                                        </template>
                                        </v-list-item>

                                        <v-list-item>
                                        <template v-slot:default="{}">                                            
                                            <v-list-item-content>
                                                 <v-radio
                                                    value="radio-2"
                                                >
                                                    <template v-slot:label>
                                                    <div>
                                                        <div class="radio_title">Electric Fireplace</div>
                                                        <div class="radio_subtitle">$3500</div>
                                                    </div>
                                                    </template>
                                                </v-radio>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-popover
                                                placement="right"
                                                offset="10"
                                                trigger="hover"
                                                >
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                    </v-btn>
                                                    <template slot="popover">
                                                        <v-img
                                                        width="300"
                                                        height="200"
                                                        class=""
                                                        src="https://preview.colorlib.com/theme/homes/img/rooms/1.jpg"
                                                        >                
                                                        </v-img>
                                                        <input class="tooltip-content"  placeholder="Tooltip content" />
                                                        <p>
                                                        sdfsfsadf
                                                        </p>
                                                        asdfasdf
                                                        <a v-close-popover>Close</a>
                                                    </template>
                                                </v-popover>                                                
                                            </v-list-item-action>

                                        </template>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-radio-group>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header expand-icon="$dropdown">
                        Electrical Options
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-radio-group
                            v-model="radios"
                            class="radio_group"
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
                                        <v-list-item>
                                        <template v-slot:default="{}">                                           

                                            <v-list-item-content>
                                                <v-radio
                                                    value="radio-1"
                                                >
                                                    <template v-slot:label>
                                                    <div>
                                                        <img src="~/assets/aa.jpg" alt="">
                                                        <div class="radio_title">Ceiling Fans</div>
                                                        <div class="radio_subtitle">$5000</div>
                                                    </div>
                                                    </template>
                                                </v-radio>             
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-popover
                                                placement="right"
                                                offset="10"
                                                trigger="hover"
                                                >
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                    </v-btn>
                                                    <template slot="popover">
                                                        <v-img
                                                        width="300"
                                                        height="200"
                                                        class=""
                                                        src="https://preview.colorlib.com/theme/homes/img/rooms/1.jpg"
                                                        >                
                                                        </v-img>
                                                        <input class="tooltip-content"  placeholder="Tooltip content" />
                                                        <p>
                                                        sdfsfsadf
                                                        </p>
                                                        asdfasdf
                                                        <a v-close-popover>Close</a>
                                                    </template>
                                                </v-popover>                                                
                                            </v-list-item-action>
                                        </template>
                                        </v-list-item>

                                        <v-list-item>
                                        <template v-slot:default="{}">                                            
                                            <v-list-item-content>
                                                 <v-radio
                                                    value="radio-2"
                                                >
                                                    <template v-slot:label>
                                                    <div>
                                                        <img src="~/assets/bb.jpg" alt="">
                                                        <div class="radio_title">Flood Lights</div>
                                                        <div class="radio_subtitle">$14500</div>
                                                    </div>
                                                    </template>
                                                </v-radio>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-popover
                                                placement="right"
                                                offset="10"
                                                trigger="hover"
                                                >
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                    </v-btn>
                                                    <template slot="popover">
                                                        <v-img
                                                        width="300"
                                                        height="200"
                                                        class=""
                                                        src="https://preview.colorlib.com/theme/homes/img/rooms/1.jpg"
                                                        >                
                                                        </v-img>
                                                        <input class="tooltip-content"  placeholder="Tooltip content" />
                                                        <p>
                                                        sdfsfsadf
                                                        </p>
                                                        asdfasdf
                                                        <a v-close-popover>Close</a>
                                                    </template>
                                                </v-popover>                                                
                                            </v-list-item-action>

                                        </template>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-radio-group>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header expand-icon="$dropdown">
                        Kitchen Options
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-radio-group
                            v-model="radios"
                            class="radio_group"
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
                                        <v-list-item>
                                        <template v-slot:default="{}">                                           

                                            <v-list-item-content>
                                                <v-radio
                                                    value="radio-1"
                                                >
                                                    <template v-slot:label>
                                                    <div>
                                                        <div class="radio_title">2X4 Island Addition</div>
                                                        <div class="radio_subtitle">$5000</div>
                                                    </div>
                                                    </template>
                                                </v-radio>             
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-popover
                                                placement="right"
                                                offset="10"
                                                trigger="hover"
                                                >
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                    </v-btn>
                                                    <template slot="popover">
                                                        <v-img
                                                        width="300"
                                                        height="200"
                                                        class=""
                                                        src="https://preview.colorlib.com/theme/homes/img/rooms/1.jpg"
                                                        >                
                                                        </v-img>
                                                        <input class="tooltip-content"  placeholder="Tooltip content" />
                                                        <p>
                                                        sdfsfsadf
                                                        </p>
                                                        asdfasdf
                                                        <a v-close-popover>Close</a>
                                                    </template>
                                                </v-popover>                                                
                                            </v-list-item-action>
                                        </template>
                                        </v-list-item>

                                        <v-list-item>
                                        <template v-slot:default="{}">                                            
                                            <v-list-item-content>
                                                 <v-radio
                                                    value="radio-2"
                                                >
                                                    <template v-slot:label>
                                                    <div>
                                                        <div class="radio_title">2X6 Island Addition</div>
                                                        <div class="radio_subtitle">$14500</div>
                                                    </div>
                                                    </template>
                                                </v-radio>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-popover
                                                placement="right"
                                                offset="10"
                                                trigger="hover"
                                                >
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-help-circle-outline</v-icon>
                                                    </v-btn>
                                                    <template slot="popover">
                                                        <v-img
                                                        width="300"
                                                        height="200"
                                                        class=""
                                                        src="https://preview.colorlib.com/theme/homes/img/rooms/1.jpg"
                                                        >                
                                                        </v-img>
                                                        <input class="tooltip-content"  placeholder="Tooltip content" />
                                                        <p>
                                                        sdfsfsadf
                                                        </p>
                                                        asdfasdf
                                                        <a v-close-popover>Close</a>
                                                    </template>
                                                </v-popover>                                                
                                            </v-list-item-action>

                                        </template>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-radio-group>
                        </v-expansion-panel-content>
                    </v-expansion-panel> -->

                </v-expansion-panels>
            </v-col>

            <v-col cols="12" sm="12" md="6" lg="8">
                <v-row style="background:#f1f7f0;">
                    <v-col cols="12" sm="4" md="4">
                        <div
                        class="d-flex flex-column align-center"
                        >
                            <h4 class="success--text">${{baseprice}}</h4>
                            <h5>Home Base Price</h5>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                        <div
                        class="d-flex flex-column align-center"
                        >
                            <h4 class="success--text">${{parseInt($store.state.localStorage.home_cost)-parseInt(baseprice)}}</h4>
                            <h5>Additional Options</h5>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                        <div
                        class="d-flex flex-column align-center"
                        >
                            <h4 class="success--text">${{$store.state.localStorage.home_cost}}</h4>
                            <h5>Total Home Cost</h5>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                    v-for="(option,i) in chosenOptions"
                    :key="i"
                    class="option_card_container"
                    cols="12" sm="12" md="12" lg="6">
                        <div class="d-flex option_card">
                            <v-img
                            v-if="option.select"
                            class="option_card_img"
                            :src="option.select.option_img"
                            height="100px"
                            width="130px"
                            ></v-img>
                            <v-img
                            v-if="!option.select"
                            class="option_card_img"
                            :src="option.help_img"
                            height="100px"
                            width="130px"
                            ></v-img>
                            <div class="option_card_content_container">
                                <div class="option_card_title">
                                    <span v-if="option.select">
                                        {{option.select.option_title}}
                                    </span>
                                    <span v-if="!option.select">
                                        {{option.title}}
                                    </span>
                                </div>
                                <div class="option_card_desc">
                                    <span v-if="option.select">
                                        {{option.select.option_desc}}
                                    </span>
                                    <span v-if="!option.select">
                                        {{option.desc}}
                                    </span>
                                </div>
                                <v-spacer></v-spacer>
                                <div>
                                    <span class="option_card_price"
                                    v-if="option.select"
                                    >${{option.select.price}}</span>
                                    <span class="option_card_price"
                                    v-if="!option.select"
                                    >
                                    ${{option.price}}
                                    </span>
                                    <span class="option_card_price"
                                    v-if="option.type=='number'||option.type=='select_number'"
                                    >
                                        /unit
                                    </span>
                                    <span
                                    v-if="option.type=='number'||option.type=='select_number'"
                                    class="option_card_amount"
                                    >
                                    &nbsp AMT: 
                                    <span>{{option.number}}</span>
                                    <span v-if="option.unit">{{option.unit}}</span>
                                    <h5 class="option_card_amount">Total: 
                                        <span v-if="option.type=='number'" class="option_card_price">${{parseInt(option.price)*parseInt(option.number)}}</span> 
                                        <span v-else class="option_card_price">${{parseInt(option.select.price)*parseInt(option.number)}}</span> 
                                    </h5>
                                    </span>

                                    <v-btn
                                        class="option_card_close_btn"
                                        icon
                                        @click="cancelOption(option.title)"
                                        style=""
                                        small
                                    ><v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    
                                </div>
                            </div>
                            <v-spacer></v-spacer>
                        </div>
                    </v-col>
                </v-row>
                <!-- <div style="border:solid 1px #888; height:100%;">

                    <v-card
                        class="mx-auto"
                        max-width="344"
                        style="width:25%; float:left; margin:10px; margin-left:10px !important;"
                        dense
                    >
                        <v-btn
                            icon
                            @click="show1 = !show1"
                            style="position: absolute;top: 5px;right: 5px;z-index: 1;background: white;"
                            small
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>

                        <v-img
                        src="https://www.energy.gov/sites/prod/files/styles/borealis_photo_gallery_large_respondxl/public/storm_window.jpg?itok=8du0aKEA"
                        height="150px"
                        ></v-img>

                        <v-card-title>
                        <h5>Additional Window</h5>
                        </v-card-title>

                        <v-card-subtitle>
                            Unit price : $1500
                        </v-card-subtitle>
                    </v-card>
                </div>   -->
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
  export default {
      props:['baseprice','prop_options','changeOptionCheck','changeOptionAmount','changeOptionSelect','cancelOption'],
    data: () => ({
        options:[],
        categories:[],
        additional_options:[
            {
                category:"Kitchen Related",
                type:"check",
                title:"Bay Window",
                desc:"This is bay window description",
                check:false,
                price:123,
                unit:"",
                help_img:"https://preview.colorlib.com/theme/homes/img/rooms/1.jpg",
                help_desc:"This is description for each option"
            },
            {
                category:"Kitchen Related",
                type:"select_number",
                title:"Iraq Carpet",
                desc:"This is Carpet description",
                price:456,
                unit:"sqft",
                check:false,
                number:600,
                select:0,
                help_img:"https://preview.colorlib.com/theme/homes/img/rooms/1.jpg",
                help_desc:"This is description for each option",
                selections:[
                    {
                        select_id:0,
                        option_title:"None",
                        price:0,
                        option_desc:"this is option's original description",
                        option_img:"https://www.energy.gov/sites/prod/files/styles/borealis_photo_gallery_large_respondxl/public/storm_window.jpg?itok=8du0aKEA"
                    },
                    {
                        select_id:1,
                        option_title:"Bright white",
                        price:234,
                        option_desc:"This is bright white color",
                        option_img:"https://www.energy.gov/sites/prod/files/styles/borealis_photo_gallery_large_respondxl/public/storm_window.jpg?itok=8du0aKEA"
                    },
                    {
                        select_id:2,
                        option_title:"Bright Black",
                        price:345,
                        option_desc:"Black color description",
                        option_img:"https://www.simpsondoor.com/door-idea-gallery/thumbs/80465-Hall-Gray.jpg"
                    },
                ],
            },
            {
                category:"Kitchen Related",
                type:"select",
                title:"Roof Color",
                desc:"This is roof color description",
                price:0,
                unit:"",
                check:false,
                select:'',
                help_img:"https://preview.colorlib.com/theme/homes/img/rooms/1.jpg",
                help_desc:"This is description for each option",
                selections:[
                    {
                        select_id:0,
                        option_title:"None",
                        price:0,
                        option_desc:"this is option's original description",
                        option_img:"https://www.energy.gov/sites/prod/files/styles/borealis_photo_gallery_large_respondxl/public/storm_window.jpg?itok=8du0aKEA"
                    },
                    {
                        select_id:1,
                        option_title:"Bright white",
                        price:234,
                        option_desc:"This is bright white color",
                        option_img:"https://www.energy.gov/sites/prod/files/styles/borealis_photo_gallery_large_respondxl/public/storm_window.jpg?itok=8du0aKEA"
                    },
                    {
                        select_id:2,
                        option_title:"Bright Black",
                        price:345,
                        option_desc:"Black color description",
                        option_img:"https://www.simpsondoor.com/door-idea-gallery/thumbs/80465-Hall-Gray.jpg"
                    },
                ],
            },
            {
                category:"Electric Related",
                type:"select",
                title:"Roof Color",
                desc:"This is roof color description",
                price:0,
                unit:"",
                check:false,
                select:'',
                help_img:"https://preview.colorlib.com/theme/homes/img/rooms/1.jpg",
                help_desc:"This is description for each option",
                selections:[
                    {
                        select_id:0,
                        option_title:"None",
                        price:0,
                        option_desc:"this is option's original description",
                        option_img:"https://www.energy.gov/sites/prod/files/styles/borealis_photo_gallery_large_respondxl/public/storm_window.jpg?itok=8du0aKEA"
                    },
                    {
                        select_id:1,
                        option_title:"Bright white",
                        price:234,
                        option_desc:"This is bright white color",
                        option_img:"https://www.energy.gov/sites/prod/files/styles/borealis_photo_gallery_large_respondxl/public/storm_window.jpg?itok=8du0aKEA"
                    },
                    {
                        select_id:2,
                        option_title:"Bright Black",
                        price:345,
                        option_desc:"Black color description",
                        option_img:"https://www.simpsondoor.com/door-idea-gallery/thumbs/80465-Hall-Gray.jpg"
                    },
                ],
            },
            {
                category:"Electric Related",
                type:"check",
                title:"Bay Window",
                desc:"This is bay window description",
                check:false,
                price:123,
                unit:"",
                help_img:"https://preview.colorlib.com/theme/homes/img/rooms/1.jpg",
                help_desc:"This is description for each option"
            },
            {
                category:"Roof Related",
                type:"number",
                title:"How many Cailing Fan",
                desc:"This is Cailing Fan description",
                price:345,
                unit:"",
                check:false,
                number:0,
                help_img:"https://preview.colorlib.com/theme/homes/img/rooms/1.jpg",
                help_desc:"This is description for each option"
            },
            {
                category:"Window Related",
                type:"select_number",
                title:"Iraq Carpet",
                desc:"This is Carpet description",
                price:456,
                unit:"sqft",
                check:false,
                number:400,
                select:0,
                help_img:"https://preview.colorlib.com/theme/homes/img/rooms/1.jpg",
                help_desc:"This is description for each option",
                selections:[
                    {
                        select_id:0,
                        option_title:"None",
                        price:0,
                        option_desc:"this is option's original description",
                        option_img:"https://www.energy.gov/sites/prod/files/styles/borealis_photo_gallery_large_respondxl/public/storm_window.jpg?itok=8du0aKEA"
                    },
                    {
                        select_id:1,
                        option_title:"Bright white",
                        price:234,
                        option_desc:"This is bright white color",
                        option_img:"https://www.energy.gov/sites/prod/files/styles/borealis_photo_gallery_large_respondxl/public/storm_window.jpg?itok=8du0aKEA"
                    },
                    {
                        select_id:2,
                        option_title:"Bright Black",
                        price:345,
                        option_desc:"Black color description",
                        option_img:"https://www.simpsondoor.com/door-idea-gallery/thumbs/80465-Hall-Gray.jpg"
                    },
                ],
            },
        ],
        radios:"",
        show1:0,
        show2:0,
        tab:"tab-1",
        drawer: true,
        group:true,
        prices:["Any",
            "Under $25",
            "$100 to $500",
            "Over $500"
        ],
        select_items:['select1','select2'],
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

    computed: {
        categoryOptions(){
            return category=>{
                return this.options.filter(function (option) {
                    return option.category == category
                })
            }
        },
        chosenOptions: function () {
            return this.options.filter(function (option) {
                return (option.type == "check"&&option.check)||(option.type == "select" && option.select&&option.select.select_id)||(option.type == "number"&&option.number)||(option.type == "select_number" && option.select&&option.select.select_id&&option.number)
            })
        },
    },
    mounted() {
        console.log("Additional options mounted")
        this.options = [...this.prop_options]
        this.options.forEach(option => {
            this.categories.push(option.category);
        });
        this.categories = [...new Set(this.categories)]
    },
    watch: {
        options: function(newVal, oldVal) { // watch it
            newVal.forEach(option => {
                this.categories.push(option.category);
            });
            this.categories = [...new Set(this.categories)]
        }
    },
    methods:{
    }
  }
</script>

<style>
    .v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child{
        margin-right: 10px;
    }
    .v-expansion-panel-content__wrap{
        padding: 0 0px 16px !important;
    }
    .option_panel v-header{
        font-size: 13px;
    }
    .option_panel .v-input__control{
        height: 40px;
    }
    .option_panel .v-expansion-panel-header{
        background: #e7ebef;
    }
    .radio_group .v-input__control{
        height: unset !important;
    }
    .radio_group .list-item-group{
        border-top: solid 1px #eaeaea;
    }
    .radio_group .v-list-item{
        border-bottom: solid 1px #eaeaea;
    }
    .radio_group{
        padding-top: 0px;
        margin-top: 0px;
    }
    .v-expansion-panel-content__wrap{
        padding-bottom: 0px;
    }
    .radio_group .v-list{
        padding-bottom: 0px;
    }
    .radio_group .v-input__slot{
        margin-bottom: 0px;
    }
    .radio_group .v-list-item__content{
        overflow: visible;
    }
    .radio_title{
        font-size: 0.8125rem;
        font-weight: 500;
        line-height: 1rem;
        margin-bottom: 4px;
        color: #000;
    }
    .radio_subtitle{
        font-size: 0.8125rem;
        font-weight: 500;
        line-height: 1rem;
    }
    .v-stepper__step{
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        background:#e7ebef;
    }
    .option_price_container{
        background: #e8e8e8;
        border-radius: 20px;
        padding: 0px 7px;
    }
    .option_price{
        color: #459e20;
        font-weight: 500;
    }
    .option_unit{
        font-size: 12px;
        font-weight: 400;
    }
    .option_select_container .v-select__selections{
        display: block;
    }
    .v-select__selections input{
        display: none;
    }
    .customize_option_select  .v-input__slot{
        padding:0px 0px !important;
    }
    .customize_option_select_title{
        font-size: 0.8425rem;
        font-weight: 500 !important;
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .customize_option_select_selection_title{
        font-size: 0.8125rem;
        color: #888;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .customize_option_select_item_title{
        font-size: 0.8425rem;
        font-weight: 500 !important;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .customize_option_select_item_desc{
        font-size: 0.8125rem;
        color: #888;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .option_card{
        position: relative;
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        padding: 10px;
    }
    .option_card_img{
        margin-right: 10px;
    }
    .option_card_title{
        font-size: 14px;
        font-weight: 500;
    }
    .option_card_amount{
        font-size: 13px;
        font-weight: 500;
    }
    .option_card_desc{
        font-size: 13px;
        color: #888;
    }
    .option_card_price{
        font-size: 14px;
        font-weight: 500;
        color: #288237;
    }
    .option_card_close_btn{
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 1;
        background: white;
        border: solid 1px;
    }
    .option_card_container{
        padding-bottom: 0px !important;
    }
    .option_panel .v-list-item{
        border-bottom: solid 1px #e2e2e2;
    }
    .option_select_container{
        max-width: 100%;
    }
    .customize_option_select_content{
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .select_item_container{
        max-width: 300px;
    }
    .customize_option_select_item_content{
        overflow: hidden;
    }
    .option_tooltip_title{
        font-family: 'Roboto';
        margin-top: 10px;
        margin-bottom: 5px;
    }
    .option_tooltip_desc{
        font-family: 'Roboto';
        font-size: 14px;
    }
    @media (max-width:500px) {
        .select_item_container{
            max-width: 100% !important;
        }
    }
</style>
<style lang="scss">
    .tooltip {
        &.popover {
            z-index: 1;
            $color: #f9f9f9;

            .popover-inner {
            background: $color;
            color: black;
            padding: 15px;
            border-radius: 5px;
            box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px;
            }

            .popover-arrow {
            border-color: $color;
            }
        }
    }
</style>