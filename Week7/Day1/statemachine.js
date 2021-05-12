//Canvas Setup
var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
var timer = requestAnimationFrame(main);
var gameStates = [];
var currentState = 0;
var x = 10;
gameOver = true;

//Setup keyPresses
document.addEventListener("keydown", keyPressDown)
document.addEventListener("keyup", keyRelease)

function keyPressDown(e){//E is an event whitch the event listener is sending

}
//32 is space bar
function keyRelease(e){
    if(gameOver){
        if(e.keyCode == "32"){
            changeState();
        }
    }
}

function changeState(){
    if(currentState >= gameStates.length - 1)
    {
        currentState = 0;
    }
    else{
        currentState++;
    }
}

//states of our gameState State Machine (Finite State Machine or FSM)
gameStates[0] = function(){ //<-- this is a call back function
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "yellow"
    ctx.textAlign = "center"
    ctx.font = "60px Arial"
    ctx.fillText("Untitled HTML Game", canvas.width/2, canvas.height/2)
    ctx.font = "20px Arial"
    ctx.fillText("(Press Space to Continue)", canvas.width/2, canvas.height/1.8)
}

gameStates[1] = function(){
    gameOver = false;
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black"
    ctx.fillRect(x, canvas.height/2, 100, 50)
    x+=5;

    if(x>600){
        x = 10;
        gameOver = true;
        currentState++;
    }
}

gameStates[2] = function(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "Red"
    ctx.textAlign = "center"
    ctx.font = "60px Arial"
    ctx.fillText("Game Over", canvas.width/2, canvas.height/2)
    ctx.font = "20px Arial"
    ctx.fillText("(Press Space for Main Menu)", canvas.width/2, canvas.height/1.8)
}

function main(){
    //clear Canvas
    ctx.clearRect(0,0,canvas.width,canvas.height)
    gameStates[currentState](); //<-- Must have Parenthesis because this is a function (This is where you put parameters that your passing in to the call back function)
    //Re-call Main on animation frame
    timer = requestAnimationFrame(main);
}