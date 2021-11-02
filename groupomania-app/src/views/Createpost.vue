<template>
  <!-- Utilisation du component navbar  -->
<navbar/>

  <div class="container-md bg-light mt-5 border border-1 rounded pt-3">
    <div class="row ">
      <h2 class="col mt-5  text-danger text-start ms-5 mb-4 fw-bolder">Ajouter une publication</h2>
    </div>
    <div>
      <div class="form-floating mt-4">
        <!-- Input title, récupération du contenue avec v-model dans les data pour l'envoi avec la fonction sendPost  -->
        <input type="text" class="form-control ms-5" name="title" id="title" rows="3" v-model="title" placeholder="Titre de la publication">
        <label for="title" class="ms-5">Titre de la publication</label>
      </div>
      <br>
      <div class="d-flex flex-column form-floating mt-4">
        <!-- Input url, récupération du contenue avec v-model dans les data pour l'envoi avec la fonction sendPost  -->
        <input type="url" class="form-control ms-5 col" id="url" rows="3" v-model="url" placeholder="Lien url de la publication">
        <label for="url" class= "ms-5" >Lien URL de la publication</label>
      </div>
      <br>
      <div>
        <!-- boutton ajouter une publication qui active la fonction sendPost au click  -->
        <button class="btn btn-outline-dark text-center mb-5 mt-3"  @click="sendPost" >Ajouter une publication </button>
      </div>
    </div>
  </div>


</template>

<script>

import axios from 'axios';
import navbar from "@/components/navbar";

export default {
name: "Createpost",
  data: function () {
    return{
      //Title et url récupérer avec le v-model dans les inputs
      title: "",
      url: "",
    }
  },
  components: {navbar},
  mounted: function () {
    // Si l'user à un id = -1 (non connecté) on le renvoi vers la page connexion
    if (this.$store.state.user.id == -1) {
      this.$router.push('/');
      return ;
    }
  },
  methods: {
    //Fonction sendPost qui envoi les données récuperer dans inputs au back pour la création du gifs
    sendPost() {
      //Fonction post d'axios avec l'url correspondant à la route du back
      axios.post("http://localhost:3000/api/gif/create", {
        //Envoi des données requise pour la création du post au back
        title: this.title,
        url: this.url,
        user_id: this.$store.state.user.id
      }).then( () => {
            //Redirection vers la page feed une fois que le gif est créer
            this.$router.push('/feed');
          })
          .catch(function (error) {
            //Si il y'a une erreur on renvoi un mesage d'erreur
            console.error("There was an error!", error);
          });
    },
  },
}
</script>

<style scoped>
#title{
  width: 1000px;
}#url{
  width: 1000px;
}
#labelUrl{
    width: 1000px;
}

@media only screen and (max-width: 1200px){
  #title{
    width: 80%;
  }
}
@media only screen and (max-width: 1200px){
  #labelUrl{
    width: 80%;
  }
  #url{
    width: 80%;
  }
}
</style>
