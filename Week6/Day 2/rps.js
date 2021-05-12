
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//Array of Choices
var rps = [];
rps[0] = "Rock";
rps[1] = "Paper";
rps[2] = "Scissors"

//Selects all buttons and add thems to array. Query selecter returns an array of objects selected
//Selects them as they appear on page
var btn = document.querySelectorAll("button");
//Assign Event Listeners
btn[0].addEventListener('click', function(e){playGame(0)})
btn[1].addEventListener('click', function(e){playGame(1)})
btn[2].addEventListener('click', function(e){playGame(2)})

function playGame(playerChoice){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    //0 is rock 1 is paper 2 is scissors
    //Generate CPU choice via rand
    //Math.Random creates a number between 0 and 1 aka .06 so multiplying it by a number then flooring it gets you a random value between that number. 2.99 just prevents it from being exactly 3 and breaking
    var cpuChoice = Math.floor(Math.random() * 2.99)
    //Switch cases.
    ctx.font = "40px Quicksand"
    ctx.textAlign = "center";
    switch(playerChoice){
        case 0:
            if(cpuChoice == 0)
            {
                //tie
                ctx.fillText("Player: Rock, Cpu: Rock, Tie", canvas.width/2, canvas.height/2);
            }
            else if(cpuChoice == 1){
                //Cpu Wins
                ctx.fillText("Player: Rock, Cpu: Paper, Cpu Wins", canvas.width/2, canvas.height/2);
            }
            else
            {
                //Player Win
                ctx.fillText("Player: Rock, Cpu: Scissors, Player Wins", canvas.width/2, canvas.height/2);
            }
        break;
        
        case 1:
            if(cpuChoice == 0)
            {
                //Cpu Wins
                ctx.fillText("Player: Paper, Cpu: Rock, Cpu Wins", canvas.width/2, canvas.height/2);
            }
            else if(cpuChoice == 1){
                //Tie
                ctx.fillText("Player: Paper, Cpu: Paper, Tie", canvas.width/2, canvas.height/2);
            }
            else
            {
                //Player Win
                ctx.fillText("Player: Paper, Cpu: Scissors, Player Wins", canvas.width/2, canvas.height/2);
            }
        break;

        case 2:
            if(cpuChoice == 0)
            {
                //tie
                ctx.fillText("Player: Scissors, Cpu: Rock, Player Wins", canvas.width/2, canvas.height/2);
            }
            else if(cpuChoice == 1){
                //Cpu Wins
                ctx.fillText("Player: Scissors, Cpu: Paper, Cpu Wins", canvas.width/2, canvas.height/2);
            }
            else
            {
                //Player Win
                ctx.fillText("Player: Scissors, Cpu: Scissors, Tie", canvas.width/2, canvas.height/2);
            }
        break;
    }
}

function showResults(pChoice, cChoice, result)
{
    document.getElementById("pChoice").innerHTML = pChoice;
    document.getElementById("cChoice").innerHTML = cChoice;
    document.getElementById("result").innerHTML = result;
    //Shows player results
}