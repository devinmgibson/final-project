var topRowOne = document.getElementById('space-one');
var topRowTwo = document.getElementById('space-two');
var topRowThree = document.getElementById('space-three');
var midRowOne = document.getElementById('space-four');
var midRowTwo = document.getElementById('space-five');
var midRowThree = document.getElementById('space-six');
var btmRowOne = document.getElementById('space-seven');
var btmRowTwo = document.getElementById('space-eight');
var btmRowThree = document.getElementById('space-nine');
var modal = document.getElementById('myModal');
var score = 0;
var questions = ['What is the best soda?', "What is Devin's favorite baseball team?", "What degree did Devin earn?",
                  'What color is the sky?', 'Who is Iron Man?', "What school did Devin graduate from?",
                  "What is the max score you can earn on this game?", 'What color is the grass?', "Who is Devin's girfriend?"];
var answers = ["Mountain Dew", "Royals", "Mechanical Engineering",
                "Blue", "Tony Stark", "Utah State",
                "450", "Green", "Anne"];

function playGame() {

  var playerTurn = true;
  var player = document.getElementById('user-div').innerHTML;

  console.log(player);

  alert("Game Started");
  while(playerTurn){
    pickSpace();
    checkForWin();
  }
}

function startGame() {
  playGame();
}

function pickSpace(){
  topRowOne.onclick = function(){
    displayQuestion(topRowOne, questions[0]);
    getAnswer(topRowOne, answers[0]);
  }
  topRowTwo.onclick = function(){
    displayQuestion(topRowTwo, questions[1]);
    getAnswer(topRowTwo, answers[1]);
  }
  topRowThree.onclick = function(){
    displayQuestion(topRowThree, questions[2]);
    getAnswer(topRowThree, answers[2]);
  }
  midRowOne.onclick = function(){
    displayQuestion(midRowOne, questions[3]);
    getAnswer(midRowOne, answers[3]);
  }
  midRowTwo.onclick = function(){
    displayQuestion(midRowTwo, questions[4]);
    getAnswer(midRowTwo, answers[4]);
  }
  midRowThree.onclick = function(){
    displayQuestion(midRowThree, questions[5]);
    getAnswer(midRowThree, answers[5]);
  }
  btmRowOne.onclick = function(){
    displayQuestion(btmRowOne, questions[6]);
    getAnswer(btmRowOne, answers[6]);
  }
  btmRowTwo.onclick = function(){
    displayQuestion(btmRowTwo, questions[7]);
    getAnswer(btmRowTwo, answers[7]);
  }
  btmRowThree.onclick = function(){
    displayQuestion(btmRowThree, questions[8]);
    getAnswer(btmRowThree, answers[8]);
  }
}

function displayQuestion(boardElement, questions) {
  if(boardElement.innerHTML == "X" || boardElement.innerHTML == "O"){

  } else {
    modal.style.display = "block";
    document.getElementById('question').innerHTML = questions;
  }

}

function incrementScore(){
  score += 50;
  document.getElementById('score').value = score;
}

function hideQuestion(){
    modal.style.display = "none";
}

function changeBoard(answer, boardElement){
  if(answer == 0) {
    boardElement.style.background = "green";
    boardElement.style.color = "#003300";
    boardElement.innerHTML = "X";

  } else {
    boardElement.style.background = "red";
    boardElement.style.color = "#330000";
    boardElement.innerHTML = "O";
  }
}

function getAnswer(boardElement, answers) {
  document.getElementById('submit-answer').onclick = function() {
    var checkAnswer = document.getElementById('answer').value;
    if (checkAnswer.localeCompare(answers) == 0){
      incrementScore();
      alert("Correct!");
      hideQuestion();
      changeBoard(0, boardElement);
      console.log(boardElement);
    }else{
      alert("Incorrect!");
      hideQuestion();
      changeBoard(1, boardElement);
    }
  }
}
