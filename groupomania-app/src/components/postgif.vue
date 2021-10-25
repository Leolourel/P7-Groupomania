<template>
<div class="container d-flex flex-column align-items-center ">
     <div class="w-50 border border-1 rounded mt-5 bg-light mb-5" v-for="gif in gifs" :key="gif.id">
       <div class="row mt-5 justify-content-between">
          <div class="col-5 d-flex flex-direction-row ms-3">
            <img :src="gif.author.avatar" class="img-fluid rounded-circle col-3">
            <div class="col-4 mt-2 ms-2">
              <p class="fs-5">{{gif.author.pseudo}}</p>
              <p class="fs-6 fw-lighter"> {{gif.date}}</p>
            </div>
          </div>
         <div class="dropdown col-3 mt-2">
           <button id="btnDelete display" class="btn " type="button" v-if="gif.author.id == this.$store.state.user.userId" v-on:click="deleteGif(gif.id)">
             X
           </button>
         </div>
       </div>
       <div class="d-flex flex-column align-items-center">
           <div class="row">
             <h2 class="col"><p>{{gif.title}}</p></h2>
           </div>
           <img :src="gif.url" class="col-10 img-fluid img-thumbnail rounded w-75">
       </div>
       <hr>
       <div class="row d-flex flex-row ms-3 mb-2" v-if="gif.id == gif.comments.gif_id"  >
         <img :src="gif.comments.author.avatar" class="col-2 img-fluid rounded-circle">
         <div class="col-6 bg-white rounded-pill">
           <p class="text-start mt-2 ms-2 mb-1 fw-bold">{{ gif.comments.author.pseudo }}</p>
           <p class="text-start ms-2 mb-1">{{ gif.comments.content }} </p>
         </div>
         <button class="btn col-1" type="button" v-if="gif.comments.author.id == this.$store.state.user.userId" >
           X
         </button>
       </div>
       <div class="row d-flex flex-row ms-3 mb-2" >
         <img :src="this.$store.state.userInfos.avatar" class="col-2 img-fluid rounded-circle">
         <div class="col-8 ">
           <textarea class="form-control" rows="1" v-model="content" name="comment" placeholder="Ecrivez votre commentaire ici ... " @keyup.enter="sendComment"></textarea>
           <button type="submit" hidden="true" @click="sendComment"></button>
         </div>
       </div>
     </div>


</div>
</template>

<script>
import axios from 'axios';

//@todo: recuperer id du gif concerner pour envoyer le commentaire
//@todo display une boucle pour les commentaires en rapport avec le gif

export default {
  name: "postgif",
  data(){
    return {
      gifs : [],
      content: "",
    }
  },
  props: {
  },
  mounted(){
      axios
          .get('http://localhost:3000/api/gif/')
          .then(reponse => {
              this.gifs = reponse.data;
              console.log(this.gifs)
          })
  },
  methods: {
    // sendComment(){
    //   console.log(this)
    //   const commentData = new FormData();
    //   commentData.append("content", this.content);
    //   commentData.append("user_id", this.$store.state.user.userId);
    //   // commentData.append("gif_id", this.gifs.id) @todo recuperer l'id du gif concerner
    //
    //   axios.post("http://localhost:3000/api/comment/", commentData)
    //       .then(() => this.$router.push('/'))
    //       .catch(error => {
    //         this.errorMessage = error.message;
    //         console.error("There was an error!", error);
    //       });
    // },
    deleteGif(gifId) {
      axios.delete('http://localhost:3000/api/gif/delete', {
        data : {
          id : gifId
        },
        headers: {
          'Authorization': this.$store.state.user.token
        }
      })
          .then(()  => {
            console.log('requete envoyer')
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
