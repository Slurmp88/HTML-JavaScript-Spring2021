var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//Assign Canvas
var timer = requestAnimationFrame(main);

//creating an instance of a ship (Instantiation)
var ship;
ship = new PlayerShip();

//astroids
var numAsteroids = 20;
var asteroids = [];

function randRange(high, low){
    return Math.random() * (high - low) + low;
}

//Constructor Function
function Asteroid(){
    this.radius = randRange(15, 5);
    this.x = randRange(canvas.width - this.radius, this.radius) - canvas.height;
    this.y = randRange(canvas.height - this.radius, this.radius) - canvas.height;
    this.vy = randRange(10 , 5);
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

//Create Asteroids
for(var i = 0; i < numAsteroids; i++){
    asteroids[i] = new Asteroid();
}

//keyboard Event Listeners
document.addEventListener("keydown",pressKeyDown);
document.addEventListener("keyup",getKeyUp);

function pressKeyDown(e){
    if(e.keyCode == 65 || e.keyCode == 37){
        ship.left = true;
    }
    if(e.keyCode == 68 || e.keyCode == 39){
        ship.right = true;
    }
    if(e.keyCode == 83 || e.keyCode == 40){
        ship.down = true;
    }
    if(e.keyCode == 87 || e.keyCode == 38){
        ship.up = true;
    }
}

function getKeyUp(e){
    if(e.keyCode == 65 || e.keyCode == 37){
        ship.left = false;
    }
    if(e.keyCode == 68 || e.keyCode == 39){
        ship.right = false;
    }
    if(e.keyCode == 83 || e.keyCode == 40){
        ship.down = false;
    }
    if(e.keyCode == 87 || e.keyCode == 38){
        ship.up = false;
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
    this.flamelength = 30;

    this.drawShip = function(){
        ctx.save();
        ctx.translate(this.x, this.y)

        if(this.up || this.right || this.left)
        {
            ctx.save();
            //changes drawing values to animate flame.
            if(this.flamelength == 30){
                this.flamelength = 10;
                ctx.fillStyle = "yellow";
            }
            else{
                this.flamelength = 30;
                ctx.fillStyle = "orange";
            }
            ctx.beginPath();
            ctx.moveTo(0, this.flamelength);
            ctx.lineTo(5,5)
            ctx.lineTo(-5,5)
            ctx.lineTo(0, this.flamelength)
            ctx.closePath()
            ctx.fill();
            ctx.restore();
        }

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(-10, 10);
        ctx.lineTo(0, 5);
        ctx.lineTo(10, 10);
        ctx.lineTo(0, -10);
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

function main(){
    //clear Canvas
    ctx.clearRect(0,0,canvas.width,canvas.height)

    //VERT
    if(ship.up){
        ship.vy = -8;
    }
    else if(ship.down)
    {
        ship.vy = 8;
    }
    else{
        ship.vy = 3;
    }
    //HORIZ
    if(ship.right){
        ship.vx = 8;
    }
    else if(ship.left){
        ship.vx = -8;
    }
    else{
        ship.vx = 0;
    }

    //Spawn Asteroids
    for(var i = 0; i < asteroids.length; i++)
    {
        if(asteroids[i].y > canvas.height + asteroids[i].radius)
        {
            asteroids[i].x = randRange(canvas.width - asteroids[i].radius, asteroids[i].radius);
            asteroids[i].y = randRange(canvas.height - asteroids[i].radius, asteroids[i].radius) - canvas.height;
        }
        asteroids[i].y += asteroids[i].vy;
        asteroids[i].drawAsteroid();
    }

    ship.move();
    ship.drawShip();
    //Reset Window
    timer = requestAnimationFrame(main);
}