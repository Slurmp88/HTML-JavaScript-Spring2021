
function showAnswer(id,answer){
    var answerArray = new Array("Newspaper", "Yes", "A Candle", "All of them", "A Piano", "A Dictionary", "A Window", "Short", "Silence", "Footsteps");
    document.getElementById(answer).innerHTML = answerArray[id];
}