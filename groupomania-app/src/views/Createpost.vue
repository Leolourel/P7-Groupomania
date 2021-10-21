<template>
<navbar/>

  <div class="container">
    <div class="row">
      <h2 class="col">Ajouter une publication</h2>
    </div>
    <form name="createPost">
      <div class="mb-3">
        <label for="title" class="form-label">Titre de la publication</label>
        <textarea name ="title" class="form-control" id="title" rows="3" v-model="title"></textarea>
      </div>
      <br>
      <div class="mb-3">
        <label for="url" class="form-label">Lien URL de la publication</label>
        <textarea name="url" class="form-control" id="url" rows="3" v-model="url"></textarea>
      </div>
<!--      <div>-->
<!--        <p>Lien URL du GIF</p>-->
<!--        <textarea-->
<!--            name="gifUrl"-->
<!--            type="file"-->
<!--            accept="image/gif"-->
<!--            required-->
<!--            aria-label="Lien URL du gif"-->
<!--            v-model="gifUrl">-->
<!--        </textarea>-->
<!--      </div>-->
      <br>
      <div>
        <button class="btn btn-dark form-control text-center" type="submit" @click="sendPost()" >Ajouter une publication </button>
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
      console.log(this)
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("url", this.url);
      formData.append("user_id", this.$store.state.user.userId);

      axios.post("http://localhost:3000/api/gif/", formData)
          .then(() => this.$router.push('/'))
          .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });

    },
  },
}
</script>

<style scoped>

</style>
