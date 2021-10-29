<template>
  <!-- Navbar bootstrap responsive -->
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container-fluid">
    <div class="navbar-brand"><img id="logo" src="../assets/icon-left-font.png" @click="goToFeed()">
    </div>
    <!-- Bouton Feed, renvoi vers la page d'acceuil au click  -->
    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarGroupomania" aria-controls="navbarGroupomania" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarGroupomania">
        <ul class="navbar-nav ms-5 w-100 d-flex justify-content-around gap-3" >
          <li class="nav-item ms-5">
            <!-- Bouton Profile, renvoi vers la page Profile au click -->
            <button type="button" class="btn btn-outline-danger" @click="goToProfil()">Profil</button>
          </li>
          <li class="nav-item ms-5">
            <!-- Bouton Nouvelle Publication , renvoi vers la page Nouvelle Publication au click -->
            <button type="button" class="btn btn-outline-danger" @click="goToCreatePost()">Nouvelle publication</button>
          </li>
          <li class="nav-item ms-5">
            <!-- Bouton déconnexion, fonction déconnexion au click  -->
            <button @click="logout()" class="btn btn-outline-danger">Déconnexion</button>
          </li>
        </ul>
      </div>
  </div>
</nav>
</template>

<script>
export default {
    name: "navbar",
    methods: {
      //Fonction qu redirige vers le profil
      goToProfil: function (){
        const self = this;
        //Renvoi vers la page profile defini dans le router
        self.$router.push('/Profile')
      },
      //Fonction qui redirige vers la page Nouvelle Publication
      goToCreatePost: function (){
        const self =this;
        //Renvoi vers la page Nouvelle Publication défini dans le routeur
        self.$router.push('/CreatePost')
      },
      //Fonction qui redirige vers la page d'acceuil
      goToFeed: function (){
        const self = this;
        //Renvoi vers la page Feed défini dans le router
        self.$router.push('/Feed')
      },
      //Fonction qui permet la déconnexion du user
      logout: function (){
        const self = this;
        //Commit dans le store pour la fonction logout défini dans le store
        this.$store.commit('logout');
        //Redirige vers la page de connexion une fois l'user déconnecter
        self.$router.push('/');
      }
    }
}
</script>

<style scoped>
#logo{
  height: 70px;
  cursor: pointer;
}
</style>
