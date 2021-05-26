var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//Assign Canvas
var timer = requestAnimationFrame(main);

//creating an instance of a ship (Instantiation)
var ship;
var shipPng = new Image();
shipPng.src = 'images/Ship1.png';

//score
var score = 0;
var highScore = 0;

//Game States
var gameStates = [];
var currentState = 0;
var gameOver = true;

//astroids
var numAsteroids = 20;
var asteroids = [];

//powerUp
var powerUp = new createPowerUp();
var isInvuln = false;
var isPowerUp = true;

function randRange(high, low){
    return Math.random() * (high - low) + low;
}

function gameStart(){
    //creating an instance of a ship (Instantiation)
    ship = new PlayerShip();

    //Create Asteroids
    for(var i = 0; i < numAsteroids; i++){
        asteroids[i] = new Asteroid();
    }
}

function createPowerUp(){
    this.radius = 13;
    this.x = randRange(canvas.width - this.radius, this.radius) - canvas.width;
    this.y = randRange(canvas.height - this.radius, this.radius);
    this.vx = randRange(-10 , -5);
    this.color = "blue";

    this.drawPowerup = function(){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

//Constructor Function
function Asteroid(){
    this.radius = randRange(15, 5);
    this.x = randRange(canvas.width - this.radius, this.radius) - canvas.width;
    this.y = randRange(canvas.height - this.radius, this.radius);
    this.vx = randRange(-10 , -5);
    this.color = "white";

    this.drawAsteroid = function(){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

//keyboard Event Listeners
document.addEventListener("keydown",pressKeyDown);
document.addEventListener("keyup",getKeyUp);

function pressKeyDown(e){
    if(!gameOver)
    {
        if(e.keyCode == 65 || e.keyCode == 37){
            ship.down = true;
        }
        if(e.keyCode == 68 || e.keyCode == 39){
            ship.up = true;
        }
        if(e.keyCode == 83 || e.keyCode == 40){
            ship.right = true;
        }
        if(e.keyCode == 87 || e.keyCode == 38){
            ship.left = true;
        }
    }
    if(gameOver)
    {
        if(e.keyCode == 32)
        {
            if(currentState == 2)
            {   
                //Resets game state, resets number of asteroids, emptys asteroids array so they can be reassigned and respawned.
                currentState = 0;
                numAsteroids = 20;
                asteroids = [];
                gameStart();
                main();
            }
            else{
                //Starts Game (For First Time)
                gameStart();
                currentState = 1;
                gameOver = false;
                main();
                score = 0;
                scoreTimer();
            }
        }
    }
}

function getKeyUp(e){
    if(!gameOver)
    {
        if(e.keyCode == 65 || e.keyCode == 37){
            ship.down = false;
        }
        if(e.keyCode == 68 || e.keyCode == 39){
            ship.up = false;
        }
        if(e.keyCode == 83 || e.keyCode == 40){
            ship.right = false;
        }
        if(e.keyCode == 87 || e.keyCode == 38){
            ship.left = false;
        }
    }
}


//contructor Function
function PlayerShip(){
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.w = 20;
    this.h = 20;
    this.vx = 0;
    this.vy = 0;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.flamelength = -30;

    this.drawShip = function(){
        ctx.save();
        ctx.translate(this.x, this.y)

        if(this.up || this.right || this.left)
        {
            ctx.save();
            //changes drawing values to animate flame.
            if(this.flamelength == -30){
                this.flamelength = -10;
                ctx.fillStyle = "yellow";
            }
            else{
                this.flamelength = -30;
                ctx.fillStyle = "orange";
            }
            ctx.beginPath();
            ctx.moveTo(this.flamelength, 0);
            ctx.lineTo(-5, -5)
            ctx.lineTo(-5, 5)
            ctx.lineTo(this.flamelength, 0)
            ctx.closePath()
            ctx.fill();
            ctx.restore();
        }

        ctx.drawImage(shipPng, -10, -10)
        ctx.fillStyle = "rgba(255,255,255,0)";
        ctx.beginPath();
        ctx.moveTo(-10, 10);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-10, -10);
        ctx.lineTo(10, 0);
        ctx.lineTo(-10, 10);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    this.move = function(){
        this.x += this.vx
        this.y += this.vy
        
        //Bottom
        if(this.y > canvas.height - this.h/2){
            this.y = canvas.height - this.h/2;
            this.vy = 0; 
        }
        //Top
        if(this.y < this.h/2){
            this.y = this.h/2;
            this.vy = 0; 
        }
        //Right
        if(this.x > canvas.width - this.w/2){
            this.x = canvas.width - this.w/2;
            this.vx = 0; 
        }
        //Left
        if(this.x < this.w/2){
            this.x = this.w/2;
            this.vx = 0; 
        }
    }
}
//Main Screen
gameStates[0] = function(){
    ctx.save();
    ctx.font = "60px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText('Asteroid Avoider', canvas.width/2,canvas.height/2-60)
    ctx.font = "20px Arial"
    ctx.fillText('Press Space to Play', canvas.width/2,canvas.height/2)
    ctx.fillText("High Score: " + highScore, canvas.width/2,canvas.height/2 + 100)
    ctx.restore();
}
//Game Screen 
gameStates[1] = function()
{
    //Score Code
    ctx.save();
    ctx.font = "15px arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score + "  Asteroids: " + numAsteroids, canvas.width - 170, 20)
    ctx.restore();

    //Horizontal
    if(ship.up){
        ship.vx = 8;
    }
    else if(ship.down)
    {
        ship.vx = -5;
    }
    else{
        ship.vx = -3;
    }
    //Vert
    if(ship.right)
    {
        ship.vy = 8;
    }
    else if(ship.left){
        ship.vy = -8;
    }
    else
    {
        ship.vy = 0;
    }

    //Spawn Asteroids
    for(var i = 0; i < asteroids.length; i++)
    {
        //Hit Detection
        var dx = ship.x - asteroids[i].x;
        var dy = ship.y - asteroids[i].y;
        var distance = Math.sqrt((dx * dx) + (dy * dy));
        
        if(detectCollision(distance, (ship.h/2 - 1 + asteroids[i].radius - 1))){
            //Checks if Invuln
            if(isInvuln == false)
            {
                console.log("hit asteroid")
                gameOver = true;
                currentState = 2;
                main();
            }
        }

        //Check Asteroids
        if(asteroids[i].x < -asteroids[i].radius)
        {
            asteroids[i].x = randRange(canvas.width - asteroids[i].radius, asteroids[i].radius) + canvas.width;
            asteroids[i].y = randRange(canvas.height - asteroids[i].radius, asteroids[i].radius);
        }
        if(!gameOver)
        {
            asteroids[i].x += asteroids[i].vx;
            asteroids[i].drawAsteroid();
        }
    }
    if(!gameOver)
    {
        ship.move();
        ship.drawShip();
    }


    //PowerUp
    if(isPowerUp){
        powerUp.x += powerUp.vx;
        powerUp.drawPowerup();
    }
    var pX = ship.x - powerUp.x;
    var pY = ship.y - powerUp.y;
    var distance = Math.sqrt((pX * pX) + (pY * pY));
    if(detectCollision(distance, (ship.h/2 - 1 + powerUp.radius - 1))){
        console.log("hit powerup")
        invincible();
        powerUp.x = randRange(canvas.width - powerUp.radius, powerUp.radius) + canvas.width;
        powerUp.y = randRange(canvas.height - powerUp.radius, powerUp.radius);
        powerUp.vx = randRange(-10 , -5);
        isPowerUp = false;
        spawnPowerup();
    }
    if(powerUp.x < -powerUp.radius){
        powerUp.x = randRange(canvas.width - powerUp.radius, powerUp.radius) + canvas.width;
        powerUp.y = randRange(canvas.height - powerUp.radius, powerUp.radius);
        powerUp.vx = randRange(-10 , -5);
        isPowerUp = false;
        spawnPowerup();
    }
}
//Game Over
gameStates[2] = function(){
    ctx.save();
    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.textAlign = "center"
    if(score > highScore)
    {
        highScore = score;
        ctx.fillText('New High Score: ' + highScore, canvas.width/2,canvas.height/2 + 50)
    }
    else
    {
        ctx.fillText('Your Score: ' + score, canvas.width/2,canvas.height/2 + 47)
        ctx.fillText('High Score: ' + highScore, canvas.width/2,canvas.height/2 + 70)
    }
    ctx.font = "60px Arial"
    ctx.fillText('You Died', canvas.width/2,canvas.height/2-60)
    ctx.font = "20px Arial"
    ctx.fillText('Press Space to return to main menu', canvas.width/2,canvas.height/2)
    ctx.restore();
}



function main()
{
    //clear Canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Call Game State
    gameStates[currentState]();


    //Reset Window
    if(!gameOver){
        timer = requestAnimationFrame(main);
    }
}

function detectCollision(distance, calcDistance){
    return distance < calcDistance;
}

function invincible(){
    if(isInvuln == false){
        isInvuln = true;
        setTimeout(invincible, 5000)
    }
    else{
        isInvuln = false;
    }
}

function spawnPowerup(){
    if(isPowerUp == false){
        //isPowerUp = true;
        setTimeout(function(){isPowerUp = true}, 10000);
    }
    else{
        isPowerUp = false;
    }
}

function scoreTimer()
{
    if(!gameOver){
        score++;
        //Modulus returns a remainder %
        //check if remainder goes into 5 evenly
        if(score % 5 == 0)
        {
            numAsteroids += 3;
        }
        setTimeout(scoreTimer, 1000);
    }
}