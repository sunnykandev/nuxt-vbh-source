import Vue from 'vue'
import Vuetify from 'vuetify'

import colors from 'vuetify/es5/util/colors'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
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
  })
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}