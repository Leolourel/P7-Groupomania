<template>
  <!-- Utilisation des components navbar et ProfileCard  -->
 <navbar/>
 <profilecard/>
</template>

<script>
// Import des components Navbar et ProfileCard
import navbar from "@/components/navbar";
import profilecard from "@/components/profilecard";

export default {
name: "Profile",
components: {navbar, profilecard},

  mounted: function () {
    // Si l'user à un id = -1 (non connecté) on le renvoi vers la page connexion
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
