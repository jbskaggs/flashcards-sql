<template>
  <div class="column">
    <h1>Flashcards</h1>
    <p>New here? Register below</p>
    <form v-on:submit.prevent="register">
      <input class="narrow" v-model="name" placeholder="User Name">
      <!--<p>2. Create an account.</p>-->
      <!--<input class="wide" v-model="name" placeholder="First and Last Name"><br/>-->
      <!--<input class="narrow" v-model="email" placeholder="Email Address">-->
      <input class="narrow" type="password" v-model="password" placeholder="Password">
      <button class="alternate" type="submit">Register</button>
    </form>
    <p class="error">{{registerError}}</p>
  </div>
</template>

<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       // username: '',
       // email: '',
       password: '',
       name: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register', {
         name: this.name,
         password: this.password,
       });
     }
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 img {
     width: 100px;
 }

p {
  font-weight: 700;
  font-size: 30px;
}
 h1 {
     margin-bottom: 0px;
   font-size: 70px;
 }
 h2 {
     margin-top: 0px;
     font-size: 1.2em;
     font-weight: normal;
     margin-bottom: 50px;
 }
 .narrow {
     width: 170px;
 }
 .wide {
     width: 370px;
 }

  .error {
    color: black;
  }
</style>
