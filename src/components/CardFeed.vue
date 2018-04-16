

<template>
  <div>
    <nav>
      <button v-on:click="changeToAdd">Add</button>
      <button v-on:click="changeToEdit">Edit</button>
      <button v-on:click="deleteNotecard">Delete</button>
    </nav>
    <div class="my_grid">
      <button v-on:click="showPrevCard" class="arrow"><img src="../assets/left_arrow.png" class="leftArrow"/></button>
      <div class="notecard">
        <form>
          <textarea class="word" v-model='currentCard.word' :disabled="disabled" type="text" placeholder="Word" >{{currentCard.word}}</textarea><br><br>
          <textarea class="definition" v-model='currentCard.definition' :disabled="disabled" type="text" placeholder="Definition" >{{currentCard.definition}}</textarea><br>
          <input v-show="seen" v-on:click="submit" v-bind:class="submit" type="submit" value="Submit">
        </form>
      </div>
      <button v-on:click="showNextCard" class="arrow"><img src="../assets/right_arrow.png" class="rightArrow"/></button>
    </div>
    <footer>
      Look at how I did it on <a href="https://github.com/jbskaggs/Flashcards.git">GitHub</a>!!!
    </footer>
  </div>

  <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js" integrity="sha256-mpnrJ5DpEZZkwkE1ZgkEQQJW/46CSEh/STrZKOB/qoM=" crossorigin="anonymous"></script>-->
  <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js" integrity="sha256-pU9euBaEcVl8Gtg+FRYCtin2vKLN8sx5/4npZDmY2VA=" crossorigin="anonymous"></script>-->
</template>

<script>
  import axios from 'axios';
  export default {
    name: "card-feed",

    data() {
      return {
        cards: [],
        id: 0,
        currentCard: {word: '', definition: ''},
        currentState: '',
        disabled: true,
      }

    },
    created: function () {
      this.getCards();
    },
    computed: {
      seen: function () {
        if (this.currentState == 'add' || this.currentState == 'edit') return true;
        else return false;
      }
    },
    methods: {
      getCards: function () {
        this.$store.dispatch('getCards').then(resp => {
            this.cards = resp.data.cards;
            this.currentCard = {word: '', definition: ''};
            if (this.cards.length > 0) {
              this.currentCard = this.cards[this.cards.length - 1];
              this.id = this.cards.length - 1;
              console.log(this.cards.length-1);
            }
            return true;
          })
          .catch(err => {
            console.log(err)
          })
      },
      changeToAdd: function () {
        this.currentState = 'add';
        this.currentCard = {word: '', definition: ''};
        this.disabled = false;
      },
      changeToEdit: function () {
        this.currentState = 'edit';
        this.disabled = false;
        this.currentCard = this.cards[this.id]
      },
      deleteNotecard: function () {
        this.$store.dispatch('deleteNotecard', this.currentCard).then(resp => {
          this.getCards();
        }).catch(err => {
          console.log(err)
        })
      },
      showNextCard: function () {
        if (this.currentState == 'add') {
          return true;
        }
        this.id = this.id + 1;
        if (this.id > this.cards.length - 1) {
          this.id = 0;
        }
        this.currentCard = this.cards[this.id]
      },
      showPrevCard: function () {
        if (this.currentState == 'add') {
          return true;
        }
        this.id = this.id - 1;
        if (this.id < 0) {
          this.id = this.cards.length - 1;
        }
        this.currentCard = this.cards[this.id]
      },
      addSubmit: function () {
        this.$store.dispatch('addSubmit', this.currentCard).then(resp => {
          this.getCards();
        }).catch(err => {
          console.log(err)
        })
      },
      editSubmit: function () {
        this.$store.dispatch('editSubmit', this.currentCard).then(resp => {
          this.getCards();
        }).catch(err => {
          console.log(err)
        })
      },
      submit: function () {
        if (this.currentState == 'add') this.addSubmit();
        if (this.currentState == 'edit') this.editSubmit();
        this.getCards();
        this.disabled = true;
        this.currentState = 'home';
        // this.seen();
      }

    }
  };
</script>

<style scoped>


  /* List */
  div nav {
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
  }

  div nav button {
    color: white;
    background-color: black;
    width: 32%;
  }

  div .notecard {
    text-align: center;
    font-size: 30px;
    background-image: url("https://openclipart.org/image/2400px/svg_to_png/85279/index-card.png");
    background-size: 100%;
    margin: auto;
    width: 100%;
    height: 100%;
    background-color: gray;
    vertical-align: middle;
    grid-template-rows: 1fr 2fr;
    grid-gap: 25px;
  }

  .definition{
    resize: none;
    border: none;
    text-align: center;
    text-decoration: none;
    background-color: rgba(0,0,0,0);
    height: 40%;
    margin-bottom: 10px;
  }
  .word {
    height: 10%;
    font-size: .8em;
    resize: none;
    margin-top: 7px;
    border: none;
    text-align: center;
    text-decoration: none;
    background-color: rgba(0,0,0,0);
  }

  .submit {
    text-decoration: none;
    border: none;
    font-size: 1.5rem;
  }

  .submit:hover {
    background-color: lightgray;
    border-radius: 5px;
  }

  .readonly {

  }

  form {
    height: 100%;
  }

  p{
    vertical-align: middle;
    margin-top: 30px;
  }

  /* GRID */
  .my_grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-auto-flow: row;
    margin-right: auto;
    margin-left: auto;
    margin-top: 50px;
    grid-gap: 25px;
  }

  img {
    width: 100%;
    height: auto;
  }

  .delete {
    display: none;
    margin: 2px;
  }

  li:hover .delete {
    display: block;
  }

  label {
    width: 400px;
  }

  /* Form */

  input[type=checkbox], textarea {
    transform: scale(1.5);
    margin-right: 10px;
  }

  input[type=text], textarea {
    font-size: 1em;
  }

  button  {
    font-family: 'Arvo';
    font-size: 1em;
  }

  .arrow {
    background-image: url("https://images.pexels.com/photos/139306/pexels-photo-139306.jpeg?w=1200&h=627&fit=crop&auto=compress&cs=tinysrgb");;
  }

  /* Controls */

  .controls {
    margin-top: 20px;
  }

  div footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
