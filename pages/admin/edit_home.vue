<template>
<div>
<h2 v-if="isEditHome" class="mt-2 mb-3">Edit <span class="primary--text">{{new_title}}</span></h2>
<v-card>
    <v-tabs>
        <v-tab>
            <v-icon left>
                mdi-tag-text-outline
            </v-icon>
            Genaeral
        </v-tab>
        <v-tab>
            <v-icon left>
                mdi-buffer
            </v-icon>
            Addon Options
        </v-tab>
        <v-tab>
            <v-icon left>
                mdi-image-multiple-outline
            </v-icon>
            Subdesigns
        </v-tab>

        <v-tab-item>
            <v-card flat>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="new_title" label="Title" type="text" outlined dense></v-text-field>
                            <v-textarea
                            v-model="new_desc"
                            outlined
                            name="new_desc"
                            label="Description"
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="new_baseprice" label="Base price" type="number" outlined dense></v-text-field>
                            <v-text-field v-model="new_size" label="Size (SqFt)" type="number" outlined dense></v-text-field>
                            <v-text-field v-model="new_beds" label="Number of beds" type="number" outlined dense></v-text-field>
                            <v-text-field v-model="new_baths" label="Number of baths" type="number" outlined dense></v-text-field>
                            <v-text-field v-model="new_garage" label="Number of garages" type="number" outlined dense></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                <v-card-title>
                <span class="primary--text">Select Options</span>
                <v-spacer></v-spacer>
                <v-btn class="px-4" rounded color="primary" elevation="0" @click="addModal">New Option</v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
                <v-card-text>
                    <v-data-table
                    v-model="selected_options"
                    :headers="headers"
                    :search="search"
                    :items="options"
                    group-by="category"
                    show-group-by
                    single-expand
                    :expanded.sync="expanded"
                    item-key="id"
                    show-expand
                    show-select
                    >
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length">
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="3" lg="3" xl="2">
                                            <img class="option_desc_img" :src="item.help_img" alt="" >
                                        </v-col>
                                        <v-col cols="12" sm="6" md="3" lg="3" xl="4">
                                            <h4 class="option_desc_caption">{{item.title}}</h4>
                                            <p>{{item.desc}}</p>
                                        </v-col>
                                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                                            <h4 v-if="item.selections&&item.selections.length" class="ml-3">Selections</h4>
                                            <div
                                            v-for="selection in item.selections"
                                            :key="selection.select_id"
                                            >
                                                <div
                                                v-if="selection.select_id !=0"
                                                class="elevation-1 option_selection_container"
                                                >
                                                    <img class="option_selection_img" :src="selection.option_img" alt="" >
                                                    <div>
                                                        <h4 class="option_selection_title">{{selection.option_title}}</h4>
                                                        <p class="option_selection_desc">{{selection.option_desc}}</p>
                                                        <h4 class="option_selection_price">${{selection.price}}/<span v-if="item.unit">{{item.unit}}</span><span v-else>unit</span></h4>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </td>
                        </template>
                        <template v-slot:item.price="{item}">
                            <span v-if="item.type=='number'">
                                ${{item.price}}/
                                <span v-if="item.unit">{{item.unit}}</span>
                                <span v-else>each</span>
                            </span>
                            <span v-else-if="item.type=='check'">
                                ${{item.price}}
                            </span>
                            <span v-else>Select Price</span>
                        </template>
                        <template v-slot:item.actions="{item}">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editModal(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteOption(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>

            <v-dialog v-model="option_modal" width="1000">
                <v-card>
                    <v-card-title class="login_headline">
                        <h3 class="mt-4">
                        <span v-if="modal_type=='add'">Add New Option</span>
                        <span v-if="modal_type=='edit'">Edit Option</span>
                        </h3>
                    </v-card-title>
                    <v-card-text>                
                        <v-container class="modal_option_type_container">
                            <h4 class="modal_option_type_title primary--text">Option Type</h4>
                                <v-radio-group mandatory class="modal_option_type_group" v-model="modal_option_type">
                                    <v-row>
                                    <v-col cols="12" sm="6" md="3" lg="3">
                                        <v-radio
                                            label="Check"
                                            value="check"
                                        ></v-radio>
                                    </v-col> 
                                    <v-col cols="12" sm="6" md="3" lg="3">
                                        <v-radio
                                            label="Number"
                                            value="number"
                                        ></v-radio>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3" lg="3">
                                        <v-radio
                                            label="Select"
                                            value="select"
                                        ></v-radio>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="3" lg="3">
                                        <v-radio
                                            label="Select/Number"
                                            value="select_number"
                                        ></v-radio>
                                    </v-col>     
                                    </v-row>                  
                                </v-radio-group>
                        </v-container>
                        <v-container class="modal_option_info_container px-0">
                            <v-row>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field v-model="modal_option_title" label="Option title" type="text" outlined dense></v-text-field>
                                    
                                    <v-combobox
                                    v-model="modal_option_category"
                                    :items="categories"
                                    label="Category (i.e. Kitchen Related)"
                                    auto-select-first
                                    outlined
                                    dense
                                    ></v-combobox>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field v-if="modal_option_type=='check'||modal_option_type=='number'" v-model="modal_option_price" label="Price ($)" type="number" outlined dense></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field v-if="modal_option_type=='number'||modal_option_type=='select_number'" v-model="modal_option_unit" label="Unit (.i.e sqft)" type="text" outlined dense></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-textarea
                                    v-model="modal_option_desc"
                                    outlined
                                    name="modal_option_desc"
                                    label="Option Description"
                                    ></v-textarea>
                                    
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6" class="upload_image_container">
                                    <h5 class="upload_image_title">Upload Image</h5>
                                    <v-image-input
                                    v-model="modal_option_image_processing"
                                    :image-quality="1"
                                    clearable
                                    image-format="jpeg"
                                    :image-width="320"
                                    :image-height="240"
                                    overlayPadding="20px"
                                    fullWidth
                                    />
                                    <center>
                                        <v-btn :loading="modal_option_image_loading" @click="uploadModalOptionImage" rounded small color="primary">
                                            Ok, Upload
                                        </v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-container v-if="modal_option_type=='select'||modal_option_type=='select_number'" class="modal_option_selection_container">
                            <h3 class="mb-4"><span v-if="!modal_new_selections.length&&!modal_existing_selections.length">There are no selections...</span><span v-else>Selections</span></h3>
                            <v-row 
                            v-for="(selection,i) in modal_selections" 
                            :key="i"
                            class="new_selection_container"
                            >
                                <v-btn
                                fab
                                dark
                                x-small
                                color="primary"
                                class="selection_remove_btn"
                                @click="modal_new_selections.splice(i,1)"
                                >
                                    <v-icon dark>
                                        mdi-close
                                    </v-icon>
                                </v-btn>

                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-text-field v-model="selection.option_title" label="Selection Title" type="text" outlined dense></v-text-field>
                                    <v-text-field v-model="selection.price" label="Price ($)" type="number" outlined dense></v-text-field>
                                    <v-textarea
                                    v-model="selection.option_desc"
                                    outlined
                                    label="Description"
                                    ></v-textarea>
                                </v-col>

                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-image-input
                                    v-model="selection.option_img_processing"
                                    :image-quality="1"
                                    clearable
                                    image-format="jpeg"
                                    :image-width="320"
                                    :image-height="240"
                                    overlayPadding="20px"
                                    fullWidth
                                    />
                                    <center>
                                        <v-btn :loading="selection.loading" @click="uploadSelectionImage(i,selection.id)" rounded color="primary" small>Ok, Upload</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                            <v-btn class="px-4 mb-4 mr-3" small rounded color="primary" elevation="0" @click="newSelection">New Selection</v-btn>
                        </v-container>
                    </v-card-text>
                    <v-card-actions class="mt-n6 primary" dark>
                        <v-spacer></v-spacer>
                        <v-btn :loading="option_modal_loading" v-if="modal_type=='add'" class="px-4 my-2 mr-3 dark--text" rounded elevation="0" color="white" @click="createOption">Create</v-btn>
                        <v-btn :loading="option_modal_loading" v-if="modal_type=='edit'" class="px-4 my-2 mr-3 dark--text" rounded elevation="0" color="white" @click="saveOption">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="delete_modal" width="450">
                <v-card>
                    <v-card-title class="headline">Are you sure you want to delete this option?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="delete_modal=false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Confirm</v-btn>
                        <v-spacer></v-spacer>
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
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col 
                            v-for="(subdesign,i) in subdesigns"
                            :key="i"
                            cols="3">
                                <v-card
                                class="mx-auto"
                                >
                                    <v-img
                                    :src="subdesign.main_image"
                                    ></v-img>
                                    <v-card-title>
                                        <span>{{subdesign.title}}</span>
                                        <v-spacer></v-spacer>
                                        <v-btn 
                                        @click="editSubdesign(i,subdesign)"
                                        fab x-small text class="mr-2 elevation-0">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn 
                                        @click="removeSubdesign(i)"
                                        fab x-small text class="elevation-0">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-card-title>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-btn rounded color="primary" @click="newSubdesign">New Subdesign</v-btn>
                </v-card-text>
                <v-dialog v-model="subdesign_modal" width="1000">
                    <v-card>
                        <v-card-title class="login_headline">
                            <h3 class="mt-4">
                            <span v-if="submodal_type=='add'">Add New Subdesign</span>
                            <span v-if="submodal_type=='edit'">Edit Subdesign</span>
                            </h3>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-image-input
                                        v-model="submodal_main_image_processing_data"
                                        :image-quality="1"
                                        clearable
                                        image-format="jpeg"
                                        :image-width="320"
                                        :image-height="240"
                                        overlayPadding="20px"
                                        fullWidth
                                        />
                                        <v-btn
                                        :loading="submodal_main_image_loading"
                                        @click="submodalMainImageUpload"
                                        rounded color="primary" small
                                        >Ok, Upload this image</v-btn>
                                    </v-col>
                                    <v-col class="subdesign_info_container" cols="12" md="6">
                                        <v-row class="mt-0">
                                            <v-col cols="8" class="pb-0">
                                                <v-text-field v-model="submodal_title"  label="Title" type="text" outlined dense></v-text-field>
                                            </v-col>
                                            <v-col cols="4" class="pb-0">
                                                <v-text-field v-model="submodal_baseprice" label="Base Price" type="number" outlined dense></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row class="mt-0">
                                            <v-col class="pb-0" cols="6" sm="3" md="3" lg="3">
                                                <v-text-field v-model="submodal_size" label="Size" type="number" outlined dense></v-text-field>
                                            </v-col>
                                            <v-col class="pb-0" cols="6" sm="3" md="3" lg="3">
                                                <v-text-field v-model="submodal_beds" label="Beds" type="number" outlined dense></v-text-field>
                                            </v-col>
                                            <v-col class="pb-0" cols="6" sm="3" md="3" lg="3">
                                                <v-text-field v-model="submodal_baths" label="Baths" type="number" outlined dense></v-text-field>
                                            </v-col>
                                            <v-col class="pb-0" cols="6" sm="3" md="3" lg="3">
                                                <v-text-field v-model="submodal_garage" label="Garages" type="number" outlined dense></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row class="mt-0">
                                            <v-col cols="12">
                                                <v-textarea
                                                v-model="submodal_desc"
                                                outlined
                                                name="subdesign_desc"
                                                label="Description"
                                                ></v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col><h3>Images</h3></v-col>
                                    <v-col cols="12" class="d-flex" style="flex-wrap:wrap;">
                                        
                                        <v-btn :loading="submodal_image_selecting" class="elevation-0 mr-2 mb-2" color="#bbb" width="100" height="100" @click="submodal_image_add_btn_click">
                                            <v-icon  large>mdi-plus</v-icon>
                                        </v-btn>
                                        <input
                                            multiple
                                            ref="submodal_image_uploader"
                                            class="d-none"
                                            type="file"
                                            accept="image/*"
                                            @change="onSubmodalImageChanged"
                                        >
                                        <div class="submodal_img_thumbnail_container mr-2 mb-2" v-for="(img,i) in submodal_images" :key="i">
                                            <img class="submodal_img_thumbnail" :src="img.src" alt="">
                                            <v-btn 
                                            :loading="img.loading"
                                            fab 
                                            absolute 
                                            dark 
                                            style="right:-5px; top:-5px;border:solid 1px #fff;" width="20" height="20"
                                            @click="submodal_images.splice(i,1)"
                                            >
                                                <v-icon x-small>mdi-close</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                                <h3 class="my-5">Styles</h3>
                                <v-row>
                                    <v-col
                                    v-for="(style,i) in submodal_styles"
                                    :key="i"
                                    cols="12" sm="6" md="4">
                                        <v-card
                                            class="mx-auto"
                                        >
                                            <v-img
                                            :src="style.image"
                                            ></v-img>
                                            <v-card-title>
                                                <span>{{style.title}}</span>
                                                <v-spacer></v-spacer>
                                                <v-btn 
                                                @click="editStyle(i,style)"
                                                fab x-small text class="mr-2 elevation-0">
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                                <v-btn 
                                                @click="submodal_styles.splice(i,1)"
                                                fab x-small text class="elevation-0">
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </v-card-title>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row
                                v-for="(style,i) in submodal_styles"
                                :key="i"
                                >
                                    <v-col cols="12" sm="6" md="5">
                                        
                                    </v-col>
                                    <v-col cols="12" sm="6" md="7">
                                        
                                    </v-col>
                                </v-row>
                                <v-btn small color="primary" rounded @click="submodalAddStyle">Add Style</v-btn>

                            </v-container>
                        </v-card-text>
                        <v-card-actions class="mt-n6 primary" dark>
                            <v-spacer></v-spacer>
                            <v-btn v-if="submodal_type=='add'" class="px-4 my-2 mr-3 dark--text" rounded elevation="0" color="white" @click="createSubdesign">Create</v-btn>
                            <v-btn v-if="submodal_type=='edit'" class="px-4 my-2 mr-3 dark--text" rounded elevation="0" color="white" @click="saveSubdesign">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="subdesign_style_modal" width="900">
                    <v-card>
                        <v-card-title class="login_headline">
                            <h3 class="mt-4">
                            <span v-if="submodal_style_type=='add'">New Style</span>
                            <span v-if="submodal_style_type=='edit'">Edit Style</span>
                            </h3>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <div class="subdesign_style_modal_image_container">
                                            <img class="subdesign_style_modal_image" :src="submodal_stylemodal_image.src" alt="" style="width:100%;">
                                            <v-btn :class="{'trans_btn':submodal_stylemodal_image.src,'non_trans_btn':!submodal_stylemodal_image.src}" 
                                            style="width:100%; height:100%; top:0px; left:0px;"
                                            :loading="submodal_stylemodal_image_selecting"
                                            @click="submodal_stylemodal_image_add_btn_click"
                                            >
                                                <v-icon large v-if="!submodal_stylemodal_image.src">
                                                    mdi-cloud-upload-outline
                                                </v-icon>
                                            </v-btn>
                                            <input
                                                ref="submodal_style_modal_image_uploader"
                                                class="d-none"
                                                type="file"
                                                accept="image/*"
                                                @change="onSubmodalStyleModalImageChanged"
                                                :value="imageValue"
                                            >
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="submodal_stylemodal_title" label="Style Title" dense outlined></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-sheet>
                                    <v-container>
                                        <input
                                            ref="stylemodal_styleitem_image_uploader"
                                            class="d-none"
                                            type="file"
                                            accept="image/*"
                                            @change="onStyleItemImageChanged"
                                        >
                                        <v-row
                                        v-for="(item, i) in submodal_stylemodal_items"
                                        :key="i"
                                        class="elevation-2 mt-5 mb-5 style_modal_item_container d-flex align-center">
                                            <v-btn fab absolute x-small @click="submodal_stylemodal_items.splice(i,1)" style="left:-30px; top:50%; transform:translate(0%, -50%);"><v-icon>mdi-close</v-icon></v-btn>
                                            <v-col cols="6" sm="6" md="3">
                                                <v-combobox
                                                v-model="item.part"
                                                :items="existing_body_parts_parts"
                                                label="Part name"
                                                @change="styleModalItemPartChanged(i,item.part)"
                                                auto-select-first
                                                outlined
                                                dense
                                                >
                                                </v-combobox>
                                            </v-col>
                                            <v-col cols="6" sm="6" md="3">
                                                <v-combobox
                                                v-model="item.category"
                                                :items="existing_body_parts_categories"
                                                label="Category"
                                                auto-select-first
                                                outlined
                                                dense
                                                >
                                                </v-combobox>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="3">
                                                <v-combobox
                                                v-model="item.colorname"
                                                :items="existing_colors_colornames"
                                                label="Color name"
                                                @change="styleModalItemColorChanged(i,item.colorname)"
                                                auto-select-first
                                                outlined
                                                dense
                                                >
                                                </v-combobox>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="3">
                                                <v-sheet class="stylemodal_item_image_container">
                                                    <v-sheet v-if="item.color&&!item.material" style="width:50px; height:50px;" :color="item.color"></v-sheet>
                                                    <div class="" style="position:relative;">
                                                        <img class="stylemodal_item_image" :src="item.material" alt="">
                                                        <v-progress-circular
                                                        v-if="item.loading"
                                                        absolute small style="position:absolute !important;top:50%; left:50%; transform:translate(-50%,-50%);"
                                                        indeterminate
                                                        color="primary"
                                                        ></v-progress-circular>
                                                    </div>
                                                    <div class="stylemodal_item_image_btn_container">
                                                        <v-spacer></v-spacer>
                                                        <v-btn class="stylemodal_item_image_btn" small  @click="styleModalItemImageClick(i, item.id)"><v-icon>mdi-image</v-icon> &nbsp Image</v-btn>
                                                        <v-spacer></v-spacer>

                                                        <v-color-input
                                                        noAlpha
                                                        v-model="item.color"
                                                        label="Color"
                                                        class="elevation-1 mt-1 rounded"
                                                        @input="styleItemColorChanged(i)"
                                                        />
                                                        <v-spacer></v-spacer>
                                                        
                                                    </div>
                                                </v-sheet>
                                            </v-col>
                                        </v-row>
                                        <v-btn small color="primary" rounded @click="stylemodalAddPart">Add Part</v-btn>
                                    </v-container>
                                </v-sheet>

                            </v-container>
                        </v-card-text>
                        <v-card-actions class="mt-n6 primary" dark>
                            <v-spacer></v-spacer>
                            <v-btn v-if="submodal_style_type=='add'" class="px-4 my-2 mr-3 dark--text" rounded elevation="0" color="white" @click="createStyle">Create</v-btn>
                            <v-btn v-if="submodal_style_type=='edit'" class="px-4 my-2 mr-3 dark--text" rounded elevation="0" color="white" @click="saveStyle">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="remove_subdesign_comfirm_modal" width="450">
                    <v-card>
                        <v-card-title class="headline">Are you sure you want to delete this subdesign?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="remove_subdesign_comfirm_modal=false">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteSubdesignConfirm">Confirm</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </v-card>
        </v-tab-item>
    </v-tabs>
</v-card>
<center>
    <p class="mt-5" style="color:#ff3636;">{{new_home_error}}</p>
    <v-btn v-if="isEditHome" :loading="savingEditHome" color="primary" class="mt-5" rounded @click="saveEditHome">Save Home</v-btn>
    <v-btn v-else :loading="savingNewHome" @click="saveNewHome"  color="primary" class="mt-5" rounded>Save New Home</v-btn>
</center>
</div>
</template>
<script>
import VImageInput from 'vuetify-image-input';
import VColorInput from 'vuetify-color-input';
export default {
    data () {
      return {
          option_modal_loading:false,
        new_home_error:"",
        savingEditHome:false,
        savingNewHome:false,
        imageValue:"",
        submodal_style_type:"",
        submodal_style_edit_id:0,
        submodal_stylemodal_image_select_id:0,

        submodal_stylemodal_title:"",
        submodal_stylemodal_items:[],
        submodal_stylemodal_image_upload_id:"",
        submodal_stylemodal_image_selecting:false,
        submodal_stylemodal_image:{
            src:"",
            new:true
        },
        subdesign_style_modal:false,
        submodal_style_image_selecting:false,
        submodal_title:"",
        submodal_baseprice:"",
        submodal_size:"",
        submodal_beds:"",
        submodal_baths:"",
        submodal_garage:"",
        submodal_desc:"",
        submodal_styles:[],
        submodal_images:[],
        submodal_edit_id:0,
        submodal_image_selecting:false,
        submodal_main_image:"",
        submodal_main_image_processing_data:"",
        submodal_main_image_loading:false,
        submodal_type:"add",
        subdesign_modal:false,
        subdesigns:[],

        existing_body_parts:[
            {
                part:"door",
                category:"Body Part"
            },
            {
                part:"window",
                category:"Body Part"
            },
        ],

        existing_colors:[
            {
                colorname:"Red",
                color:"#ff0000",
                material:""
            },
            {
                colorname:"Wood",
                color:"",
                material:"https://hw.menardc.com/main/store/20090519001/assets/images6/landscape%20materials/Responsive/Hero_REV2.jpg"
            },
        ],

        selected_options:[],
        new_title:"",
        new_desc:"",
        new_baseprice:"",
        new_size:"",
        new_beds:"",
        new_baths:"",
        new_garage:"",

        option_modal: false,
        delete_modal:false,
        delete_id:0,
        edit_id:0,

        remove_subdesign_comfirm_modal:false,
        remove_subdesign_id:0,

        categories:[],

        modal_existing_selections:[],
        modal_new_selections:[],
        modal_option_title:"",
        modal_option_price:"",
        modal_option_unit:"",
        modal_option_desc:"",
        modal_option_category:"",
        modal_option_image:"",
        modal_option_image_processing:"",
        modal_option_image_loading:false,
        modal_type : "",
        modal_option_type:"",
        snackbar:false,
        snackbar_text:"",
        snackbar_color:"success",
        search: '',
        modal_error:"",
        expanded: [],
        headers: [
            {
            text: 'Title',
            align: 'start',
            sortable: false,
            value: 'title',
            groupable: false,
            },
            { text: 'Category', value: 'category' },
            { text: 'Type', value: 'type' ,groupable: false},
            { text: 'Price', value: 'price' ,groupable: false},
            { text: 'Actions', value: 'actions', sortable: false,groupable: false },
            { text: '', value: 'data-table-expand',groupable: false },
        ],
        options: [],
        isEditHome:false,
      }
    },
    components: {
        VImageInput,
        VColorInput
    },
    mounted() {
        if(this.$route.query.id){
            this.isEditHome = true
            this.fetchHomeData(this.$route.query.id)
        }else{
           
        }
        this.getOptions()
        this.getPartsMaterials()
    },
    watch: {
        option_modal: function (newshow, oldshow) {
            if(!newshow){
                this.modal_new_selections=[]
            }
        }
    },
    computed: {
        modal_selections: function () {
            return this.modal_new_selections.filter(function (selection) {
                 return (selection.select_id && selection.select_id != 0 )||selection.select_id==undefined
            })
        },
        existing_body_parts_parts:function(){
            return this.existing_body_parts.map(a => a.part)
        },
        existing_body_parts_categories:function(){
            return this.existing_body_parts.map(a => a.category)
        },
        existing_colors_colornames:function(){
            return this.existing_colors.map(a => a.colorname)
        },
    },
    methods:{
        async uploadSelectionImage(i, id){
            let temp_id=id
            this.modal_selections[i].loading=true
            let temp_data = await this.$utility.uploadImage(this.modal_selections[i].option_img_processing, id)
            this.modal_selections.forEach(element => {
                if(element.id==temp_id){
                    element.option_img=temp_data.location
                    element.id = temp_data.name
                }
            });
            this.modal_selections[i].loading=false
        },
        removeSubdesign:function(i){
            this.remove_subdesign_comfirm_modal = true
            this.remove_subdesign_id = i
        },
        deleteSubdesignConfirm:function(){
            this.remove_subdesign_comfirm_modal = false
            this.subdesigns.splice(this.remove_subdesign_id, 1)
        },
        async fetchHomeData(id){
            try {
                let res = await this.$axios.get('/api/home/'+id)
                let temp_home = res.data.data
                temp_home.options = JSON.parse(temp_home.options)
                temp_home.subdesigns = JSON.parse(temp_home.subdesigns)
                
                this.new_title = temp_home.title
                this.new_desc = temp_home.desc
                this.new_size = temp_home.size
                this.new_beds = temp_home.beds
                this.new_baths = temp_home.baths
                this.new_garage = temp_home.garage
                this.new_baseprice = temp_home.baseprice
                this.selected_options = temp_home.options
                this.subdesigns = temp_home.subdesigns
                temp_home.options.forEach(option => {
                    let temp_a = 0
                    this.options.forEach(element => {
                        if(element._id==option._id){
                            temp_a = 1
                            return false
                        }
                    });
                    if(!temp_a){
                        this.options.push(option)
                    }
                });
            } catch (error) {
                alert(error.response.data.message)
            }
        },
        async saveEditHome(){
             if(this.saveHomeErrorHandler()){
                try {
                    this.savingEditHome = true
                    await this.$axios.put('/api/home/'+this.$route.query.id,{
                        title:this.new_title,
                        desc:this.new_desc,
                        baseprice:this.new_baseprice,
                        size:this.new_size,
                        beds:this.new_beds,
                        baths:this.new_baths,
                        garage:this.new_garage,
                        options:JSON.stringify(this.selected_options),
                        subdesigns:JSON.stringify(this.subdesigns)
                    })
                    this.$router.push('/admin/homes')
                } catch (e) {
                    this.savingEditHome = false
                    console.log(e.response.data)
                }
            }
        },
        async saveNewHome() {
            if(this.saveHomeErrorHandler()){
                try {
                    this.savingNewHome = true
                    await this.$axios.post('/api/home/',{
                        title:this.new_title,
                        desc:this.new_desc,
                        baseprice:this.new_baseprice,
                        size:this.new_size,
                        beds:this.new_beds,
                        baths:this.new_baths,
                        garage:this.new_garage,
                        options:JSON.stringify(this.selected_options),
                        subdesigns:JSON.stringify(this.subdesigns)
                    })
                    this.$router.push('/admin/homes')
                } catch (e) {
                    this.savingNewHome = false
                    alert(e.response.data.message)
                }
            }
        },
        saveHomeErrorHandler:function(){
            let error_messages={
                title_error:"Title is required",
                baseprice_error :"Base price is required",
                size_error:"Size is required",
                beds_error:"Number of beds is required",
                baths_error:"Number of baths is required",
                garage_error:"Number of garages is required",
                options_error:"Please select options",
                subdesigns_error:"Please add subdesigns"
            }
            if(!this.new_title){this.new_home_error = error_messages.title_error; return false;}
            if(!this.new_baseprice){this.new_home_error = error_messages.baseprice_error; return false;}
            if(!this.new_size){this.new_home_error = error_messages.size_error; return false;}
            if(!this.new_beds){this.new_home_error = error_messages.beds_error; return false;}
            if(!this.new_baths){this.new_home_error = error_messages.baths_error; return false;}
            if(!this.new_garage){this.new_home_error = error_messages.garage_error; return false;}
            if(!this.selected_options.length){this.new_home_error = error_messages.options_error; return false;}
            if(!this.subdesigns.length){this.new_home_error = error_messages.subdesigns_error; return false;}
            return true
        },
        newSubdesign:function(){
            let alphabet_array=[
                'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            ]
            //Auto fill subdesign name with 'A' , 'B' ,'C' ...
            this.submodal_title = this.new_title +' '+ alphabet_array[this.subdesigns.length]
            this.submodal_baseprice = this.new_baseprice
            this.submodal_size = this.new_size
            this.submodal_beds = this.new_beds
            this.submodal_baths = this.new_baths
            this.submodal_garage = this.new_garage
            this.submodal_desc = this.new_desc
            this.submodal_styles = []
            if(this.subdesigns.length){
                this.submodal_styles = this.subdesigns[0].styles
            }
            this.submodal_images = []
            if(this.subdesigns.length){
                this.submodal_images = this.subdesigns[0].images
            }
            this.submodal_main_image = ''
            this.submodal_main_image_processing_data = ''
            this.submodal_type = "add"
            this.subdesign_modal = true
            this.subdesign_modal=true
        },
        async submodalMainImageUpload(){
            this.submodal_main_image_loading=true
            let temp_data = await this.$utility.uploadImage(this.submodal_main_image_processing_data, Math.floor(Math.random() * 10000000),)
            this.submodal_main_image = temp_data.location
            this.submodal_main_image_loading=false
        },
        saveSubdesign:function(){
            let temp_subdesign = {
                title:this.submodal_title,
                baseprice:this.submodal_baseprice,
                size:this.submodal_size,
                beds:this.submodal_beds,
                baths:this.submodal_baths,
                garage:this.submodal_garage,
                desc:this.submodal_desc,
                styles:this.submodal_styles,
                images:this.submodal_images,
                main_image:this.submodal_main_image
            }
            this.subdesigns[this.submodal_edit_id] = temp_subdesign
            this.subdesign_modal = false

            this.submodal_title=""
            this.submodal_baseprice=""
            this.submodal_size=""
            this.submodal_beds=""
            this.submodal_baths=""
            this.submodal_garage=""
            this.submodal_desc=""
            this.submodal_styles=[]
            this.submodal_images=[]
            this.submodal_main_image=""
            this.submodal_main_image_processing_data =""
        },
        editSubdesign:function(i, subdesign){
            this.submodal_title = subdesign.title
            this.submodal_baseprice = subdesign.baseprice
            this.submodal_size=subdesign.size
            this.submodal_beds = subdesign.beds
            this.submodal_baths = subdesign.baths
            this.submodal_garage = subdesign.garage
            this.submodal_desc = subdesign.desc
            this.submodal_styles = subdesign.styles
            this.submodal_images = subdesign.images
            this.submodal_main_image_processing_data = subdesign.main_image
            this.submodal_main_image = subdesign.main_image
            this.submodal_type = "edit"
            this.subdesign_modal = true
            this.submodal_edit_id = i
        },
        createSubdesign:function(){
            let temp_subdesign = {
                title:this.submodal_title,
                baseprice:this.submodal_baseprice,
                size:this.submodal_size,
                beds:this.submodal_beds,
                baths:this.submodal_baths,
                garage:this.submodal_garage,
                desc:this.submodal_desc,
                styles:this.submodal_styles,
                images:this.submodal_images,
                main_image:this.submodal_main_image
            }
            this.subdesigns.push(temp_subdesign)
            this.subdesign_modal = false

            this.submodal_title=""
            this.submodal_baseprice=""
            this.submodal_size=""
            this.submodal_beds=""
            this.submodal_baths=""
            this.submodal_garage=""
            this.submodal_desc=""
            this.submodal_styles=[]
            this.submodal_images=[]
            this.submodal_main_image=""
            this.submodal_main_image_processing_data =""
        },
        createStyle:function(){
            let temp_style = {
                title:this.submodal_stylemodal_title,
                image:this.submodal_stylemodal_image.src,
                parts:[...this.submodal_stylemodal_items]
            }
            this.submodal_styles.push(temp_style)
            this.subdesign_style_modal = false
        },
        saveStyle:function(){
            let temp_style = {
                title:this.submodal_stylemodal_title,
                image:this.submodal_stylemodal_image.src,
                parts:[...this.submodal_stylemodal_items]
            }
            this.submodal_styles[this.submodal_style_edit_id] = {}
            this.submodal_styles[this.submodal_style_edit_id] = (temp_style)
            this.subdesign_style_modal = false
        },
        editStyle:function(i, style){
            this.submodal_stylemodal_image={
                src:style.image,
                new:true
            }
            this.submodal_stylemodal_title = style.title
            this.submodal_stylemodal_items = [...style.parts]
            this.submodal_style_type = "edit"
            this.submodal_style_edit_id = i
            this.subdesign_style_modal = true
        },
        styleModalItemColorChanged:function(i,colorname){
            this.existing_colors.forEach(element => {
                if(element.colorname==colorname){
                    if(element.material){
                        this.submodal_stylemodal_items[i].color = ""
                        this.submodal_stylemodal_items[i].material = element.material
                    }else if(element.color){
                        this.submodal_stylemodal_items[i].material = ""
                        this.submodal_stylemodal_items[i].color = element.color
                    }
                    return false
                }
            });
        },

        styleModalItemPartChanged:function(i,part){
            this.existing_body_parts.forEach(element => {
                if(element.part==part){
                    this.submodal_stylemodal_items[i].category = element.category
                    return false
                }
            });
        },
        styleItemColorChanged:function(i){
            this.submodal_stylemodal_image_select_id = i
            this.submodal_stylemodal_items[i].material=""
            this.$refs.stylemodal_styleitem_image_uploader.value=""
        },
        stylemodalAddPart:function(){
            let temp_object = {
                id:Math.floor(Math.random() * 10000000),
                part:"",
                category:"",
                colorname:"",
                color:"",
                material:"",
                loading:false
            }
            this.submodal_stylemodal_items.push(temp_object)
        },
        submodalAddStyle:function(){
            this.submodal_stylemodal_title=""
            this.submodal_stylemodal_image.src=""
            this.submodal_style_type = "add"
            this.submodal_stylemodal_items = []
            this.subdesign_style_modal=true
            this.imageValue=""
        },
        
        submodal_image_add_btn_click:function(){
            this.submodal_image_selecting = true
            window.addEventListener('focus', () => {
                this.submodal_image_selecting = false
            }, { once: true })
            this.$refs.submodal_image_uploader.click()
        },
        
        submodal_style_image_click:function(i){
            this.submodal_style_image_selecting = true
            window.addEventListener('focus', () => {
                this.submodal_style_image_selecting = false
            }, { once: true })
            this.$refs.submodal_style_image_input.click()
        },
        styleModalItemImageClick:function(i,id){
            this.submodal_stylemodal_image_select_id=i
            this.submodal_stylemodal_image_upload_id=id
            this.$refs.stylemodal_styleitem_image_uploader.click()
        },
        onStyleItemImageChanged:function(e){
            let reader = new FileReader()
            reader.onload = async(re)=>{
                let temp_id=this.submodal_stylemodal_image_upload_id
                this.submodal_stylemodal_items[this.submodal_stylemodal_image_select_id].color=""
                this.submodal_stylemodal_items[this.submodal_stylemodal_image_select_id].material = re.target.result
                this.submodal_stylemodal_items[this.submodal_stylemodal_image_select_id].loading = true
                let temp_data = await this.$utility.uploadImage(re.target.result, temp_id)
                this.submodal_stylemodal_items.forEach(element => {
                    if(element.id==temp_id){
                        element.material=temp_data.location
                        element.id=temp_data.id
                        element.loading=false
                    }
                });
            }
            if(e.target.files[0]){
                reader.readAsDataURL(e.target.files[0])
            }
        },
        submodal_stylemodal_image_add_btn_click:function(){
            this.submodal_stylemodal_image_selecting = true
            window.addEventListener('focus', () => {
            }, { once: true })
            this.$refs.submodal_style_modal_image_uploader.click()
        },
        onSubmodalStyleModalImageChanged:function(e){
            
            let reader = new FileReader()
            reader.onload = async(re)=>{
                let temp_obj = {
                    src:re.target.result,
                    new:true,
                }
                this.submodal_stylemodal_image=temp_obj

                let temp_data = await this.$utility.uploadImage(re.target.result , Math.floor(Math.random() * 100000000),)

                this.submodal_stylemodal_image={src:temp_data.location, new:true}
                this.submodal_stylemodal_image_selecting = false
            }
            reader.readAsDataURL(e.target.files[0])
        },
        onSubmodalImageChanged:function(e){
            this.submodal_image_selecting = false
            let reader = []
            e.target.files.forEach((file,i) => {
                reader[i] = new FileReader()
                reader[i].onload = (re)=>{
                    let temp_id = Math.floor(Math.random() * 100000000)
                    let temp_obj = {
                        id:temp_id,
                        src:re.target.result,
                        new:true,
                        loading:true
                    }
                    this.submodal_images.push(temp_obj)
                    this.uploadSubmodalImage(re.target.result, temp_id)
                }
                reader[i].readAsDataURL(file)
            });
        },
        async uploadSubmodalImage(data, id){
            let temp_data = await this.$utility.uploadImage(data,id)
            this.submodal_images.forEach(element => {
                if(element.id==id){
                    element.src=temp_data.location
                    element.id=temp_data.name
                    element.loading=false
                }
            });
        },
        newSelection:function(){
            let temp_new_selection = {
                id:Math.floor(Math.random() * 10000000),
                select_id:this.modal_new_selections.length+1,
                option_title:"",
                option_desc:"",
                price:undefined,
                option_img:"",
                option_img_processing:"",
                loading:false
            }
            this.modal_new_selections.push(temp_new_selection)
        },
        getCategories:function(items){
            let temp_categories = []
            items.forEach(element => {
                temp_categories.push(element.category)
            });
            this.categories = [...new Set(temp_categories)]
        },
        
        async getPartsMaterials() {
            let res = await this.$axios.get('/api/home/parts_materials')
            console.log(res.data.data)
            this.existing_body_parts = res.data.data.parts
            this.existing_colors =  res.data.data.materials
        },
        async getOptions() {
            let res = await this.$axios.get('/api/option/options')
            console.log(res.data.data)
            let temp_options = [...res.data.data]
            console.log(temp_options)
            temp_options.forEach(element => {
                if(element.selections){
                    element.selections = JSON.parse(element.selections)
                }
            });
            this.options = temp_options
            this.getCategories(this.options)
        },
        addModal:function(){
            this.option_modal = true
            this.modal_type = "add"
        },
        editModal:function(item) {
            this.edit_id = item.id
            this.modal_type = "edit"
            this.modal_option_title = item.title
            this.modal_option_desc = item.desc
            this.modal_option_price = item.price
            this.modal_option_unit = item.unit
            this.modal_option_category = item.category
            this.modal_option_image = item.help_img
            this.modal_option_image_processing = item.help_img
            this.modal_option_type = item.type
            this.modal_new_selections = item.selections
            this.modal_new_selections.forEach(element => {
                element.option_img_processing=element.option_img
            });
            this.option_modal = true
        },
        deleteOption:function(item){
            this.delete_modal = true
            this.delete_id = item.id
        },
        async deleteItemConfirm() {
            try {
                let res = await this.$axios.delete('/api/option/'+this.delete_id)
                this.delete_modal=false
                this.getOptions()
                this.snackbar_color="success"
                this.snackbar_text = "Option Successfully deleted"
                this.snackbar = true
                console.log(res.data.data)
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        async createOption() {
            this.option_modal_loading = true
            if(this.modal_new_selections.length){
                let temp_new_selection = {
                    select_id:0,
                    option_title:"None",
                    option_desc:"No item selected",
                    price:undefined,
                    option_img:""
                }
                this.modal_new_selections.unshift(temp_new_selection)
            }
            try {
                this.modal_selections.forEach(element => {
                    element.option_img_processing=element.option_img
                });
                let res = await this.$axios.post('/api/option',{
                    title:this.modal_option_title,
                    category:this.modal_option_category,
                    type:this.modal_option_type,
                    desc:this.modal_option_desc,
                    price:this.modal_option_price,
                    unit:this.modal_option_unit,
                    help_img:this.modal_option_image,
                    selections:JSON.stringify(this.modal_new_selections)
                })
                this.option_modal_loading = false
                this.option_modal=false
                this.getOptions()
                this.snackbar_color="success"
                this.snackbar_text = "Question Successfully added"
                this.snackbar = true
                this.modal_option_title = ""
                this.modal_option_category = ""
                this.modal_option_type = ""
                this.modal_option_desc = ""
                this.modal_option_price = ""
                this.modal_option_unit = ""
                console.log(res.data.data)
            } catch (e) {
                console.log(e.response.data.message);
                this.modal_error = e.response.data.message
            }
        },
        async uploadModalOptionImage(){
            this.modal_option_image_loading=true
            let temp_data = await this.$utility.uploadImage(this.modal_option_image_processing, Math.floor(Math.random() * 10000000),)
            this.modal_option_image = temp_data.location
            this.modal_option_image_loading=false
        },
        async saveOption() {
            this.option_modal_loading = true
            try {
                this.modal_selections.forEach(element => {
                    element.option_img_processing=""
                });
                let res = await this.$axios.put('/api/option/'+this.edit_id,{
                    title:this.modal_option_title,
                    category:this.modal_option_category,
                    type:this.modal_option_type,
                    desc:this.modal_option_desc,
                    price:this.modal_option_price,
                    unit:this.modal_option_unit,
                    help_img:this.modal_option_image,
                    selections:JSON.stringify(this.modal_new_selections)
                })
                this.option_modal_loading = false
                this.option_modal=false
                this.getOptions()
                this.snackbar_color="success"
                this.snackbar_text = "Question Successfully added"
                this.snackbar = true
                this.modal_option_title = ""
                this.modal_option_category = ""
                this.modal_option_type = ""
                this.modal_option_desc = ""
                this.modal_option_price = ""
                this.modal_option_unit = ""
                console.log(res.data.data)
            } catch (e) {
                console.log(e.response.data.message);
                this.modal_error = e.response.data.message
            }
        },
    }
}
</script>
<style>
.v-tabs-bar{
    border-bottom: solid 1px #dedede;
}
tr:hover{
    background: #f7f9fb !important;
}
.option_desc_img{
    border-radius: 5px;
    width:300px;
    max-width:100%;
}
.option_desc_caption{
    margin-bottom: 7px;
}
.option_selection_img{
    width: 100px;
    border-radius: 3px;
    margin-right: 10px;
}
.option_selection_container{
    display: flex;
    padding: 10px;
    margin: 10px;
    background: #fff;
}
.option_selection_price{
    color: #3ba051;
}
.option_selection_desc{
    margin-bottom: 5px !important;
}
.modal_option_type_container{
    border: solid 1px #a2a2a2;
    border-radius: 7px;
    padding-bottom: 0px;
    position: relative;
    margin-top: 20px;
}
.modal_option_type_title{
    display: inline;
    position: absolute;
    top: -10px;
    background: white;
    padding: 0px 5px;
}
.modal_option_type_group{
    margin-top: 7px !important;
}
.modal_option_info_container{
    margin-top: 25px;
}
.upload_image_title{
    position: absolute;
    top: -9px;
    left: 15px;
}
.upload_image_container{
    position: relative;
}
.selection_remove_btn{
    position: absolute;
    top: 15px;
    left: -22px;
}
.new_selection_container{
    position: relative;
}
.submodal_img_thumbnail{
    height: 100px;
    border-radius: 5px;
}
.submodal_img_thumbnail_container{
    position: relative;
}
.subdesign_style_modal_image_container{
    width: 100%;
    position: relative;
}
.subdesign_style_modal_image{
    width: 100%;
    margin-bottom: -7px;
    border-radius: 5px;
}
.trans_btn{
    background-color: #0000 !important;
    position:absolute;
}
.non_trans_btn{
    background-color:#0005 !important;
    position:relative;
    height: 250px !important;
}
.style_modal_item_container{
    margin-top: 20px;
    position: relative;
}
.style_modal_item_container .v-input__control{
    height: 40px;
}
.stylemodal_item_image{
    max-width: 50px;
    max-height: 50px;
}
.stylemodal_item_image_container{
    align-items: center;
    position: relative;
    display: flex;
}
.stylemodal_item_image_btn_container{
    margin-left: 10px;
}
.stylemodal_item_image_btn{
    margin-left: 2px;
    margin-right:2px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.stylemodal_item_image_container .v-input__control{
    height: 30px;
    padding: 4px 5px 4px 17px;
}

button{
    text-transform: none !important;
}

</style>
<style lang="scss">
    .tooltip {
        &.popover {
            z-index: 999;
            $color: #f9f9f9;

            .popover-inner {
            background: $color;
            color: black;
            padding: 15px;
            border-radius: 5px;
            box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px;
            }
        }
    }
</style>
