<template>
<navbar/>
<h1> FEED TEST </h1>

<postgif/>
</template>

<script>
import postgif from "@/components/postgif";
import navbar from "@/components/navbar";


export default {
  name: "Feed",
  components: {postgif, navbar},
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.id == -1) {
      this.$router.push('/');
      return;
    }
  }
}
</script>

<style scoped>

</style>
