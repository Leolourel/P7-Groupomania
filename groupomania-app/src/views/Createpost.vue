<template>
<navbar/>

  <div class="container-md bg-light mt-5 border border-1 rounded pt-3">
    <div class="row ">
      <h2 class="col mt-5  text-danger text-start ms-5 mb-4 fw-bolder">Ajouter une publication</h2>
    </div>
    <form name="createPost">
      <div class="row">
        <label for="title" class="form-label text-start mt-4 mb-2 ms-5 fs-5" id="labelTitle">Titre de la publication</label>
        <input type="text" class="form-control ms-5 " id="title" rows="3" v-model="title">
      </div>
      <br>
      <div class="row d-flex flex-column">
        <label for="url" class="form-label text-start fs-5 ms-5 col" id="labelUrl">Lien URL de la publication</label>
        <input type="text" class="form-control ms-5 col" id="url" rows="3" v-model="url">
      </div>
      <br>
      <div>
        <button class="btn btn-outline-dark text-center mb-5 mt-3" type="submit" @click="sendPost()" >Ajouter une publication </button>
      </div>
    </form>
  </div>


</template>

<script>

import axios from 'axios';
import navbar from "@/components/navbar";

export default {
name: "Createpost",
  data: function () {
    return{
      title: "",
      url: "",
    }
  },
  components: {navbar},
  mounted: function () {
    console.log(this.$store.state.user.userId);
    if (this.$store.state.user.id == -1) {
      this.$router.push('/');
      return ;
    }
  },
  methods: {
    sendPost() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("url", this.url);
      formData.append("user_id", this.$store.state.user.userId);

      axios.post("http://localhost:3000/api/gif/", formData)
          .then( function (response) {
            console.log(response);
            this.$router.push('/');
          })
          .catch( function (error) {
            console.error("There was an error!", error);
          });
    },
  },
}
</script>

<style scoped>
#title{
  width: 1000px;
}#url{
  width: 1000px;
}
#labelTitle{
   width: 1000px;
}
#labelUrl{
    width: 1000px;
}

@media only screen and (max-width: 1200px){
  #title{
    width: 80%;
  }#labelTitle{
    width: 80%;
  }
}
@media only screen and (max-width: 1200px){
  #labelUrl{
    width: 80%;
  }
  #url{
    width: 80%;
  }
}
</style>
