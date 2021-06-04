var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var gravity = 0;
var friction = 1;
var numParticles = 10;
var particles = [];

var cageImg = new Image();
cageImg.src = "images/cage.png";
cageImg.onload = function(){
    main();
}


function randRange(High, Low){
    return Math.random() * (High - Low) + Low;
}

function GameObj(){
    //These are examples of properties in a class
    this.radius = randRange(50, 40);
    //This is an object literal it is the shit.
    this.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
    this.x = canvas.width * .5//randRange(canvas.width, 0);
    this.y = canvas.height* .5//randRange(canvas.height, 0);
    this.vx = randRange(10, -10);
    this.vy = randRange(10, -10);

    //this is an example of a method in a class
    this.drawCircle = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }

    this.drawSquare = function()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - (this.radius), this.y - (this.radius), this.radius * 2, this.radius * 2)
    }

    this.drawImage = function()
    {
        ctx.drawImage(cageImg, this.x - (this.radius), this.y - (this.radius), this.radius * 2, this.radius * 2)
    }
    //this handles movement
    this.move = function()
    {
        this.x += this.vx;
        this.y += this.vy;

        if(this.y > canvas.height - this.radius){
            this.y = canvas.height - this.radius;
            this.vy = -this.vy * friction;
        }
        if(this.y < this.radius){
            this.y = this.radius;
            this.vy = -this.vy * friction;
        }

        //left
        if(this.x < this.radius)
        {
            this.x = this.radius;
            this.vx = -this.vx * friction;
        }
        //right
        if(this.x > canvas.width - this.radius)
        {
            this.x = canvas.width - this.radius;
            this.vx = -this.vx * friction;
        }
    }
}

//Create an instance.
//var particle = new GameObj();
// This allows a change in syntax particle.x = 10
//particle.drawCircle();
//creating an array of particles :)

for(var i = 0; i < numParticles; i++){
    particles[i] = new GameObj();
}

//Object literal is jesus
var timer = requestAnimationFrame(main);
function main()
{
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for(var i = 0; i < particles.length; i++)
    {
        particles[i].vy += gravity;
        particles[i].move();
        particles[i].drawSquare();
        particles[i].drawImage()
    }
    timer = requestAnimationFrame(main);
}