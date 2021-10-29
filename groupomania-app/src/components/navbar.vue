<template>
  <!-- Navbar bootstrap responsive -->
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <div class="container-fluid">
    <div class="navbar-brand"><img id="logo" src="../assets/icon-left-font.png" @click="goToFeed()">
    </div>
    <!-- Bouton Feed -->
    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarGroupomania" aria-controls="navbarGroupomania" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarGroupomania">
        <ul class="navbar-nav ms-5 w-100 d-flex justify-content-around gap-3" >
          <li class="nav-item ms-5">
            <!-- Bouton Profile -->
            <button type="button" class="btn btn-outline-danger" @click="goToProfil()">Profil</button>
          </li>
          <li class="nav-item ms-5">
            <!-- Bouton Nouvelle Publication -->
            <button type="button" class="btn btn-outline-danger" @click="goToCreatePost()">Nouvelle publication</button>
          </li>
          <li class="nav-item ms-5">
            <!-- Bouton déconnexion -->
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
      goToProfil: function (){
        const self = this;
        self.$router.push('/Profile')
      },
      goToCreatePost: function (){
        const self =this;
        self.$router.push('/CreatePost')
      },
      goToFeed: function (){
        const self = this;
        self.$router.push('/Feed')
      },
      logout: function (){
        const self = this;
        this.$store.commit('logout');
        self.$router.push('/');

      }
    }

}



</script>

<style scoped>
#nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
}
#logo{
  height: 70px;
  cursor: pointer;
}

#button--gif{
  height: 50px;
}

#button--profil{
  height: 50px;
}

#button--logout{
 height: 50px;
}

</style>
