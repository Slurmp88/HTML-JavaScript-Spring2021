var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var timer = requestAnimationFrame(main);
//countdown Var
var seconds = 3;
var fps = 60;
var frames = fps;
//Vars
var xpos = 10;
var start = 58;
var finish = 956;
var speed = 1;
//gamestate
var gameOver = true;
//fuel?
var startFuel = randNumber(700, canvas.width - 50);;
var fuel = startFuel;
var fullBarWidth = 512;
//Image Vars

var background = new Image();
background.src = "images/Background.png";
background.onload = function()
{
    main();
}

var car = new Image();
car.src = 'images/car2.png';
car.onload = function(){
    main();
}

//Adding Rudementory Key Presses
document.addEventListener('keydown', keyPressDown)
document.addEventListener('keyup', keyUp)

function main(){
    //Call Frame
    timer = requestAnimationFrame(main);
    //clear Canvas
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, 1080, 786);
    if(gameOver)
    {
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "30px Quicksand;"
        ctx.textAlign = "center"
        ctx.fillText("Press 'Space' to Start, Use right arrow and left arrow to  change speed", canvas.width/2, canvas.height/2) 
    }
    else
    {
        //timer
        if(!gameOver && seconds > 0)
        {
            ctx.drawImage(background, 0, 0, 1080, 786);
            runStartTimer();
            drawStartTimer();
        }
        else{
            if(!gameOver && fuel > 0 && seconds <= 0)
            {
                    fuel -= speed;
                    xpos += speed;
            }
        }
    }
    
    //Draw Stuff.

    drawFuelText();
    drawFinishLine();
    drawStartLine();
    drawCar();
    drawFuelBar()    
    
    //Check if game is over
    if(xpos > finish + 15 || fuel <= 0)
    {
        drawResults();
    }
}

function drawStartTimer(){
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "25px Quicksand white";
    ctx.textAlign = "center";
    ctx.fillText(seconds, canvas.width/2, canvas.height/2);
}


function drawFuelText()
{
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "25px Arial";
    ctx.fillText(fuel, start - 30, 55);
}

//key code is getting the key log for individual buttons
function keyPressDown(e)
{
    //toggles gameOver
    if(e.keyCode == 32){
        //gameOver = !gameOver;
        if(gameOver == false)
        {
            restartGame();
        }
        gameOver = false;
        //document.removeEventListener("keydown", keyPressDown);
    }
    else if(e.keyCode == 39){
        speed = 3;
    }
    else if(e.keyCode == 37){
        speed = 1;
    }
    console.log(e.keyCode);
}   

function keyUp(e)
{
    //document.addEventListener('keydown', keyPressDown)
    /*if(e.keyCode == 32)
    {
        gameOver = true;
    }*/
}   

function drawStartLine()
{
    ctx.fillStyle = "green";
    ctx.fillRect(start, 250, 10, 300);
}

function drawFinishLine(){
    ctx.fillStyle = "red";
    ctx.fillRect(finish, 250, 10, 300);
}

function drawCar(){
    //draw "car"
    ctx.drawImage(car, xpos + 30, canvas.height/2, -30, 20);
}

function getFuelPercentage(){
    return fuel/startFuel;
}

function drawFuelBar(){
    var barWidth = fullBarWidth * getFuelPercentage();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(start, 30, fullBarWidth, 30);
    if(fuel > 0){
        ctx.fillStyle = "red";
        ctx.fillRect(start, 30, barWidth, 30);
    }
}

function runStartTimer()
{
    frames -= 1;
    if(frames < 0)
    {
        frames = fps;
        seconds -= 1;
    }
}

function randNumber(high, low){
    return Math.round(Math.random() * (high - low) + low);
}

function drawResults()
{
    if(xpos > finish){
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "25px Quicksand";
        ctx.textAlign = "center";
        ctx.fillText("You made it to the finish!", canvas.width/2, canvas.height/2);
    }
    else
    {
        ctx.fillText("You LOSE Good day sir!", canvas.width/2, canvas.height/2);
    }
}

function restartGame()
{
    location.reload();
}