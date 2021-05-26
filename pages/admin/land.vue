<template>
<div>
    <v-card class="px-4" flat>
    <v-card-title>
      <span class="primary--text">Land Questions</span>
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
              <h3 class="mt-4">Add New Land Question</h3>
            </v-card-title>
            <v-card-text>                
                <v-text-field v-model="new_question" label="Question Text" type="text" outlined dense></v-text-field>
                <div class="d-flex">
                    <v-checkbox
                    class="mr-5"
                    dense
                    v-model="new_checkable"
                    label="Yes/No"
                    ></v-checkbox>
                    <v-checkbox
                    dense
                    v-model="new_amount"
                    label="Ask Amount"
                    ></v-checkbox>
                </div>
                <p class="error--text">{{new_error}}</p>
            </v-card-text>
            <v-card-actions class="mt-n6">
                <v-spacer></v-spacer>
                <v-btn class="px-4 mb-4 mr-3" rounded color="primary" elevation="0" @click="createLandQuestion">Create</v-btn>
                
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="edit_modal" width="450">
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
        edit_error:"",
        edit_question:"",
        edit_checkable:"",
        edit_amount:"",
        edit_id:"",
        snackbar:false,
        snackbar_text:"",
        snackbar_color:"success",
        new_error:"",
        new_question:"",
        add_modal:false,
        new_checkable:true,
        new_amount:false,
        search: '',
        headers: [
          {
            text: 'Question',
            align: 'start',
            sortable: false,
            value: 'title',
          },
          { text: 'Checkable', value: 'check' },
          { text: 'Ask Amount', value: 'amount' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        questions: [],
      }
    },
    mounted() {
        this.getQuestions()
    },
    methods:{
        editModal:function(item){
            this.edit_question = item.title
            this.edit_checkable = item.check
            this.edit_amount = item.amount
            this.edit_id = item.id
            this.edit_modal = true
            this.edit_error = ""
        },
        async getQuestions() {
            let res = await this.$axios.get('/api/land/questions')
            console.log(res.data.data)
            this.questions = [...res.data.data]
        },
        async createLandQuestion() {
            try {
                let res = await this.$axios.post('/api/land',{
                    title:this.new_question,
                    parent:0,
                    check:this.new_checkable,
                    amount:this.new_amount
                })
                this.add_modal=false
                this.getQuestions()
                this.snackbar_color="success"
                this.snackbar_text = "Question Successfully added"
                this.snackbar = true
                this.new_question = ""
                console.log(res.data.data)
            } catch (e) {
                console.log(e.response.data.message);
                this.new_error = e.response.data.message
            }
            
        },
        async editQuestion() {
            try {
                let res = await this.$axios.put('/api/land/'+this.edit_id,{
                    title:this.edit_question,
                    parent:0,
                    check:this.edit_checkable,
                    amount:this.edit_amount
                })
                this.edit_modal=false
                this.getQuestions()
                this.snackbar_color="success"
                this.snackbar_text = "Question Successfully edited"
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
                let res = await this.$axios.delete('/api/land/'+item.id)
                this.getQuestions()
                this.snackbar_color="success"
                this.snackbar_text = "Question Successfully deleted"
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
</style>