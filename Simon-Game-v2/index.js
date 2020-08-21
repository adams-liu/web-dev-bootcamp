var gamePattern = [];
var userClickedPattern = [];
var arr = ["green", "red", "yellow", "blue"];
var startKey = false;
var winnerFlag = false;
var winnerFlag2 = false;
var level = 0;
var score = 0;
var carlDeg = 0;

// rng for a random number generator
function nextSequence() {
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randColor = arr[randomNumber];
    console.log(randColor);
    playSounds(randColor);
    animatePress(randColor);
    gamePattern.push(randColor); 
    userClickedPattern = [];
}

// animates the keypresses
function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

// gives sound effects
function playSounds(name) {
  var name = new Audio("sounds/" + name + ".mp3");
  name.play();
  console.log(name);
}






// detecting click on the buttons
$(".btn").click(function () {

  if(!winnerFlag){
  userColorChosen = $(this).attr("id");
  userClickedPattern.push(userColorChosen);
  playSounds(userColorChosen);
  animatePress(userColorChosen);
  checkAnswer(userClickedPattern.length-1); // once we reset this it needs to match the game pattern. That's why we are able to keep on going until the length match
  console.log(userClickedPattern);
  }
  else if (winnerFlag && !winnerFlag2){
    playSounds("croissant-2");
    $("#carl").css("display","inline");
    winnerFlag2 = true;
  }
  else{
    playSounds("croissant-2");
    setInterval(function(){
      carlDeg +=1
      $("#carl").css("display","inline").css("transform","scale(1.5) rotate("+(carlDeg)+"deg)");
    },20);
    
  }
  
});





// this detects any keypresses in the document file
$(document).keydown(function (event) {

  if (event.key == "a" && !startKey && !winnerFlag) {
    $("#level-title").text("3");
    setTimeout(function(){ $("#level-title").text("2");}, 500);
    setTimeout(function(){ $("#level-title").text("1");}, 1000);
    setTimeout(nextSequence, 1500);
      startKey = true;
  }
  else{
    userColorChosen = letterToColor(event.key);
    userClickedPattern.push(userColorChosen);
    playSounds(userColorChosen);
    animatePress(userColorChosen);
    checkAnswer(userClickedPattern.length-1); // once we reset this it needs to match the game pattern. That's why we are able to keep on going until the length match
    console.log(userColorChosen);
  }

});


// Checking the answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("Success");


        if(gamePattern.length == userClickedPattern.length){
          if(level == 10){
            score += 100;
            $("#score").text("Score: " + score);
            winScreen();
          }
          else{
            score += 100;
            $("#score").text("Score: " + score);
            setTimeout(nextSequence, 1000);
            
          }
        }
    }
    else{
      playSounds("wrong");
      $("body").addClass("game-over");
      setTimeout(function (){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press the 'A' Key to Restart");
      
      startOver();
    }
}


// Restart the game
function startOver(){
  score = 0;
  $("#score").text("Score: " + score);
  startKey = false;
  level = 0;
  gamePattern = [];
}


// Convert letter and return a color
function letterToColor(letter){
if(letter == "w"){return "green";}
else if(letter == "a"){return "red";}
else if(letter == "s"){return "yellow";}
else if(letter == "d"){return "blue";}
else {return "purple";}
}


// Winner Screen
function winScreen(){
$(".container").css("display","none");
$("#level-title").html("Congratulations!");
setInterval(function(){
  $("#level-title").css("color","#FEF");
  $("#score").css("color","#FEF");
},200);
setInterval(function(){
  $("#level-title").css("color","#FEF2BF");
  $("#score").css("color","#FEF2BF");
},400);
playSounds("mario-stage-clear");
 setTimeout(function(){$("#level-title").html("Congratulations! <br> <br> You won a CROISSANT!");},1000);
 setTimeout(function(){$(".croissant").css("display","inline-block");},1000);
 setTimeout(function(){$("#score").html("Click to claim your prize! <br> <br> Score: " + score);},1000);

winnerFlag = true;
}