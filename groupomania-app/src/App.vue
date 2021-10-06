<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  // head: {  // todo arriver a integrer le lien bootstap dans le header
  //   link: [{
  //      href:"https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css", rel:"stylesheet",
  //           integrity:"sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU", crossOrigin:"anonymous"
  //   }
  //
  //   ]
  // }
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
