var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var x = 10;
var timer = requestAnimationFrame(main);

var galaxy = new Image();
galaxy.src = "images/galaxy.jpg";
galaxy.onload = function(){
    main();
}

var mario = new Image();
mario.src = "images/mario.png";
mario.onload = function(){
    main();
}

function main(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height)

    //draw images
    ctx.drawImage(galaxy,0,0,800,600)
    ctx.drawImage(mario,x,canvas.height/2,80,80)
    console.log("working");
    //update pos
    x+=600
    if(x > canvas.width + 80)
    {
        x = -80;
    }
    timer = requestAnimationFrame(main);
}