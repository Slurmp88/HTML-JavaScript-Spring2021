//Defines Variable to allow canvas access.
var canvas = document.getElementById('canvas1');
//Define Drawing Context of canvas element
var ctx = canvas.getContext('2d');

var mario = new Image();
mario.src = "images/mario.png";
mario.onload = function(){
    ctx.drawImage(mario, 600, 300, 80, 80);
}

var galaxy = new Image();
galaxy.src = "images/galaxy.jpg";
galaxy.onload = function(){

    ctx.drawImage(galaxy, 0, 0, 800, 600);

    var mario = new Image();
    mario.src = "images/mario.png";
    mario.onload = function()
    {
        ctx.drawImage(mario, 600, 300, 80, 80);
    }

    //Draw Square/Rectangle
    ctx.fillStyle = "cyan";
    ctx.strokeStyle = "black";
    ctx.lineWidth = "3"
    ctx.fillRect(30, 30, 100, 100);
    ctx.strokeRect(30, 30, 100, 100);

    //Draw Line
    ctx.strokeStyle = "yellow"
    ctx.moveTo(0,0);
    ctx.lineTo(800,600);
    ctx.stroke();

    ctx.moveTo(800,0);
    ctx.lineTo(0,600);
    ctx.stroke();

    //Draw Circle

    ctx.beginPath();
    // ctx.Arc(Pos X, Pos Y, Radius, Start Angle, Radian (Radian Cicles 3pi/2 is 75 degrees), isCounterClockwise(True or false).
    ctx.arc(400, 300, 50, 0, (3 * Math.PI)/2, false);
    //Adding a point before it finishes the path to the center of the screen, IE Makes it got to 400, 300 before closing the circle.
    ctx.lineTo(400,300);
    ctx.closePath();
    ctx.fill();
}
