<template>
<div class="container-sm d-flex flex-column align-items-center border border-1 rounded mt-5 bg-light">
      <div class="row ">
        <h2 class="col mt-5  text-danger mb-3 fw-bolder">Mon Profil</h2>
      </div>
      <div class="row mt-5" >
        <p class="fs-4">Pseudo</p>
        <!-- On affiche dynamiquement le pseudo de l'user à partir des infos récuperer dans le store avec mapstate  -->
        <p class="col">{{user.pseudo}}</p>
      </div>

      <div class="row mt-3" >
        <p class="fs-4">Mail</p>
        <!-- On affiche dynamiquement l'email de l'user à partir des infos récuperer dans le store avec mapstate -->
        <p class="col">{{ user.email }}</p>
      </div>

      <div class="row mt-5 mb-5" >
        <!-- Boutton suppresion du compte, envoi au click la requete axios defini dans la fonction deleteAccount() -->
        <button class="btn btn-outline-dark btn-sm col" type="button" v-on:click="deleteAccount()">Supprimer mon compte</button>
      </div>
</div>
</template>

<script>
// Le package axios permet d'envoyer les requete HTTP vers le back end
import axios from 'axios';
// @todo definir mapstate
import { mapState } from 'vuex';
export default {
  name: "profilecard",
  computed: {
    ...mapState({
      // On est dans l'état 'userInfos' défini dans le store, cela nous permet d'acceder à ses propriétés
      user: 'userInfos'
    })
  },
  methods: {
    //Fonction suppression du compte
    deleteAccount() {
      //Fonction delete de axios, on récupere l'url qui permet de faire appel a la route delete dans le back
      axios.delete('http://localhost:3000/api/auth/delete', {
        data : { // On récupere l'id de l'user à supprimer
          id : this.$store.state.user.id
        },
        headers: { //Son token pour l'authentification
          'Authorization': this.$store.state.user.token
        }
      })
          .then(()  => {
            //On envoi une alert pour prévenir l'user
            alert("Votre compte sera supprimé définitivement");
            //On vide le localStorage qui contient l'item user
            localStorage.clear();
            //On recharge la page pour etre rediriger vers la page connexion (gerer avec le mounted dans la view Profile)
            window.location.reload()
            console.log('requete envoyer')
          })
          .catch(err => {
              console.log('Error: ', err)
          })
    },
  },
}

</script>

<style scoped>

</style>
