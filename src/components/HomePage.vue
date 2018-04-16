<template>
  <div>
    <div v-if="loggedIn">
      <card-feed/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import CardFeed from './CardFeed';
 export default {
   name: 'HomePage',
   components: {
     CardFeed,
     WelcomePage},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
