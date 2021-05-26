<template>
  <v-card class="px-4" flat>
    <v-card-title>
      <span class="primary--text">Customers</span>
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
      :items="customers"
      group-by="chosenHome"
      show-group-by
      single-expand
      :expanded.sync="expanded"
      item-key="email"
      show-expand
    >
      <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
              <v-container>
                  <v-row>
                      <v-col cols="12" sm="6">
                          <h4 class="primary--text">Land Status</h4>
                          <div
                          v-for="(question) in item.landInfo"
                          :key="question.title"
                          >
                            <div
                            v-if="question.check_value"
                            >
                              <div>{{question.title}}
                                <v-chip
                                  small
                                  class="ma-2"
                                  color="success"
                                  text-color="white"
                                >
                                  <v-avatar left>
                                    <v-icon small>mdi-check-circle</v-icon>
                                  </v-avatar>
                                  <span
                                  v-if="question.amount_value"
                                  >$ {{question.amount_value}}</span>
                                  <span v-else>YES</span>
                                </v-chip>
                              </div>
                            </div>
                          </div>

                          <h4 class="mt-5 mb-2 primary--text">Owner Responsibilities</h4>
                          <div
                          v-for="(question, i) in item.respInfo"
                          :key="i"
                          >
                            <div>
                              <div>{{question.title}}
                                <v-chip
                                  v-if="question.done"
                                  small
                                  class="ma-2"
                                  color="success"
                                  text-color="white"
                                >
                                  <v-avatar left>
                                    <v-icon small>mdi-check-circle</v-icon>
                                  </v-avatar>
                                  <span>Done</span>
                                </v-chip>
                                <v-chip
                                  v-else
                                  small
                                  class="ma-2"
                                  color="gold"
                                  text-color="white"
                                >
                                  <v-avatar left>
                                    <v-icon small>mdi-currency-usd</v-icon>
                                  </v-avatar>
                                  <span>{{question.amount}}</span>
                                </v-chip>
                              </div>
                            </div>
                          </div>

                      </v-col>
                      <v-col cols="12" sm="6">
                        <h4 class="primary--text mb-5">Customized Home
                          <v-chip
                            v-if="item.homeInfo"
                            small
                            class="ma-2"
                            color="success"
                            text-color="white"
                          >
                            <span
                            >$ {{item.homeCost}}</span>
                          </v-chip>
                        </h4>
                        <div>
                          <div>
                            <img style="max-width:100%" :src="item.chosenHomeImage" alt="">
                          </div>
                          <center>
                          <h3 class="my-2"><span class="primary--text">{{item.subdesignName}}</span> &nbsp <small>{{item.styleTitle}}</small></h3>
                          </center>
                        </div>
                        <div>
                          <div
                          v-for="(option) in item.chosen_options"
                          :key="option.title"
                          >
                          {{option.title}}
                          <span v-if="option.select">/{{option.select.option_title}}</span>
                          <v-chip
                            x-small
                            class="ma-2"
                            color="success"
                            text-color="white"
                          >
                            <span
                            v-if="option.price&&!option.select"
                            >$ {{option.price}}</span>
                            <span v-if="!option.price&&option.select">
                              $ {{option.select.price}}
                            </span>
                            <span v-if="!option.price&&!option.select">included</span>
                            <span v-if="option.select&&!option.select.price">included</span>
                          </v-chip>
                          <span v-if="option.number!=0"> X {{option.number}}</span>
                          </div>
                        </div>
                      </v-col>
                  </v-row>
              </v-container>
          </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
    data () {
      return {
        expanded:[],
        homes:[],
        options:[],
        search: '',
        headers: [
          { text: 'Email', value: 'email' ,groupable: false},
          { text: 'Phone', value: 'phone' ,groupable: false},
          { text: 'Signup Date', value: 'createdAt' ,groupable: false},
          { text: 'Chosen Home', value: 'chosenHome'},
          { text: '', value: 'data-table-expand',groupable: false },
        ],
        customers: [],
      }
    },
    mounted() {
        this.getCustomers()
    },
    computed:{
    },
    methods:{
        async getCustomers() {
            let res = await this.$axios.get('/api/user/customers')
            console.log(res.data.data)
            let res_customers = [...res.data.data.customers]
            this.homes = [...res.data.data.homes]
            this.options = [...res.data.data.options]
            let temp_customers = []
            res_customers.forEach(element => {
                element.fullName = element.firstName+" "+element.lastName
                let d = new Date(element.createdAt)
                d = d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate()
                element.createdAt = d
                if(element.homeInfo){
                  element.chosenHome = this.getHomeNameById(element.homeInfo.id)
                  this.homes.forEach(home => {
                    if(home._id==element.homeInfo.id){
                      let temp_subdesigns = JSON.parse(home.subdesigns)
                      let temp_subdesign = temp_subdesigns[element.homeInfo.selected_subdesign]
                      element.subdesignName = temp_subdesign.title
                      temp_subdesign.styles.forEach(style => {
                        if(style.title==element.homeInfo.selected_style_title){
                          element.chosenHomeImage= style.image
                          element.styleTitle=style.title
                          return false
                        }
                      });
                      return false
                    }
                  });

                  let temp_array = []
                  element.homeInfo.options.forEach(chosen_option => {
                    this.options.forEach(option => {
                      if(chosen_option.id==option._id){
                        let temp_obj={
                          id:option._id,
                          check:chosen_option,
                          title:option.title,
                          number:chosen_option.number,
                          select:chosen_option.select,
                          price:option.price
                        }
                        temp_array.push(temp_obj)
                      }
                    });
                  });
                  element.chosen_options = temp_array
                }else{
                  element.chosenHome = "Not Yet"
                }

            });
            console.log(res_customers)
            this.customers = res_customers
        },
        getHomeNameById(id){
          let title = ""
          this.homes.forEach(home => {
            if(home._id==id){
              title = home.title
              return title
            }
          });
          return title
        }
    }
}
</script>