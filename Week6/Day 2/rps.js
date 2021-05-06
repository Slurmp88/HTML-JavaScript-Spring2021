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
    //0 is rock 1 is paper 2 is scissors
    //Generate CPU choice via rand
    //Math.Random creates a number between 0 and 1 aka .06 so multiplying it by a number then flooring it gets you a random value between that number. 2.99 just prevents it from being exactly 3 and breaking
    var cpuChoice = Math.floor(Math.random() * 2.99)
    //Switch cases.
    switch(playerChoice){
        case 0:
            if(cpuChoice == 0)
            {
                //tie
                showResults(" Rock", " Rock", " Tie");
            }
            else if(cpuChoice == 1){
                //Cpu Wins
                showResults(" Rock", " Paper", " Cpu Win");
            }
            else
            {
                //Player Win
                showResults(" Rock", " Scissors", " Player Win");
            }
        break;
        
        case 1:
            if(cpuChoice == 0)
            {
                //tie
                showResults(" Paper", " Rock", " Player Wins");
            }
            else if(cpuChoice == 1){
                //Cpu Wins
                showResults(" Paper", " Paper", " Tie");
            }
            else
            {
                //Player Win
                showResults(" Paper", " Scissors", " Cpu Win");
            }
        break;

        case 2:
            if(cpuChoice == 0)
            {
                //tie
                showResults(" Scissors", " Rock", " Cpu Wins");
            }
            else if(cpuChoice == 1){
                //Cpu Wins
                showResults(" Scissors", " Paper", " Player Wins");
            }
            else
            {
                //Player Win
                showResults(" Scissors", " Scissors", " Tie");
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