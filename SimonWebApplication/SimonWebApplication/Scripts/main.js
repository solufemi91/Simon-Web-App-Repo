
Vue.component('game', {
    template: `
  <div class="game">
    <button @click="makeColoursFlashSetInterval" id="startButton" type="button" name="button">Start</button>
    <h2 id="promptToEnter" v-if="checkCounter">{{promptToEnter}}</h2>
    <p id="numberOfClicksMade"></p>
    <h1 class='perfomanceMessage' v-if="congrats">Well done! Click Start to proceed to level: {{level}}</h1>
    <h1 class='perfomanceMessage' v-else-if="lostRound">Unfortunately you lost this round. Click start to try again"</h1>
    <p id='scoreboard'>Score: {{totalscore}}</p>
    <div class="clickRegisterDiv">
      <h2 id='clickRegister'></h2>
    </div>
    <table>
      <thead>
        <tr>
          <td class="boxes" @click="respondToClickEventOfBoxes(colour)" v-for="colour in colours" :id="colour">
          </td>
        </tr>
      </thead>
    </table>
    <a href="./start.html"><button id="back" type="button" name="button">Go back to the homepage</button></a>
  </div>`,

    data() {
        return {
            randomColor: 0,
            counter: 0,
            randomBox: 0,
            computersChoice: [],
            playersChoice: [],
            boxes: 0,
            level: 1,
            colourBoxInterval: 0,
            promptToEnter: "Copy the pattern",
            clickCounter: 0,
            incorrectClicks: 0,
            correctClicks: 0,
            boxIClicked: 0,
            colours: ['red', 'blue', 'green', 'yellow'],
            indexCounter: -1,
            totalscore: 0,
            congrats: false,
            lostRound: false
        }
    },

    methods: {
        makeColoursFlashSetInterval() {
            this.resetter();
            this.congrats = false
            this.colourBoxInterval = setInterval(this.makeColoursFlash, 500);
        },

        makeColoursFlash() {
            // if a box is shaded a colour then change it to white
            if (this.randomColor != 0) {
                this.randomBox.style.backgroundColor = 'white';
                this.randomColor = 0;
                this.counter++;
                this.checkCounter

            } else {

                //selects a random box, fills it with a colour
                this.boxes = document.getElementsByClassName('boxes');
                this.randomBox = this.boxes[Math.floor(Math.random() * 4)];
                this.randomColor = this.randomBox.getAttribute('id');
                this.computersChoice.push(this.randomColor);
                console.log(this.computersChoice);
                this.randomBox.style.backgroundColor = this.randomColor;

            }

        },

        respondToClickEventOfBoxes(colour) {
            if (this.clickCounter < this.level && this.incorrectClicks == 0) {

                document.getElementById(this.boxIClicked = colour).style.backgroundColor = colour

                //clickreg();
                // this stores the choices made by the player that shall be later compared to the computer's random selections
                this.playersChoice.push(colour);
                this.indexCounter++;
                this.clickCounter++;
                this.compareArrays();
            }
        },

        compareArrays() {

            if (this.computersChoice[this.indexCounter] === this.playersChoice[this.indexCounter]) {
                this.correctClicks++;
                // for e.g, on level 8, if 8 correct clicks are made, an alert message is displayed saying that the player has won the level of the game
                if (this.correctClicks == this.level) {
                    //$congratulationsMessage.html("Level " + level + " passed! Click Start to proceed to next level");
                    this.congrats = true
                    this.level++;
                    this.totalscore += this.correctClicks;
                }

            }

            // this block of code is executed as soon as an incorrect choice is made
            else {
                this.incorrectClicks++
                this.lostRound = true
                // $congratulationsMessage.html("Unfortunately you lost this round. Click start to try again")
                // $displayMessage.html('Score ' + correctClicks);

            }

        },

        resetter() {
            this.congrats = false
            this.lostRound = false
            this.checkCounter = false
            this.indexCounter = -1
            this.playersChoice = [];
            this.computersChoice = [];
            $('.boxes').css('backgroundColor', 'white');
            this.clickCounter = 0;
            this.correctClicks = 0;
            this.incorrectClicks = 0;
        }
    },

    computed: {
        checkCounter() {
            if (this.counter == this.level) {
                clearInterval(this.colourBoxInterval);
                this.counter = 0;
                return true
            }
        }
    }


})

var app = new Vue({
    el: '#app'
})