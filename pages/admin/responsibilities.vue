<template>
<div>
    <v-card class="px-4" flat>
    <v-card-title>
      <span class="primary--text">HomeOwner Equity Responsibilities</span>
      <v-spacer></v-spacer>
      <v-btn class="px-4" rounded color="primary" elevation="0" @click="add_modal=true">Add New</v-btn>
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
      :items="questions"
      :items-per-page="15"
      group-by="category"
      show-group-by
    >
        <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editModal(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                @click="deleteQuestion(item)"
            >
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
  </v-card>
    <v-dialog v-model="add_modal" width="450">
        <v-card>
            <v-card-title class="login_headline">
              <h3 class="mt-4">Add New Responsibility</h3>
            </v-card-title>
            <v-card-text>
                <v-combobox
                v-model="new_category"
                :items="categories"
                label="Category"
                auto-select-first
                outlined
                dense
                ></v-combobox>
                <v-text-field v-model="new_title" label="Responsibility Title" type="text" outlined dense></v-text-field>
                <v-text-field v-model="new_optional" label="Optional Info" type="text" outlined dense></v-text-field>
                <v-text-field v-model="new_range" label="Range" type="text" outlined dense></v-text-field>
                <p class="error--text">{{new_error}}</p>
            </v-card-text>
            <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn class="px-4 mb-4 mr-3" rounded color="primary" elevation="0" @click="createResponsibility">Create</v-btn>
                
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="edit_modal" width="450">
        <v-card>
            <v-card-title class="login_headline">
              <h3 class="mt-4">Edit Responsibility</h3>
            </v-card-title>
            <v-card-text>
                <v-select
                v-model="edit_category"
                :items="categories"
                label="Category"
                ></v-select>
                <v-text-field v-model="edit_title" label="Responsibility Title" type="text" outlined dense></v-text-field>
                <v-text-field v-model="edit_optional" label="Optional Info" type="text" outlined dense></v-text-field>
                <v-text-field v-model="edit_range" label="Range" type="text" outlined dense></v-text-field>
                <p class="error--text">{{edit_error}}</p>
            </v-card-text>
            <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn class="px-4 mb-4 mr-3" rounded color="primary" elevation="0" @click="updateResponsibility">Save</v-btn>
                
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
export default {
    data () {
      return {
        edit_modal:false,
        edit_category:"",
        edit_error:"",
        edit_title:"",
        edit_optional:"",
        edit_range:"",
        edit_id:"",
        snackbar:false,
        snackbar_text:"",
        snackbar_color:"success",
        new_error:"",
        new_title:"",
        new_optional:"",
        new_range:"",
        new_category:"",
        categories:[],
        add_modal:false,
        search: '',
        headers: [
          {
            text: 'Responsibility',
            align: 'start',
            sortable: false,
            value: 'title',
            groupable: false,
          },
          { text: 'Optional Info', value: 'subtitle' ,groupable: false,},
          { text: 'Category', value: 'category' },
          { text: 'Range', value: 'range',groupable: false, },
          { text: 'Actions', value: 'actions', sortable: false ,groupable: false,},
        ],
        questions: [],
      }
    },
    mounted() {
        this.getQuestions()
    },
    methods:{
        editModal:function(item){
            this.edit_title = item.title
            this.edit_optional = item.subtitle
            this.edit_category = item.category
            this.edit_range = item.range
            this.edit_id=item.id
            this.edit_modal = true
            this.edit_error = ""
        },
        getCategories:function(items){
            let temp_categories = []
            items.forEach(element => {
                temp_categories.push(element.category)
            });
            this.categories = [...new Set(temp_categories)]
        },
        async getQuestions() {
            let res = await this.$axios.get('/api/resp/responsibilities')
            console.log(res.data.data)
            this.questions = [...res.data.data]
            this.getCategories(this.questions)
        },
        async createResponsibility() {
            try {
                let res = await this.$axios.post('/api/resp',{
                    title:this.new_title,
                    category:this.new_category,
                    subtitle:this.new_optional,
                    range:this.new_range
                })
                this.add_modal=false
                this.getQuestions()
                this.snackbar_color="success"
                this.snackbar_text = "Responsibility Successfully added"
                this.snackbar = true
                this.new_title = ""
                console.log(res.data.data)
            } catch (e) {
                console.log(e.response.data.message);
                this.new_error = e.response.data.message
            }
            
        },
        async updateResponsibility() {
            try {
                let res = await this.$axios.put('/api/resp/'+this.edit_id,{
                    title:this.edit_title,
                    category:this.edit_category,
                    subtitle:this.edit_optional,
                    range:this.edit_range
                })
                this.edit_modal=false
                this.getQuestions()
                this.snackbar_color="success"
                this.snackbar_text = "Responsibility Successfully edited"
                this.snackbar = true
                this.edit_question = ""
                console.log(res.data.data)
            } catch (e) {
                console.log(e.response.data.message);
                this.edit_error = e.response.data.message
            }
        },

        async deleteQuestion(item) {
            try {
                let res = await this.$axios.delete('/api/resp/'+item.id)
                this.getQuestions()
                this.snackbar_color="success"
                this.snackbar_text = "Responsibility Successfully deleted"
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
.v-row-group__header{
    background: #f1f6fb !important;
    color: #0f5496;
}
tr:hover{
    background: #f7f9fb !important;
}
</style>