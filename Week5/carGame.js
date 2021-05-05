var canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

var timer = requestAnimationFrame(main);

//countdown Vars
var seconds = 3;
var fps = 60;
var frames = fps;
//Vars
var xpos = 20;
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
var car = new Image();
car.src = 'images/car.png';
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

    if(gameOver)
    {
        ctx.fillStyle = "black"
        ctx.font = "30px Helvetica"
        ctx.textAlign = "center"
        ctx.fillText("Press 'Space' to Start", canvas.width/2, canvas.height/2) 
    }
    else
    {
        //timer
        if(!gameOver && seconds > 0)
        {
            
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
    ctx.fillRect(start, 50, 10, 500);
}

function drawFinishLine(){
    ctx.fillStyle = "red";
    ctx.fillRect(finish, 50, 10, 500);
}

function drawCar(){
    //draw "car"
    ctx.drawImage(car, xpos + 10, canvas.height/2, -30, 20);
}

function getFuelPercentage(){
    return fuel/startFuel;
}

function drawFuelBar(){
    var barWidth = fullBarWidth * getFuelPercentage();
    ctx.fillStyle = "black";
    ctx.fillRect(start, 30, fullBarWidth, 10);
    if(fuel > 0){
        ctx.fillStyle = "red";
        ctx.fillRect(start, 30, barWidth, 10);
    }
}

function drawFuelText()
{
    ctx.fillStyle = "Black";
    ctx.font = "25px Helvetica";
    ctx.fillText(fuel, start, 30);
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

function drawStartTimer(){
    ctx.fillStyle = "Black";
    ctx.font = "25px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText(seconds, canvas.width/2, canvas.height/2);
}

function randNumber(high, low){
    return Math.round(Math.random() * (high - low) + low);
}

function drawResults()
{
    if(xpos > finish){
        ctx.fillStyle = "Black";
        ctx.font = "25px Helvetica";
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