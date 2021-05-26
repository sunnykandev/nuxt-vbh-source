<template>
  <v-app light>
    <Snackbar />
    <v-navigation-drawer
      v-model="drawer"
      :left="left"
      :temporary="sidebar_temporary"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <client-only>
          <span v-if="this.$auth.loggedIn">
            <v-list-item
              v-for="(item) in logged_items"
              :key="item.title"
              :to="item.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </span>
        </client-only>
        <v-list-item
          v-for="(item) in items"
          :key="item.title"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <client-only>
        <v-list v-if="this.$auth.loggedIn&&this.$auth.user.scope=='admin'">
          <v-divider></v-divider>
          <v-subheader class="primary--text">Admin Panel</v-subheader>
          <v-list-item-group
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in admin_items"
              :key="i"
              :to="item.to"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list> 
      </client-only>
         

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app      
      color="white"      
      :elevation="0"
      :elevate-on-scroll='true'
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />     
      <img
        class="mx-2"
        src="/site_logo.svg"
        style="max-height:70%;"
      >
      <v-spacer />

      <v-tooltip 
      bottom>
        <template v-slot:activator="{ on, attrs }">
          <div
          @click="$router.push('/choose_home?loved=1')"
          v-bind="attrs"
          v-on="on"
          class="d-none d-sm-flex flex-column align-center mt-1 px-3 cursor_pointer">
            <v-icon
            >
            mdi-heart-outline
            </v-icon>
            <h5>
              Loved
            </h5>
          </div>
        </template>
        <span>Favorite Homes</span>
      </v-tooltip>

      <v-tooltip 
      bottom>
        <template v-slot:activator="{ on, attrs }">
          <div
          @click="$router.push('/choose_home?saved=1')"
          v-bind="attrs"
          v-on="on"
          class="d-none d-sm-flex flex-column align-center mt-1 px-3 cursor_pointer mr-2">
            <v-icon
            >
            mdi-content-save-edit-outline
            </v-icon>
            <h5>
              Saved
            </h5>
          </div>
        </template>
        <span>Saved Home Customizations</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <div 
          @click="$router.push('/land')"
          v-bind="attrs"
          v-on="on"
          class="d-none d-sm-flex flex-column align-center mt-1 px-3 cursor_pointer">
            <LandSvg width="28px" height="28px" viewBox="0,0,400,400"/>
            <h5 class="success--text">
              ${{$store.state.localStorage.land_cost}}
            </h5>
          </div>
        </template>
        <span>Cost for Land</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <div 
          @click="$router.push('/home_owner_equity_responsibility')"
          v-bind="attrs"
          v-on="on"
          class="d-none d-sm-flex flex-column align-center mt-1 px-3 cursor_pointer">
            <HomeCare width="28px" height="28px" viewBox="0,0,400,400"/>
            <h5 class="success--text">
              ${{$store.state.localStorage.resp_cost}}
            </h5>
          </div>
        </template>
        <span>Cost for Home Owner Equity Responsibilities</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <div 
          @click="$router.push('/customize/last_customized_home?id='+$store.state.localStorage.last_customized_home)"
          v-bind="attrs"
          v-on="on"
          class="d-none d-sm-flex flex-column align-center mt-1 px-3 cursor_pointer">
            <DesignSvg width="28px" height="28px" viewBox="0,0,400,400"/>
            <h5 class="success--text">
              ${{$store.state.localStorage.home_cost}}
            </h5>
          </div>
        </template>
        <span>Cost for Customized Home</span>
      </v-tooltip>

      <div 
      class="d-flex flex-column align-center mt-1 px-3">
        <h4 class="success--text">${{$store.state.localStorage.total_cost}}</h4>
        <h5>Total</h5>
      </div>
      <client-only>
        <v-btn
          v-if="!$auth.loggedIn"
          outlined 
          rounded 
          color="secondary"
          class="mx-1 d-none d-sm-flex"
          nuxt  
          @click="login_modal"
        >
        Login
        </v-btn>
      </client-only>
      
      <client-only>
        <v-menu
          v-if="$auth.loggedIn"
          offset-y
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-avatar                
              >
                <v-icon x-large>mdi-account-circle-outline</v-icon>
              </v-avatar>
            </v-btn>
          </template>  
          <v-list>
            <v-list-item
              v-for="item in logged_items"
              :key="item.title"
              :to="item.to"
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </client-only>
      
      <Login/>
      <Signup/>
      
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>    
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapMutations} from 'vuex'
import Snackbar from '../components/Snackbar.vue'
import Login from '../components/dialogs/Login'
import Signup from '../components/dialogs/Signup'
import LandSvg  from '~/components/custom_icons/LandSvg'
import DesignSvg  from '~/components/custom_icons/DesignSvg'
import HomeCare  from '~/components/custom_icons/HomeCare'

