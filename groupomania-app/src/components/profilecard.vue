<template>
<div class="container-sm d-flex flex-column align-items-center border border-1 rounded mt-5 bg-light">
      <div v-if="mode == 'profil'" class="row mt-5"><img :src="user.avatar" class="rounded-circle"></div>
      <div class="mb-3 mt-5" v-else>
        <label for="formFile" class="form-label fs-4">Avatar</label>
        <input class="form-control mt-3" type="file" id="formFile">
      </div>
      <div class="row mt-5" v-if="mode == 'profil'">
        <p class="fs-4">Pseudo</p>
        <p class="col">{{user.pseudo}}</p>
      </div>
      <div v-else class="mt-3">
        <label for="userPseudo" class="form-label">Pseudo</label>
        <input type="email" class="form-control" id="userPseudo" :placeholder="this.user.pseudo"  >
      </div>
      <div class="row mt-3" v-if="mode == 'profil'">
        <p class="fs-4">Mail</p>
        <p class="col">{{ user.email }}</p>
      </div>
      <div v-else class="mt-3">
        <label for="userMail" class="form-label">Mail</label>
        <input type="email" class="form-control" id="userMail" :placeholder="this.user.email"  >
      </div>
      <div class="row mt-5" v-if="mode == 'profil'" v-on:click="switchToModifyProfil">
       <button type="button" class="btn btn-outline-secondary btn-sm col">Modifier mes informations</button>
      </div>
      <div class="row mt-5" v-else>
        <button type="button" class="btn btn-outline-secondary btn-sm col">Modifier</button>
      </div>
      <div class="row mt-5 mb-5" v-if="mode == 'profil'">
        <button class="btn btn-outline-secondary btn-sm col" type="button" v-on:click="deleteAccount()">Supprimer mon compte</button>
      </div>
      <div class="row mt-5 mb-5" v-else>
        <button class="btn btn-outline-secondary btn-sm col" type="button" v-on:click="switchToProfil">Annuler</button>
      </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  name: "profilecard",
  data: function () {
    return{
      mode: 'profil',
    }
  },
  computed: {
    ...mapState({
      user: 'userInfos'
    })
  },
  methods: {
    deleteAccount() {
      axios.delete('http://localhost:3000/api/auth/delete', {
        data : {
          id : this.$store.state.user.userId
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
    switchToProfil: function () {
      this.mode = 'profil';
    },
    switchToModifyProfil: function (){
      this.mode = 'modify'
    }
  },
}

</script>

<style scoped>

</style>
