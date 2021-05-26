<template>
    <v-row justify="center" align="center">
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item,i) in browse_contents.carousel_items"
          :key="i"
          :src="item.image"
          style="background:linear-gradient(to right,rgba(0,0,0,.25) 0,rgba(0,0,0,0) 81%,rgba(0,0,0,0) 75%);"
        >
        <div style="height:100%; padding-left:8%;padding-right:8%;">
          <div class="d-flex align-center" style="height:100%;">
            <div style="transform: translate(0px, -50px); max-width:500px; padding-top:40px; padding-bottom:30px;">
              <h1 style="font-size:40px;text-shadow:0px 0px 6px rgb(0 0 0 / 90%);" class="white--text">{{item.title}}</h1>
              <h2 style="text-shadow:0px 0px 6px rgb(0 0 0 / 90%);" class="white--text">{{item.subtitle}}</h2>
              <p style="text-shadow:0px 0px 6px rgb(0 0 0 / 90%); margin-top:20px;" class="white--text">{{item.content}}</p>
            </div>
          </div>
        </div>
        
        </v-carousel-item>
      </v-carousel>

      <v-container>
        <v-row>
          <v-col cols="12">
            <v-slide-group
              multiple
              show-arrows
              class="home_filter_container"
            >
              <v-spacer></v-spacer>             

              <v-slide-item>
                <v-select
                  v-model="filter_size"
                  class="home_filter_item area_select"
                  :items="size_items"   
                  item-text="text"
                  item-value="value"               
                  label="Lot Size"
                  outlined
                  dense
                  prepend-inner-icon="$dropdown" 
                  min-width=100
                  max-width=120    
                >                
                </v-select>
              </v-slide-item>        

              <v-slide-item>
                <v-select
                  v-model="filter_beds"
                  class="home_filter_item bed_select"
                  :items="beds_items"
                  item-text="text"
                  item-value="value"
                  label="Beds"
                  outlined
                  dense   
                  prepend-inner-icon="$dropdown"     
                >                
                </v-select>
              </v-slide-item> 

              <v-slide-item>
                <v-select
                  v-model="filter_baths"
                  class="home_filter_item bath_select"
                  :items="baths_items"
                  item-text="text"
                  item-value="value"
                  label="Baths"
                  outlined
                  dense   
                  prepend-inner-icon="$dropdown"
                >
                </v-select>
              </v-slide-item>

              <v-slide-item>
                <v-select
                v-model="filter_garage"
                  class="home_filter_item garage_select"
                  :items="garage_items"
                  item-text="text"
                  item-value="value"
                  label="Garage"
                  outlined
                  dense   
                  prepend-inner-icon="$dropdown"     
                >                
                </v-select>
              </v-slide-item>

              <v-slide-item>
                <v-menu
                  v-model="price_popover"
                  :close-on-content-click="false"
                  :nudge-width="200"
                  offset-x
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    prepend-inner-icon="$dropdown"
                    class="home_filter_item garage_select"
                    style="font-size:15px; font-weight:500;"
                    label="Price"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :value="price_range_text"
                    ></v-text-field>
                  </template>

                  <v-card>
                    <v-card-text>
                      <v-range-slider
                        v-model="price_range"
                        :max="max_price"
                        :min="min_price"
                        hide-details
                        step="1000"
                        class="align-center"
                      >
                        <template v-slot:prepend>
                          <v-text-field
                            :value="price_range[0]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px; font-size:13px;"
                            @change="$set(price_range, 0, $event)"
                          ></v-text-field>
                        </template>
                        <template v-slot:append>
                          <v-text-field
                            :value="price_range[1]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px; font-size:13px;"
                            @change="$set(price_range, 1, $event)"
                          ></v-text-field>
                        </template>
                      </v-range-slider>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                        color="primary"
                        text
                        @click="price_popover = false"
                      >
                        Done
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
                  
                
              </v-slide-item>

              <v-spacer></v-spacer>

              <v-slide-item>
                <v-select
                  v-model="sort_term"
                  class="home_filter_item  home_filter_sort"
                  style="font-size:14px;"
                  :items="sort_items"
                  item-text="text"
                  item-value="value"
                  label="Sort By"
                  outlined
                  dense   
                  min-width=100
                  max-width=120    
                >                
                </v-select>
              </v-slide-item>

              <v-spacer></v-spacer>
            </v-slide-group>            
                          
          </v-col>


        </v-row>
      </v-container>    
      <v-container id="plans_container" class="plans_container">
        <v-row>
            <HomeCard
            v-for="(home, i) in filtered_homes"
            :key="i"
            :title="home.title"
            :option_count="home.options.length"
            :size="home.size"
            :beds="home.beds"
            :baths="home.baths"
            :garage="home.garage"
            :baseprice="home.baseprice"
            :images="home.images"
            :id="home.id"
            />               
        </v-row>
      </v-container>  
    </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import HomeCard from '~/components/HomeCard'
import {mapMutations} from 'vuex'