export default {
  components: {
    Snackbar,
    Login,
    Signup,
    LandSvg,
    DesignSvg,
    HomeCare
  },
  data () {
    return {
      clipped: true,
      fixed: false,
      login_popup:false,
      signup_popup:false,
      admin_items:[
        {
          icon: 'mdi-account-arrow-right',
          title: 'Customers',
          to: '/admin/customers'
        },
        {
          icon: 'mdi-account-arrow-right',
          title: 'Home Designs',
          to: '/admin/homes'
        },
        {
          icon: 'mdi-account-arrow-right',
          title: 'Land Questions',
          to: '/admin/land'
        },
        {
          icon: 'mdi-account-arrow-right',
          title: 'Responsibilities',
          to: '/admin/responsibilities'
        },
        {
          icon: 'mdi-account-arrow-right',
          title: 'Add-on Options',
          to: '/admin/options'
        },
        {
          icon: 'mdi-account-arrow-right',
          title: 'Page Contents',
          to: '/admin/page_contents'
        },
      ],
      logged_items: [
        {
          icon: 'mdi-account-arrow-right',
          title: 'Logout',
          to: '/logout'
        }
      ],
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'Homepage',
          to: '/'
        },
        {
          icon: 'mdi-cash-check',
          title: 'Buying Power',
          to: '/buying_power'
        },
        {
          icon: 'mdi-map-marker-radius-outline',
          title: 'Land Information',
          to: '/land'
        },
        {
          icon: 'mdi-shield-home-outline',
          title: 'Owner Responsibilities',
          to: '/home_owner_equity_responsibility'
        },
        {
          icon: 'mdi-folder-home-outline',
          title: 'Browse Home types',
          to: '/choose_home'
        }
      ],
      
      miniVariant: false,
      left: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted() {
      let uri_array = this.$route.path.split("/")
      if(uri_array[1]=="admin"){
        this.changeSidebarTemporary(false)
        this.changeDrawer(true)
      }
  },
  watch: {
    $route() {
      let uri_array = this.$route.path.split("/")
      if(uri_array[1]=="admin"){
        this.changeSidebarTemporary(false)
        this.changeDrawer(true)
      }else{
        this.changeSidebarTemporary(true)
        this.changeDrawer(false)
      }
    },
  },
  computed:{
    sidebar_temporary:{
      set(temporary){
        this.changeSidebarTemporary(temporary)
      },
      get(){
        return this.$store.state.global.sidebar_temporary
      }
    },
    drawer:{
      set(open){
        this.changeDrawer(open)
      },
      get(){
        return this.$store.state.global.drawer
      }
    },
  },
  methods:{    
    login_modal:function(){
      this.loginPopup(true)
    },
    signup_modal:function(){
      this.signupPopup(true)
    },    
    ...mapMutations({
        loginPopup:'global/loginPopup',
        signupPopup:'global/signupPopup',
        changeSidebarTemporary:'global/changeSidebarTemporary',
        changeDrawer:'global/changeDrawer'
    })
  }
}
</script>
<style>
  .v-app-bar .v-toolbar__content {
    border-bottom: 1px solid #dcdcdc;
  }
  .cursor_pointer{
    cursor: pointer;
  }
</style>
