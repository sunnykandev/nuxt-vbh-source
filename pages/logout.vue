
<template>
  <div></div>
</template>

<script>
export default {
  async created() {
    await this.$auth.logout({
        data: {
        },
    })
    this.$router.push('/')
  }
}
</script>