
var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).one("keypress", function(){
    if(!started){
        $("#level-title").text("Level " +level);
        nextSequence();
        started = true;
    }
    
});

function nextSequence(){
    userClickedPattern = [];
    $("#level-title").text("Level " +level);
    level ++;

    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //console.log(gamePattern);

    $("#" +randomChosenColor).fadeOut(7).fadeIn(7);
    var audio = new Audio('sounds/'+randomChosenColor+ '.mp3');
    audio.play();
    
}

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    // console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
   
    var audio = new Audio('sounds/'+userChosenColor+ '.mp3');
    audio.play();

    $("#"+userChosenColor).addClass("pressed");
    
    setTimeout(() => {
        $("#"+userChosenColor).removeClass("pressed");
    }, 100);

    checkAnswer(userClickedPattern.length - 1);
});




function checkAnswer(currentlevel){
    
    if(userClickedPattern[currentlevel] == gamePattern[currentlevel]){
        console.log("success");

        
            if (userClickedPattern.length == gamePattern.length){
                console.log("Completed");
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        
    }
    else {
        console.log("wrong");
        var audioWrong = new Audio('sounds/wrong.mp3');
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

    $(document).one("keypress", function(){
        nextSequence();
    })
}