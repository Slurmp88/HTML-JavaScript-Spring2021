var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function randRange(High, Low){
    return Math.random() * (High - Low) + Low;
}

function GameObj(){
    //These are examples of properties in a class
    this.radius = randRange(1, 1);
    //This is an object literal it is the shit.
    this.color = `rgb(${randRange(0,255)}, ${randRange(0,255)}, ${randRange(0,255)})`;
    this.x = randRange(canvas.width, 0);
    this.y = randRange(canvas.height, 0);
    this.vx = randRange(5, -5);
    this.vy = randRange(5, -5);

    //this is an example of a method in a class
    this.drawCircle = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }

    this.move = function()
    {
        this.x += this.vx;
        this.y += this.vy;
        if(this.y > canvas.height - this.radius || this.y < -this.radius){
            this.vy = this.vy * -1;
        }
        if(this.x > canvas.width - this.radius || this.x < -this.radius){
            this.vx = this.vx * -1;
        }
    }
}

//Create an instance.
//var particle = new GameObj();
// This allows a change in syntax particle.x = 10
//particle.drawCircle();

//creating an array of particles :)
var numParticles = 100;

var particles = [];
for(var i = 0; i < numParticles; i++){
    particles[i] = new GameObj();
}

//Object literal is jesus
var timer = requestAnimationFrame(main);
function main(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for(var i = 0; i < particles.length; i++)
    {
        for(j = 0; j < particles.length; j++)
        {
            if(particles[i].x != particles[j.x] && particles[i].y != particles[j.y])
            {
                break;
            }
            else{
                this.vy = this.vy * -1;
                this.vx = this.vx * -1;
            }
        }
    }

    for(var i = 0; i < particles.length; i++)
    {
        particles[i].move();
        particles[i].drawCircle();
    }
    timer = requestAnimationFrame(main);
}

for(var i = 0; i < particles.length; i++)
{
    for(j = 0; j < particles.length; j++)
    {
        if(particles[i].x != particles[j.x] && particles[i].y != particles[j.y])
        {
            break;
        }
        else{
            this.vy = this.vy * -1;
            this.vx = this.vx * -1;
        }
    }
}