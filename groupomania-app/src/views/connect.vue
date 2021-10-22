<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <div class="navbar-brand"><img id="logo" src="../assets/icon-left-font.png"></div>
    <div><button type="button" class="btn btn-outline-danger" v-on:click="switchToLogin">Se connecter</button></div>
    <div><button type="button" class="btn btn-outline-danger" v-on:click="switchToCreateAccount()">S'inscrire</button></div>
  </div>
</nav>

<div id="container">
  <div class=" container-sm border border-1 rounded mt-5 bg-light ">
 <!-- v-if connection -->
    <h1 v-if="mode == 'login'" class="mt-5 text-start ms-2 text-danger">Se connecter </h1>
    <h1 v-else class="mt-5 text-start ms-2 text-danger">Inscription</h1>
    <div v-if="mode == 'create'" class="mt-5">
      <p class="text-start ms-2">Pseudo</p>
      <input v-model="pseudo" type="text" placeholder="Pseudo" class="form-control">
    </div>
    <div class="mt-5">
      <p class="text-start ms-2">Adresse e-mail</p>
      <input v-model="email" type="text" placeholder="Adresse-mail" class="form-control">
    </div>
    <div class="mt-5">
      <p class="text-start ms-2">Mot de passe</p>
      <input v-model="password" type="password" placeholder="Mot de passe" class="form-control">
    </div>
    <div v-if="mode == 'login' && status == 'error_login'" class="mt-3">
      <p>adresse mail et/ou mot de passe invalide</p>
    </div>
    <div v-if="mode == 'create' && status == 'error_create'" class="mt-3">
      <p>adresse mail déja utilisée</p>
    </div>
    <div>
      <button @click="login()" type="button" class="btn btn-outline-secondary mt-5 mb-5 btn-lg" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount()" class="btn btn-outline-secondary mt-5 mb-5 btn-lg" :class="{'button--disabled' : !validatedFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer un compte</span></button>
    </div>
  </div>
<div>
  <div>
    <p v-if="mode == 'login'">Tu n'as pas encore de compte ? <span @click="switchToCreateAccount" class="hover-overlay">Créer un compte</span></p>
    <p v-else>Tu as déja un compte ? <span @click="switchToLogin()">Se connecter</span></p>
  </div>
</div>


</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: "login",
  data: function () {
    return{
      mode: 'login',
      email: '',
      password : '',
      pseudo: '',

    }
  },
  mounted() {
    if (this.$store.state.user.userId != -1) {
      this.$router.push('/Feed');
      return
    }
  },
  computed : {
    validatedFields: function() { /* @todo regex */
      if( this.mode == 'create'){
        if (this.email != ""&& this.pseudo != "" && this.password != "" ) {
          return true;
        } else {
          return false
        }
      } else {
        if (this.email != "" && this.password != ""){
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      }).then(function (){
         self.$router.push('/Feed')
      }).catch(function(error){
        console.log(error)
      })
    },
    createAccount: function () {
      const self = this;
      this.$store.dispatch('createAccount', {
        email: this.email,
        pseudo: this.pseudo,
        password: this.password,
      }).then(function (){
       self.login();
      }).catch(function(error){
        console.log(error)
      })
    }
  }

}
</script>

<style lang="scss">
#logo {
  width: 150px;
}

#navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button {
  background: #2196F3;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: .4s background-color;
}

.button:hover {
  cursor:pointer;
  background: #1976D2;
}

.button--disabled {
  background:#cecece;
  color:#ececec
}
.button--disabled:hover {
  cursor:not-allowed;
  background:#cecece;
}
</style>
