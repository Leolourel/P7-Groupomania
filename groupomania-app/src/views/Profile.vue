<template>
 <navbar/>
 <profilecard/>
</template>

<script>
import navbar from "@/components/navbar";
import profilecard from "@/components/profilecard";

export default {
name: "Profile",
components: {navbar, profilecard},

  mounted: function () {
    console.log(this.$store.state.userInfos);
    if (this.$store.state.user.id == -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUserInfos');
  }

}
</script>

<style scoped>

</style>
