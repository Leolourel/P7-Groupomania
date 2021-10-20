<template>
<navbar/>

  <div class="container">
    <div class="row">
      <h2 class="col">Ajouter une publication</h2>
    </div>
    <form>
      <div>
        <p>Titre de la publication</p>
        <textarea></textarea>
      </div>
      <br>
      <div>
        <p>Lien URL du GIF</p>
        <textarea></textarea>
      </div>
      <br>
      <div>
        <button>Ajouter une publication</button>
      </div>
    </form>
  </div>


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
