<template>
<div class="container-sm d-flex flex-column align-items-center border border-1 rounded mt-5 bg-light">
      <div class="row ">
        <h2 class="col mt-5  text-danger mb-3 fw-bolder">Mon Profil</h2>
      </div>
      <div class="row mt-5" >
        <p class="fs-4">Pseudo</p>
        <p class="col">{{user.pseudo}}</p>
      </div>

      <div class="row mt-3" >
        <p class="fs-4">Mail</p>
        <p class="col">{{ user.email }}</p>
      </div>

      <div class="row mt-5 mb-5" >
        <button class="btn btn-outline-dark btn-sm col" type="button" v-on:click="deleteAccount()">Supprimer mon compte</button>
      </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  name: "profilecard",
  computed: {
    ...mapState({
      user: 'userInfos'
    })
  },
  methods: {
    deleteAccount() {
      axios.delete('http://localhost:3000/api/auth/delete', {
        data : {
          id : this.$store.state.user.id
        },
        headers: {
          'Authorization': this.$store.state.user.token
        }
      })
          .then(()  => {
            alert("Votre compte sera supprimé définitivement");
            localStorage.clear();
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
