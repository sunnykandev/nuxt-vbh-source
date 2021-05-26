<template>
  <div></div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  async mounted() {
    await this.loginPopup(true)    
  },
  methods:{ 
    ...mapMutations({
        loginPopup:'global/loginPopup',
        signupPopup:'global/signupPopup'
    })
  }
}
</script>

<style>
#app {
  background: url('/login_background.jpg') no-repeat center center fixed !important;
  background-size: cover;
}
</style>