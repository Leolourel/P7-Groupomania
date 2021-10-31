<template>
  <!-- Utilisation des components navbar et postGif  -->
  <navbar/>
  <postgif/>
</template>

<script>
//Import des components navbar et postGif
import postgif from "@/components/postgif";
import navbar from "@/components/navbar";

export default {
  name: "Feed",
  components: {postgif, navbar},
  mounted: function () {
    // Si l'user à un id = -1 (non connecté) on le renvoi vers la page connexion
    if (this.$store.state.user.id == -1) {
      this.$router.push('/');
      return;
    }
  }
}
</script>

<style scoped>

</style>
