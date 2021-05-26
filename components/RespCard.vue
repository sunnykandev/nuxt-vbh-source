<template>
    <v-card class="question_card">
        <div class="question_container">
            <v-row>
                <v-col class="resp_title_container" cols="12" sm="12" md="5" lg="5">
                    <h3 class="question_text">    
                        <v-icon left style="font-size:30px;">mdi-circle-outline</v-icon>                            
                        {{props_resp.title}}
                        <span class="question_if_required" v-if="props_resp.subtitle">({{props_resp.subtitle}})</span>
                    </h3>
                </v-col>
                <v-col class="resp_info_container" cols="12" sm="12" md="7" lg="7">                                    
                    <v-text-field
                        @input="changeAmount"
                        :value="amount"
                        v-if="!local_done"
                        class="resp_text_input"
                        label="Your Amount?"
                        outlined
                        dense
                        type="number"
                    ></v-text-field>
                    <div class="resp_range" v-if="!local_done">
                        <div>
                            <h5>Range</h5>
                            <span>{{props_resp.range}}</span>
                        </div>                                        
                    </div>
                    <v-btn outlined rounded class="px-2 answer_button"  color="dimgrey" elevation="0"> 
                        <v-checkbox
                        @change="changeDone"
                        :true-value ="true"
                        :value="done"
                        v-model="checkbox_value"
                        color="success"
                        label="Done"
                        ></v-checkbox>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
    props:['props_resp','array_key','amount','done','amountChanged','doneChanged'],
    data: () => ({
        local_done:false,
    }),
    watch: {
    },
    computed:{
        checkbox_value:{
            get:function(){
                if(this.done){
                    return true
                }else{
                    return false
                }
            },
            set:function(newvalue){
                console.log(newvalue)
            }
        }
    },
    methods:{
        changeAmount:function(new_val){
            this.amountChanged(this.array_key, new_val)
        },
        changeDone:function(new_val){
            this.local_done = new_val
            this.doneChanged(this.array_key, new_val)
        }
    }
}
</script>

<style>
.question_card{
    max-width:1000px;
    padding: 5px;
    border-radius: 7px !important;
    border: solid 1px #c7c7c7 !important;
    border-left:solid 2px #0f5496 !important ;
    margin-top: 20px;
    margin-bottom: 20px;
    background:#f7f7f7 !important;
}
.question_container{
    align-items: center;
    display: flex;
    flex-wrap: wrap;
}
.question_container button{
    background:white;
    padding-top: 1px;
    text-transform: none;
}
.question_card.checked{
    border: solid 2px #4caf50 !important;
}
.question_card .v-text-field .v-input__control{
    height: 40px;
    background:white;
}
.question_divider .divider_title{
    text-align: left;
    display: inline-block;
    color: #0f5496;
    background: white;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 22px;
}

.question_divider .divider_line{
    width: 100%;
    height: 2px;
    background: #0f5496;
    margin-top: -17px;
}
.question_if_required{
    font-weight: 400;
    color: #757575;
    font-size: 17px;
    white-space: nowrap;
}
.resp_text_input{
    max-width: 145px;
}
.resp_title_container{
    display: flex;
    align-items: center;
}
.resp_info_container{
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
}
.resp_range{
    min-width: 150px;
    margin-right: 10px;
    margin-left: 10px;
}
.question_container .row{
    width: 100%;
    margin: 0px;
}
.question_divider{
    margin-top: 60px;
    margin-bottom: 37px;
}
@media(max-width:600px){
    .resp_range{
        min-width: unset;
    }
    .answer_button {
        padding-right: 10px !important;
        padding-left: 9px !important;
    }
}

@media(max-width:959px){
    .resp_title_container{
        border-bottom: solid 1px #d4d4d4;
    }
}
</style>