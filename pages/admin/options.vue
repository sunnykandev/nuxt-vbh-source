<template>
<div>
    <v-card class="px-4" flat>
    <v-card-title>
      <span class="primary--text">Common Options</span>
      <v-spacer></v-spacer>
      <v-btn class="px-4" rounded color="primary" elevation="0" @click="addModal">Add New</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="options"
      group-by="category"
      show-group-by
      single-expand
      :expanded.sync="expanded"
      item-key="title"
      show-expand
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

    <!-- <v-dialog v-model="edit_modal" width="450">
        <v-card>
            <v-card-title class="login_headline">
              <h3 class="mt-4">Edit Question</h3>
            </v-card-title>
            <v-card-text>                
                <v-text-field v-model="edit_question" label="Question Text" type="text" outlined dense></v-text-field>
                <div class="d-flex">
                    <v-checkbox
                    class="mr-5"
                    dense
                    v-model="edit_checkable"
                    label="Yes/No"
                    ></v-checkbox>
                    <v-checkbox
                    dense
                    v-model="edit_amount"
                    label="Ask Amount"
                    ></v-checkbox>
                </div>
                <p class="error--text">{{edit_error}}</p>
            </v-card-text>
            <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn class="px-4 mb-4 mr-3" rounded color="primary" elevation="0" @click="editQuestion">Save</v-btn>
                
            </v-card-actions>
        </v-card>
    </v-dialog> -->
    
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
</div>
</template>

<script>
import VImageInput from 'vuetify-image-input';
export default {
    data () {
      return {
          option_modal_loading:false,
        option_modal: false,
        delete_modal:false,
        delete_id:0,
        edit_id:0,

        categories:[],
        modal_option_image_loading:false,
        modal_option_image_processing:"",
        modal_existing_selections:[],
        modal_new_selections:[],
        modal_option_title:"",
        modal_option_price:"",
        modal_option_unit:"",
        modal_option_desc:"",
        modal_option_image:"",
        modal_option_category:"",
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
      }
    },
    components: {
        VImageInput,
    },
    mounted() {
        this.getOptions()
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
        async uploadModalOptionImage(){
            this.modal_option_image_loading=true
            let temp_data = await this.$utility.uploadImage(this.modal_option_image_processing, Math.floor(Math.random() * 10000000),)
            this.modal_option_image = temp_data.location
            this.modal_option_image_loading=false
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
        addModal:function(){
            this.option_modal = true
            this.modal_type = "add"
        },
        getCategories:function(items){
            let temp_categories = []
            items.forEach(element => {
                temp_categories.push(element.category)
            });
            this.categories = [...new Set(temp_categories)]
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
                this.modal_option_image=""
                this.modal_option_price = ""
                this.modal_option_unit = ""
                console.log(res.data.data)
            } catch (e) {
                console.log(e.response.data.message);
                this.modal_error = e.response.data.message
            }
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
                this.modal_option_image = ""
                this.modal_option_price = ""
                this.modal_option_unit = ""
                console.log(res.data.data)
            } catch (e) {
                console.log(e.response.data.message);
                this.modal_error = e.response.data.message
            }
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
        }
    }
}
</script>
<style>
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

</style>