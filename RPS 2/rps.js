
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var timer = requestAnimationFrame(main);

//Game States
var gameStates = [0,1];
var currentState = 0;

//Array of Choices
var rps = [];
rps[0] = "Rock";
rps[1] = "Paper";
rps[2] = "Scissors"

var rock = new Image();
rock.src = 'images/rock.png';
var scissors = new Image();
scissors.src = 'images/scissors.png';
var paper = new Image();
paper.src = 'images/paper.png';

//Selects all buttons and add thems to array. Query selecter returns an array of objects selected
//Selects them as they appear on page
var pScore = 0;
var cScore = 0;
var btn = document.querySelectorAll("button");

function reset(){
    cScore = 0;
    pScore = 0;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillText("Player score = " + pScore, 300, canvas.height/2 - 200);
    ctx.fillText("Cpu score = " + cScore, 700, canvas.height/2 - 200);
}

//Event Listeners
document.addEventListener("keydown", keyPressDown)
function keyPressDown(e){
    console.log(e.keyCode)
    if(e.keyCode == "32"){
        currentState = 1;
        console.log(currentState)
    }
}
btn[0].addEventListener('click', function(e){playGame(0)})
btn[1].addEventListener('click', function(e){playGame(1)})
btn[2].addEventListener('click', function(e){playGame(2)})
btn[3].addEventListener('click', function(e){reset()})


gameStates[0] = function(){ //<-- this is a call back function
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#57d3f2"
    ctx.textAlign = "center"
    ctx.font = "60px Arial"
    ctx.fillText("ROCK PAPER SCISSORS", canvas.width/2, canvas.height/2)
    ctx.font = "20px Arial"
    ctx.fillText("(Press Space to Continue)", canvas.width/2, canvas.height/1.8)
}

gameStates[1] = function(){ //<-- this is a call back function
    ctx.clearRect(0,0,canvas.width,canvas.height)
    main();
}

function playGame(playerChoice){
    if(currentState == 1)
    {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //0 is rock 1 is paper 2 is scissors
        //Generate CPU choice via rand
        //Math.Random creates a number between 0 and 1 aka .06 so multiplying it by a number then flooring it gets you a random value between that number. 2.99 just prevents it from being exactly 3 and breaking
        var cpuChoice = Math.floor(Math.random() * 2.99)
        //Switch cases.
        ctx.font = "40px Quicksand"
        ctx.fillStyle = "#57d3f2";
        ctx.textAlign = "center";
        switch(playerChoice){
            case 0:
                if(cpuChoice == 0)
                {
                    //tie
                    ctx.fillText("Player: Rock, Cpu: Rock, Tie", canvas.width/2, canvas.height/2 - 40);
                    ctx.drawImage(rock, 100, canvas.height/2, 300, 300);
                    ctx.drawImage(rock, 600, canvas.height/2, 300, 300);
                }
                else if(cpuChoice == 1){
                    //Cpu Wins
                    ctx.fillText("Player: Rock, Cpu: Paper, Cpu Wins", canvas.width/2, canvas.height/2 - 40);
                    ctx.drawImage(rock, 100, canvas.height/2, 300, 300);
                    ctx.drawImage(paper, 600, canvas.height/2, 300, 300);
                    cScore++;
                }
                else
                {
                    //Player Win
                    ctx.fillText("Player: Rock, Cpu: Scissors, Player Wins", canvas.width/2, canvas.height/2 - 40);
                    ctx.drawImage(rock, 100, canvas.height/2, 300, 300);
                    ctx.drawImage(scissors, 600, canvas.height/2, 300, 300);
                    pScore++;
                }
                ctx.fillText("Player score = " + pScore, 300, canvas.height/2 - 200);
                ctx.fillText("Cpu score = " + cScore, 700, canvas.height/2 - 200);
            break;
            
            case 1:
                if(cpuChoice == 0)
                {
                    //Cpu Wins
                    ctx.fillText("Player: Paper, Cpu: Rock, Player Wins", canvas.width/2, canvas.height/2 - 40);
                    ctx.drawImage(paper, 100, canvas.height/2, 300, 300);
                    ctx.drawImage(rock, 600, canvas.height/2, 300, 300);
                    pScore++;
                }
                else if(cpuChoice == 1){
                    //Tie
                    ctx.fillText("Player: Paper, Cpu: Paper, Tie", canvas.width/2, canvas.height/2 - 40);
                    ctx.drawImage(paper, 100, canvas.height/2, 300, 300);
                    ctx.drawImage(paper, 600, canvas.height/2, 300, 300);
                }
                else
                {
                    //Player Win
                    ctx.fillText("Player: Paper, Cpu: Scissors, Cpu Wins", canvas.width/2, canvas.height/2 - 40);
                    ctx.drawImage(paper, 100, canvas.height/2, 300, 300);
                    ctx.drawImage(scissors, 600, canvas.height/2, 300, 300);
                    cScore++;
                }
                ctx.fillText("Player score = " + pScore, 300, canvas.height/2 - 200);
                ctx.fillText("Cpu score = " + cScore, 700, canvas.height/2 - 200);
            break;
    
            case 2:
                if(cpuChoice == 0)
                {
                    ctx.fillText("Player: Scissors, Cpu: Rock, Cpu Wins", canvas.width/2, canvas.height/2 - 40);
                    ctx.drawImage(scissors, 100, canvas.height/2, 300, 300);
                    ctx.drawImage(rock, 600, canvas.height/2, 300, 300);
                    cScore++;
                }
                else if(cpuChoice == 1){
                    ctx.fillText("Player: Scissors, Cpu: Paper, Player Wins", canvas.width/2, canvas.height/2 - 40);
                    ctx.drawImage(scissors, 100, canvas.height/2, 300, 300);
                    ctx.drawImage(paper, 600, canvas.height/2, 300, 300);
                    pScore++;
                }
                else
                {
                    ctx.fillText("Player: Scissors, Cpu: Scissors, Tie", canvas.width/2, canvas.height/2 - 40);
                    ctx.drawImage(scissors, 100, canvas.height/2, 300, 300);
                    ctx.drawImage(scissors, 600, canvas.height/2, 300, 300);
                }
                ctx.fillText("Player score = " + pScore, 300, canvas.height/2 - 200);
                ctx.fillText("Cpu score = " + cScore, 700, canvas.height/2 - 200);
            break;
        }
    }
}

function main()
{

    //Call Game State
    gameStates[currentState]()

    //Reset Window
    timer = requestAnimationFrame(main);
}

function showResults(pChoice, cChoice, result)
{
    document.getElementById("pChoice").innerHTML = pChoice;
    document.getElementById("cChoice").innerHTML = cChoice;
    document.getElementById("result").innerHTML = result;
    //Shows player results
}
