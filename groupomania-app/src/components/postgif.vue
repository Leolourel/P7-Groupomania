<template>
<div class="container d-flex flex-column align-items-center ">
     <div class="w-50 border border-1 rounded mt-5" v-for="gif in gifs" :key="gif.id">
       <div class="row mt-5">
          <h2 class="col-8"><p>{{gif.title}}</p></h2>
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
       <div class="row justify-content-center+">
           <img :src="gif.url" class="col-10 img-fluid img-thumbnail rounded w-75">
       </div>
       <hr>
       <div class="row ">
         <img src="#" class="col-2">
         <formulaire class="col-8">
           <input type="textarea"  name="comment" value="Ecriver ici votre commentaire...">
         </formulaire>
       </div>
     </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "postgif",
  data(){
    return {
      gifs : [],
    }
  },
  props: {
  },
  mounted(){
      axios
          .get('http://localhost:3000/api/gif/')
          .then(reponse => {
        this.gifs = reponse.data
          })
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
