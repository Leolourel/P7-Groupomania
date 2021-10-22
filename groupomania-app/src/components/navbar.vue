<template>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <div class="navbar-brand"><img id="logo" src="../assets/icon-left-font.png" @click="goToFeed()"></div>
    <button type="button" class="btn btn-outline-danger" @click="goToProfil()">Profil</button>
    <button type="button" class="btn btn-outline-danger" @click="goToCreatePost()">Nouvelle publication</button>
    <button @click="logout()" class="btn btn-outline-danger">Déconnexion</button>
  </div>
</nav>
</template>

<script>
export default {
    name: "navbar",
    props: ['url','text'],
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
