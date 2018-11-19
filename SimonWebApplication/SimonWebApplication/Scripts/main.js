$(function(event) {

  var $startButton = $('#startButton');
  var boxes = document.getElementsByClassName('boxes');
  var $boxes = $('.boxes');
  var $redBox = $('#red');
  var $blueBox = $('#blue');
  var $greenBox = $('#green');
  var $yellowBox = $('#yellow');
  var fourColours = ['red','blue','green','yellow'];
  var playersChoice = [];
  var computersChoice = [];
  var randomBox = 0;
  var randomColor = 0;
  var counter = 0;
  var id = 0;
  var indexCounter = -1;
  var clickCounter = 0
  var correctClicks = 0;
  var incorrectClicks = 0;
  var $congratulationsMessage = $('#congratulations');
  var $displayMessage = $('.displayMessage');
  var $promptToEnter = $('#promptToEnter');
  var $numberOfClicksMade = $('#numberOfClicksMade');
  var level = 1;
  var $scoreboard = $('#scoreboard')
  var totalscore = 0;
  var $clickRegister = $('#clickRegister')
  var boxIClicked = 0;
  var clickRegCount = 0;
  var colourBoxInterval = 0;
  var clickRegisterInterval = 0;

  // the compareArrays method compares the computer choice to the players choice
  function compareArrays(){

    if(computersChoice[indexCounter] === playersChoice[indexCounter]){
      correctClicks++;
      // for e.g, on level 8, if 8 correct clicks are made, an alert message is displayed saying that the player has won the level of the game
      if(correctClicks==level){
        $congratulationsMessage.html("Level " + level + " passed! Click Start to proceed to next level");
        level++;
        totalscore += correctClicks;
        $scoreboard.html('Score: ' + totalscore)
      }

    }

    // this block of code is executed as soon as an incorrect choice is made
    else {
      incorrectClicks++
      $congratulationsMessage.html("Unfortunately you lost this round. Click start to try again")
      $displayMessage.html('Score ' + correctClicks);

    }

  }

// this function restets everything each time the start button is pressed.
  function resetter(){
    $congratulationsMessage.html('')
    $promptToEnter.html('')
    indexCounter = -1;
    playersChoice = [];
    computersChoice = [];
    $('.boxes').css('backgroundColor','white');
    clickCounter = 0;
    correctClicks = 0;
    incorrectClicks = 0;
  }

  // the frame function executes every half a second. It enables the colours to flash
  function makeColoursFlash(){
    // if a box is shaded a colour then change it to white
    if(randomColor != 0){
      randomBox.style.backgroundColor = 'white';
      randomColor = 0;
      counter++;
      checkCounter();

    } else {

      //selects a random box, fills it with a colour
      randomBox = boxes[Math.floor(Math.random() * 4)];
      randomColor = randomBox.getAttribute('id');
      computersChoice.push(randomColor);
      console.log(computersChoice);
      randomBox.style.backgroundColor = randomColor;

    }
  }

  function makeClickRegisterFlash(){
    // if text is present, clear it
    if($clickRegister.html() != ''){
      $clickRegister.html('')
      clickRegCount++
      checkClickReg()
    }
    // if text is not present, add text to indicate which box was clicked
    else {
      $clickRegister.html(boxIClicked);
      $clickRegister.css('color',boxIClicked);
    }
  }

  function checkCounter(){
    if(counter == level){
      clearInterval(colourBoxInterval);
      counter = 0;
      $promptToEnter.html('Copy the pattern')
    }
  }

  // this function briefly displays the name of the box's colour that is clicked
  function clickreg() {
    clickRegisterInterval = setInterval(makeClickRegisterFlash,200);
  }

  // this insures that the click register only flashes once per click
  function checkClickReg(){
    if(clickRegCount == 1){
      clearInterval(clickRegisterInterval);
      clickRegCount = 0;
    }
  }

  // clicking the start button makes the colours flash in a random order
  $startButton.click(function(){
    resetter();
    // the frame function executes every half a second. It enables the colurs to flash
    colourBoxInterval = setInterval(makeColoursFlash,500);
    // once the quantity of flashes is the same as the level number, the flashing stops
  });

  // this is a click event against the boxes
  $boxes.click(function(){
    if(clickCounter < level && incorrectClicks == 0){
      boxIClicked = $(this).attr('id');
      $(this).css('backgroundColor',boxIClicked);

      clickreg();
      // this stores the choices made by the player that shall be later compared to the computer's random selections
      playersChoice.push(boxIClicked);
      indexCounter++;
      clickCounter++;
      compareArrays();
    }
  });

});
