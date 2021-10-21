<template>
<div class="container d-flex flex-column align-items-center border border-1 rounded mt-5">
      <div class="row mt-5"><p class="col">Pseudo : {{user.pseudo}}</p></div>
      <div class="row mt-5"><p class="col">Email :  {{ user.email }}</p></div>
      <div class="row w-25 mt-5"><img :src="user.avatar" class="col"></div>
      <div class="row mt-5">
       <button type="button" class="btn btn-outline-secondary btn-sm col">Modifier mes informations</button>
      </div>
      <div class="row mt-5 mb-5">
        <button class="btn btn-outline-secondary btn-sm col" type="button" v-on:click="deleteAccount()">Supprimer mon compte</button>
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
          id : this.$store.state.user.userId
        },
        // headers: {
        //   'Authorization': this.$store.state.user.token
        // }
      })
          .then(() => {
            localStorage.clear();
            this.$router.push('/');
          })
          .catch((err) => {
            if (err.response.status == 401) {
              this.$router.push("/")
            } else {
              console.log('Error: ', err)
            }
          })
    },
  },
}
</script>

<style scoped>

</style>
