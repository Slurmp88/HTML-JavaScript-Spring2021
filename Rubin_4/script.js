//Defines Variable to allow canvas access.
var canvas1 = document.getElementById('canvas1');
//Define Drawing Context of canvas element
var ctx = canvas1.getContext('2d');

//ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'black';
ctx.lineWidth = '5'
ctx.fillRect(85, 300, 100, 100);
ctx.strokeRect(85, 300, 100, 100);

ctx.strokeStyle = '#00ffff';
//ctx.fillStyle = 'blue';
ctx.moveTo(557,309);
ctx.lineTo(667,285);
ctx.lineTo(725,385);
ctx.lineTo(651,465);
ctx.lineTo(549,420);
ctx.lineTo(557,309);
ctx.stroke();
ctx.fill();

ctx.strokeStyle = 'rgb(255,0,0)'
ctx.moveTo(85,685);
ctx.lineTo(280,550);
ctx.stroke();

ctx.fillStyle = 'blue';
ctx.strokeStyle = 'rgb(32,32,32)';
ctx.moveTo(635, 499);
ctx.lineTo(665, 555);
ctx.lineTo(735,568);
ctx.lineTo(686,616);
ctx.lineTo(696,683);
ctx.lineTo(635,655);
ctx.lineTo(577,683);
ctx.lineTo(583,615);
ctx.lineTo(540,563);
ctx.lineTo(605,553);
ctx.lineTo(635,499);
ctx.fill();
ctx.stroke();


ctx.fillStyle = '#ffff00';
ctx.strokeStyle = 'red';
ctx.lineWidth = '5'
ctx.beginPath();
// ctx.Arc(Pos X, Pos Y, Radius, Start Angle, Radian (Radian Cicles 3pi/2 is 75 degrees), isCounterClockwise(True or false).
ctx.arc(385, 440, 65, 0, (2 * Math.PI), false);
//Adding a point before it finishes the path to the center of the screen, IE Makes it got to 400, 300 before closing the circle.
ctx.closePath();
ctx.fill();
ctx.stroke();


