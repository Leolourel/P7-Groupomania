<template>
<div class="container-sm d-flex flex-column align-items-center ">
     <div class="w-auto border border-1 rounded mt-5 bg-light mb-5" v-for="gif in gifs" :key="gif.id">
       <div class="row mt-4 justify-content-between">
          <div class="col-5 d-flex flex-direction-row ">
<!--            <img :src="gif.author.avatar" class="img-fluid rounded-circle col-3">-->
            <div class="col-4 mt-2 ms-5">
              <p class="fs-5">{{gif.author.pseudo}}</p>
              <p class="fs-6 fw-lighter"> {{gif.date}}</p>
            </div>
          </div>
         <div class="dropdown col-3 mt-2">
           <button id="btnDelete display" class="btn " type="button" v-if="gif.author.id == this.$store.state.user.userId || this.$store.state.user.isAdmin == 1" v-on:click="deleteGif(gif.id)">
             X
           </button>
         </div>
       </div>
       <div class="d-flex flex-column align-items-center container-fluid">
           <div class="row justify-content-center">
             <h2 class="col text-wrap text-center"><p>{{gif.title}}</p></h2>
           </div>
           <img :src="gif.url" class="col-10 img-fluid img-thumbnail rounded " id="gifImage">
       </div>
       <hr>
       <div v-for="comment in comments" :key="comment.id">
         <div class="row d-flex flex-row mb-2 justify-content-center" v-if="gif.id == comment.gif_id"  >
<!--           <img :src="comment.avatar" class="col-2 img-fluid rounded-circle">-->
           <div class="col-6 bg-white rounded-pill">
             <p class="text-start mt-2 ms-2 mb-1 fw-bold">{{ comment.pseudo }}</p>
             <p class="text-start ms-2 mb-1">{{ comment.content }} </p>
           </div>
           <button class="btn col-1" type="button" v-if="comment.user_id == this.$store.state.user.userId || this.$store.state.user.isAdmin == 1" v-on:click="deleteComment(comment.id)">
             X
           </button>
         </div>
       </div>
       <div class="row d-flex flex-row mb-2 justify-content-center" >
<!--         <img :src="this.$store.state.userInfos.avatar" class="col-2 img-fluid rounded-circle">-->
         <div class="col-8 ">
           <input  type="text" class="form-control"  v-model="content" name="comment" placeholder="Ecrivez votre commentaire ici ... " @keyup.enter.self="sendComment(gif.id)">
           <button type="submit" hidden="true" ></button>
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
      comments : [],
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
    axios
        .get('http://localhost:3000/api/comment/')
        .then(reponse => {
          this.comments = reponse.data;
          console.log(this.comments)
        })
  },
  methods: {
    sendComment(gifId){
      // const commentData = new FormData();
      // commentData.append("content", this.content);
      // commentData.append("user_id", this.$store.state.user.userId);
      // commentData.append("gif_id", gifId);

      axios.post("http://localhost:3000/api/comment/create", {
        content : this.content,
        user_id : this.$store.state.user.userId,
        gif_id : gifId
      }).then( () => {
            window.location.reload();
          })
          .catch(function (error) {
            console.error("There was an error!", error);
          });
    },
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
            console.log(gifId)
            window.location.reload()
          })
          .catch(err => {
            console.log('Error: ', err)
          })
    },
    deleteComment(commentId) {
      axios.delete('http://localhost:3000/api/comment/delete', {
        data : {
          id : commentId
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

#gifImage {
  width: 450px;
}
</style>
