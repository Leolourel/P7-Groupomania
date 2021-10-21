<template>
<div class="container d-flex flex-column align-items-center ">
     <div class="w-50 border border-1 rounded mt-5" v-for="gif in gifs" :key="gif.id">
       <div class="row mt-5 justify-content-between">
          <div class="col-5 d-flex flex-direction-row ">
            <img :src="gif.avatar" class="img-fluid img-thumbnail rounded w-25">
            <div class="">
              <p>{{gif.author.pseudo}}</p>
              <p> {{gif.date}}</p>
            </div>
          </div>

         <div class="dropdown col-3">
           <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
             ...
           </button>
           <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
             <li><a class="dropdown-item" href="#">Modifier</a></li>
             <li><a class="dropdown-item" href="#">Supprimer</a></li>
           </ul>
         </div>
       </div>
       <div class="row">
         <h2 class="col-8"><p>{{gif.title}}</p></h2>
       </div>
       <div class="row justify-content-center+">
           <img :src="gif.url" class="col-10 img-fluid img-thumbnail rounded w-75">
       </div>
       <hr>
       <div class="row ">
         <img src="#" class="col-2">
         <form class="col-8">
           <input type="text" v-model="content" name="comment" @keyup.enter="sendComment">
           <button type="submit" hidden="true" @click="sendComment"></button>
         </form>
       </div>
       <div class="row" v-for="comment in comments" :key="comment.gif_id" >
         <p class="col">{{ comment.content}} </p>
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
        this.gifs = reponse.data
            console.log(this.gifs)
          }),
          axios
              .get('http://localhost:3000/api/comment/')
              .then(reponse => {
                this.comments = reponse.data
                console.log(this.comments)
              })
  },
  methods: {
    sendComment(){
      console.log(this)
      const commentData = new FormData();
      commentData.append("content", this.content);
      commentData.append("user_id", this.$store.state.user.userId);
      // commentData.append("gif_id", this.gifs.id) @todo recuperer l'id du gif concerner

      axios.post("http://localhost:3000/api/comment/", commentData)
          .then(() => this.$router.push('/'))
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
    }
  },
  // computed: {
  //   gifs(){
  //     return this.$store.getters.getGifs;
  //   }
  // },
  // methods: {
  //   updateGif(){
  //       axios.get('http://localhost:3000/api/gif/')
  //           .then( reponse => this.gifs = reponse.data);
  //   }
  // },
}


</script>

<style scoped>
#container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#movie--title{
  width: 200px;
}
#movie--image{
  width: 400px;
  height: 400px;
}
</style>
