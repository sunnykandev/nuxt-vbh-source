import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  mode:'spa',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - frontend',
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-tooltip.js',
    '~/plugins/vue-viewer.js',
    '~/plugins/vuetify-image-input.js',
    '~/plugins/vue-color-input.js',
    '~/plugins/utility.js',
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    'vuetify-dialog/nuxt',
    ['vuetify-dialog/nuxt', { property: '$dialog' }],
    'nuxt-vuex-localstorage',
  ],

  toast: {
    position: 'top-center',
    iconPack: 'fontawesome',
    duration: 3000,
    register: [
      {
        name: 'defaultSuccess',
        message: (payload) =>
          !payload.msg ? 'Operação bem sucedida' : payload.msg,
        options: {
          type: 'success',
          icon: 'check'
        }
      },
      {
        name: 'defaultError',
        message: (payload) =>
          !payload.msg ? 'Oops.. Erro inesperado' : payload.msg,
        options: {
          type: 'error',
          icon: 'times'
        }
      }
    ]
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.buyavaluebuildhome.com',
    //baseURL: 'http://127.0.0.1:4000',
  },

  auth: {
    localStorage: false,
    strategies: {
      local: {
        scheme:'refresh',
        token:{
          property:'token',
          maxAge:990,
        },
        refreshToken:{
          property:'refresh_token',
          maxAge:60*60*24*30,
          data:'refresh'
        },
        user:{
          property:'user',
          autoFetch:false
        },
        endpoints: {
          login: {
            url: '/api/auth/login/',
            method: 'post',            
            property:'token',
            altProperty:'refresh_token',
            propertyName:'token',
          },
          user:{
            url:'/api/auth/user',
            method:'get',
            propertyName:'user'
          },
          refresh:{
            url:'/api/auth/refreshToken/',
            method:'post',
            propertyName:'token'
          },
          logout: {
            url: '/api/auth/logout/',
            method: 'post',
          },
        },
        tokenType:'Bearer'
      }
    },
    redirect:false
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
      icons:{
        iconfont:'mdiSvg'
      },
      customVariables: ['~/assets/variables.scss'],
      theme: {
        light: true,
        themes: {
          dark: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3
          },
          light: {
            white:'#FFFFFF',
            primary: '#0f5496',
            accent: '#e91e63',
            secondary: colors.grey.darken3,
            success: '#4CAF50',
            info: '#2196F3',
            warning: '#FB8C00',
            error: '#FF5252',
            gold:'#d6a535',
            dimgrey:'#5f636f'
          }
        }
      }
    },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
