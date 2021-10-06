<template>
<navbar/>
  <h1>CREATE POST TEST</h1>
</template>

<script>

import navbar from "@/components/navbar";

export default {
name: "Createpost",
  components: {navbar},
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.id == -1) {
      this.$router.push('/');
      return ;
    }
  }
}
</script>

<style scoped>

</style>
