<template>
  <!-- navbar spécial pour la page connect, pas de création de components car utiliser qu'une seule fois  -->
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container-fluid">
    <div class="navbar-brand"><img id="logo" src="../assets/icon-left-font.png">
    </div>
    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarConnect" aria-controls="navbarConnect" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarConnect">
      <ul class="navbar-nav ms-5 w-100 d-flex justify-content-end gap-3" >
        <li class="nav-item ">
          <!-- Boutton Se connecter qui permet de passer au mode login -->
          <button type="button" class="btn btn-outline-danger" v-on:click="switchToLogin">Se connecter</button>
        </li>
        <li class="nav-item ms-5 me-5">
          <!-- Boutton S'inscrire qui permet de passer au mode create -->
          <button type="button" class="btn btn-outline-danger" v-on:click="switchToCreateAccount()">S'inscrire</button>
        </li>
      </ul>

    </div>
  </div>
</nav>

<div id="container">
  <div class=" container-sm border border-1 rounded mt-5 bg-light ">
    <!-- Mode login -->
    <h1 v-if="mode == 'login'" class="mt-5 text-start ms-2 text-danger">Se connecter </h1>
    <h1 v-else class="mt-5 text-start ms-2 text-danger">Inscription</h1>
    <div v-if="mode == 'create'" class="mt-5">
      <div class="form-floating" >
          <input v-model="pseudo" type="text" placeholder="Pseudo" class="form-control" name="pseudo" id="pseudo">
          <label for="pseudo">Pseudo</label>
      </div>
    </div>
    <div class="mt-5">
      <div class="form-floating" >
        <input v-model="email" type="email" placeholder="Adresse-mail" class="form-control" id="mail" >
        <label for="mail">Adresse-mail</label>
      </div>
    </div>
    <div class="mt-5">
      <div class="form-floating" >
        <input v-model="password" type="password" placeholder="Le Mot de passe doit contenier au minimum 8 caractères une lettre et un chiffre" class="form-control" id="password">
        <label for="password">Le Mot de passe doit contenier au minimum 8 caractères une lettre et un chiffre</label>
      </div>
    </div>
    <!-- Mode login message d'erreur si invalide input -->
    <div v-if="mode == 'login' && status == 'error_login'" class="mt-3">
      <p>adresse mail et/ou mot de passe invalide</p>
    </div>
    <!-- Mode create message d'erreur si adresse email déja utilisé pour la création du compte  -->
    <div v-if="mode == 'create' && status == 'error_create'" class="mt-3">
      <p>adresse mail déjà utilisée</p>
    </div>
    <div>
      <!-- Boutton login si on est en mode login permet la connexion du user en actionnant la fonction login si les inputs respecte les regex et conditions  -->
      <button @click="login()" type="button" class="btn btn-outline-secondary mt-5 mb-5 btn-lg" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <!-- Boutton Créer un compte qui permet la création du compte au click grace à la fonction createAccount si les inputs respecte les regex et conditions -->
      <button @click="createAccount()" class="btn btn-outline-secondary mt-5 mb-5 btn-lg" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'create'" >
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer un compte</span></button>
    </div>
  </div>
<div>
  <div class="mt-3">
    <!-- Lien en mode login qui renvoi vers le mode create au click à la fonction switchToCreateAccount -->
    <p v-if="mode == 'login'">Tu n'as pas encore de compte ? <span @click="switchToCreateAccount" class="hover-overlay">Créer un compte</span></p>
    <!-- Lien en mode Create qui renvoi vers le mode Login au click à la fonction switchToLogin -->
    <p v-else>Tu as déjà un compte ? <span @click="switchToLogin()">Se connecter</span></p>
  </div>
</div>


</div>
</template>

<script>
//Permet de retourner plusieurs state défini dans le store
import { mapState } from 'vuex'

export default {
  name: "login",
  data: function () {
    //Data recuperer grace au v-model sur les inputs, mode login par défault lors de l'ouverture de la page
    return{
      mode: 'login',
      email: '',
      password : '',
      pseudo: '',

    }
  },
  //Si l'user à un id=-1 on le renvoi vers la page feed(qui elle le renverra vers la page connect)
  mounted() {
    if (this.$store.state.user.id != -1) {
      this.$router.push('/Feed');
      return
    }
  },
  computed : {
    //Fonction validation des champs pour les inputs du mode create
    validatedFields: function() {
      //Regex email
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      //Regex password, au moins 8caractéres dont une lettre et un chiffre minimum
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      //Si on est dans le mode create et que les saisie respecte les regex et que le pseudo n'est pas vide on return true, on peut acceder au boutton créer un compte
      if( this.mode == 'create'){
        if ( emailRegex.test(this.email)  && this.pseudo != "" && passwordRegex.test(this.password) ) {
          return true;
        } else {
          // sinon on retourne false et le boutton reste disabled
          return false;
        }
      } else { //Si on est dans le mode login, on return true si les champs sont rempli, boutton login possible
        if (this.email != "" && this.password != ""){
          return true;
        } else { //Sinon on retourne false et boutton login disabled
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    // Fonction switchToCreateAccount qui actionne le mode create dans le v-if else du html
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    // Fonction switchToLogin qui actionne le mode Login dans le v-if else du html
    switchToLogin: function () {
      this.mode = 'login';
    },
    //Fonction login qui appel l'action login du store avec dispatch en renvoyant les données des inputs, redirige enssuite vers la page d'acceuil
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
    //Fonction createAccount qui appel l'action createAccount du store avec dispatch en renvoyant les données des inputs, redirige vers la fonction login pour la connexion
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
    },
  }

}
</script>

<style scoped lang="scss">
#logo {
  width: 70px;
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
  color:#ececec;
  pointer-events: none;
}
.button--disabled:hover {
  cursor:not-allowed;
  background:#cecece;
}
</style>