export default {
  data(){
      return{
        browse_contents:{},
          sort_term:"",
          filter_size:0,
          filter_beds:0,
          filter_baths:0,
          filter_garage:0,
          price_popover:false,
          max_price:0,
          min_price:0,
          price_range:[],
          garage_array:[],
          baths_array:[],
          beds_array:[],
          price_array:[],
          size_array:[],
          homes:[],
          sort_items:[{text:"Small Size", value:"size_asc"},
          {text:"Large Size", value:"size_desc"},
          {text:"Cheapest", value:"price_asc"},
          {text:"Expensive", value:"price_desc"},],
          size_items:[],
          beds_items:[],
          baths_items:[],
          garage_items:[],
          count_items:['1','2+','3+','4+','5+','6+','7+','8+','9+','10+'],
          price_items:['Less than 100k','100k ~ 120k' , '120k ~ 150k' , '150k ~ 180k', '180k ~ 200k'],
          items: ['Foo', 'Bar', 'Fizetz', 'Bquzz', 'Bar', 'Fizz', 'Buzsz', 'Bsar', 'Fizgz', 'Buhzz', 'Barr', 'Feargizz', 'Beruzz', 'Bajh4r', 'Fizthz', 'Buyzz'],
          carousel_items: [
            {
              src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg',
            },
            {
              src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/brewster-mcleod-architects-1486154143.jpg',
            }
          ],
      }
  },
  components: {
    Logo,
    VuetifyLogo,
    HomeCard,
  },
  mounted() {
      this.fetchPageContents()
      this.getHomes()
  },
  computed:{
    price_range_text(){
      return this.price_range[0]/1000+"K~"+this.price_range[1]/1000+"K"
    },
    filtered_homes(){
      let temp_filter_size = this.filter_size
      let temp_filter_beds = this.filter_beds
      let temp_filter_baths = this.filter_baths
      let temp_filter_garage = this.filter_garage
      let temp_filter_max_price = this.price_range[1]
      let temp_filter_min_price = this.price_range[0]

      let saved_home_ids = this.$store.state.localStorage.customized_homes.map(a => a.id);
      let loved_home_ids = this.$store.state.localStorage.favorite_homes
      let temp_filtered_homes = []
      if(this.$route.query.loved){
        console.log('1')
        temp_filtered_homes = this.homes.filter(function (home) {
            return home.size>temp_filter_size&&
            home.beds>temp_filter_beds&&
            home.baths>temp_filter_baths&&
            home.garage>temp_filter_garage&&
            home.baseprice>temp_filter_min_price&&
            home.baseprice<temp_filter_max_price&&
            loved_home_ids.includes(home.id)
        })
      }else if(this.$route.query.saved){
        console.log('1')
        temp_filtered_homes = this.homes.filter(function (home) {
            return home.size>temp_filter_size&&
            home.beds>temp_filter_beds&&
            home.baths>temp_filter_baths&&
            home.garage>temp_filter_garage&&
            home.baseprice>temp_filter_min_price&&
            home.baseprice<temp_filter_max_price&&
            saved_home_ids.includes(home.id)
        })
      }else{
        console.log('1')
        temp_filtered_homes = this.homes.filter(function (home) {
            return home.size>temp_filter_size&&
            home.beds>temp_filter_beds&&
            home.baths>temp_filter_baths&&
            home.garage>temp_filter_garage&&
            home.baseprice>temp_filter_min_price&&
            home.baseprice<temp_filter_max_price
        })
      }
      
      if(this.sort_term=="size_asc"){
        temp_filtered_homes.sort((a, b) => (a.size > b.size) ? 1 : -1)
      }else if(this.sort_term=="size_desc"){
        temp_filtered_homes.sort((a, b) => (a.size > b.size) ? -1 : 1)
      }else if(this.sort_term=="price_asc"){
        temp_filtered_homes.sort((a, b) => (a.baseprice > b.baseprice) ? 1 : -1)
      }else if(this.sort_term=="price_desc"){
        temp_filtered_homes.sort((a, b) => (a.baseprice > b.baseprice) ? -1 : 1)
      }
      return temp_filtered_homes
    }
  },
  methods:{
    async fetchPageContents(){
        let res = await this.$axios.get('/api/pagecontents/allpages')
        console.log(res.data.data)
        let page_data = [...res.data.data]
        this.savePageContents(page_data)
        page_data.forEach((element,i) => {
            if(element.pageName == 'browse'){
                this.browse_contents = {...page_data[i].pageContents}
            }
            if(element.pageName == 'homepage'){
                this.homepage_contents = {...page_data[i].pageContents}
            }
        });
    },
    async getHomes(){
        let res = await this.$axios.get('/api/home/homes')
        console.log(res.data.data)
        this.homes = [...res.data.data]
        this.homes.forEach(element => {
            element.options = JSON.parse(element.options)
            element.subdesigns = JSON.parse(element.subdesigns)
            let temp_array = []
            element.subdesigns.forEach(item => {
              temp_array.push(item.main_image)
            });
            element.images = temp_array
            this.price_array.push(element.baseprice)
            this.size_array.push(element.size)
            this.beds_array.push(element.beds)
            this.baths_array.push(element.baths)
            this.garage_array.push(element.garage)
            this.max_price = Math.max(...this.price_array)
            this.max_price = (this.max_price-(this.max_price%1000))+1000
            this.min_price = Math.min(...this.price_array)
            this.min_price = (this.min_price-(this.min_price%1000))
            this.price_range = [this.min_price, this.max_price]
            console.log(this.price_range)
        });
        this.setFilterItems()
    },
    setFilterItems(){
      let min_size = Math.min(...this.size_array)
      let max_size = Math.max(...this.size_array)
      for (var i = 0; i<10000 ; i=i+250){
        if(i>min_size){
          let temp_item = {
            text:(i-250)+"+ sqft",
            value:i-250
          }
          this.size_items.push(temp_item)
        }
        if(i > max_size) {
          this.size_items.unshift({text:'All',value:0})
          break
        }
      }

      let min_beds = Math.min(...this.beds_array)
      let max_beds = Math.max(...this.beds_array)
      for (var i = 0; i<10 ; i++){
        if(i>min_beds){
          let temp_item = {
            text:(i-1)+"+",
            value:i-1
          }
          this.beds_items.push(temp_item)
        }
        if(i > max_beds){
          this.beds_items.unshift({text:'All',value:0})
          break
        }
      }
      console.log(this.beds_items)

      let min_baths = Math.min(...this.baths_array)
      let max_baths = Math.max(...this.baths_array)
      for (var i = 0; i<10 ; i++){
        if(i>min_baths){
          let temp_item = {
            text:(i-1)+"+",
            value:i-1
          }
          this.baths_items.push(temp_item)
        }
        if(i > max_baths) {
          this.baths_items.unshift({text:'All',value:0})
          break
        }
      }
      console.log(this.beds_items)

      let min_garage = Math.min(...this.garage_array)
      let max_garage = Math.max(...this.garage_array)
      for (var i = 0; i<10 ; i++){
        if(i>min_garage){
          let temp_item = {
            text:(i-1)+"+",
            value:i-1
          }
          this.garage_items.push(temp_item)
        }
        if(i > max_garage){
          this.garage_items.unshift({text:'All',value:0})
          break
        }
      }
      console.log(this.beds_items)
      
    },
    ...mapMutations({
        savePageContents:'localStorage/savePageContents',
    })
  }
}
</script>
<style>
  .v-main__wrap>.container{
    max-width: 100% !important;
  }
  .area_select .v-input__icon--prepend-inner{
    background: url("https://preview.colorlib.com/theme/homes/img/rooms/size.png") no-repeat center;
  }
  .area_select .v-input__icon--prepend-inner .v-icon{
    display: none;
  }
  .bed_select .v-input__icon--prepend-inner{
    background: url("https://preview.colorlib.com/theme/homes/img/rooms/bed.png") no-repeat center;
  }
  .bed_select .v-input__icon--prepend-inner .v-icon{
    display: none;
  }

  .bath_select .v-input__icon--prepend-inner{
    background: url("https://preview.colorlib.com/theme/homes/img/rooms/bath.png") no-repeat center;
  }
  .bath_select .v-input__icon--prepend-inner .v-icon{
    display: none !important;
  }

  .garage_select .v-input__icon--prepend-inner{
    background: url("https://preview.colorlib.com/theme/homes/img/rooms/garage.png") no-repeat center;
  }
  .garage_select .v-input__icon--prepend-inner .v-icon{
    display: none;
  }

  .home_filter_item .v-input__icon--prepend-inner{
    -webkit-filter: hue-rotate(348deg) saturate(60);
    filter: hue-rotate(348deg) saturate(60);
    margin-right: 3px;
  }
  .home_filter_sort .v-input__icon--prepend-inner{
    -webkit-filter: hue-rotate(0deg) saturate(1);
    filter: hue-rotate(0deg) saturate(1);    
  }

  .home_filter_sort .v-input__icon--prepend-inner i{
    color: #0180ff !important;
  }

  .home_filter_item{
    max-width: 150px;
    float: right;
    margin-right: 10px !important;
  }
  .home_filter_sort{
    float: left;
  }
  .v-select.v-input--dense .v-select__selection--comma{
    font-weight: 600;
  }
  .v-text-field--outlined.v-input--dense .v-label{
    font-weight: 600;
    color: #000;
  }
  .home_filter_item .v-input__control{
    height: 44px;
  }
  .v-slide-group__next>i{
    margin-bottom: 4px;
  }
  .v-slide-group__prev>i{
    margin-bottom: 4px;
  }
  .v-slide-group__wrapper{
    padding-top: 5px;
  }
  .v-slide-group__next, .v-slide-group__prev{
    min-width: 30px;
  }
  .v-slide-group__next{
    margin-right: -11px;
  }
  .v-slide-group__prev{
    margin-left: -11px;
  }
  .home_filter_container{
    background: white;
    background-color: white;
    margin-top: -36px;
    z-index: 1;
    padding: 12px;
    border-radius: 5px;
    box-shadow: 2px 15px 30px rgb(0 0 0 / 10%);
  }
  .v-application{
    background: #f1f2f3 !important;
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
