<template>
<div id="container">
  <div id="pseudo"><p>{{user.pseudo}}</p></div>
  <div id="mail"><p>{{ user.email }}</p></div>
  <div id="avatar"><img :src="user.avatar">Avatar</div>
  <button id="button--avatar">Modifier mes informations</button>
  <button id="button--delete">Supprimer mon compte</button>

</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name: "profilecard",
  computed: {
  ...mapState({
    user: 'userInfos'
  })
  }
}
</script>

<style scoped>
#container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 800px;
}
#pseudo{
  width: 100px;
}
#mail{
  width: 100px;
}
#avatar{
  width: 300px;
  height: 300px;
}
#button--avatar{
  width: 150px;
}

</style>
