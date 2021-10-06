<template>
  <h1>TESTEST</h1>

     <div id="container" v-for="gif in gifs" :key="gif.id">
       <div><h1 id="movie--title"><p>{{gif.title}}</p></h1></div>
        <div><img id="movie--image" :src="gif.url"></div>
      </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "postgif",
  props: {
    gifs: Array
  },
  methods: {
    getAllGif($state) {
      console.log(axios)
      axios.get('http://localhost:3000/api/gif/')
          .then((gif) => {
            const thisGif = gif.data[0];
            this.$store.state.gifs.push(thisGif);
            $state.loaded();
          })
          .catch(function () {
                    })
    }
  }
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
