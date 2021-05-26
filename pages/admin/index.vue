<template>
  <div></div>
</template>

<script>
export default {
    created: function(){
        if(this.$auth.loggedIn){
            if(this.$auth.user.scope=="customer"){
                //this.$router.push('/');
            }
        }
    },
}
</script>